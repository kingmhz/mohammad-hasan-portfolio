const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');

const DEFAULT_PORT = 3001;
const PUBLIC_DIR = path.join(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function findAvailablePort(startPort, callback) {
  const tester = net.createServer();
  tester.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      findAvailablePort(startPort + 1, callback);
    } else {
      callback(err, null);
    }
  });
  tester.once('listening', () => {
    tester.close(() => {
      callback(null, startPort);
    });
  });
  tester.listen(startPort);
}

function enhanceResponse(res) {
  res.status = function(code) {
    this.statusCode = code;
    return this;
  };
  res.json = function(data) {
    this.setHeader('Content-Type', 'application/json; charset=UTF-8');
    this.end(JSON.stringify(data));
    return this;
  };
}

const server = http.createServer((req, res) => {
  enhanceResponse(res);
  res.setHeader('Access-Control-Allow-Origin', '*');

  let reqPath = req.url.split('?')[0];

  // 1. Route API Endpoints (Parity with Vercel Serverless Functions)
  if (reqPath === '/api/contact' || reqPath === '/api/contact.js') {
    let bodyData = '';
    req.on('data', chunk => bodyData += chunk);
    req.on('end', async () => {
      if (bodyData) {
        try {
          req.body = JSON.parse(bodyData);
        } catch (e) {
          req.body = bodyData;
        }
      }
      try {
        delete require.cache[require.resolve('./api/contact.js')];
        const handler = require('./api/contact.js');
        await handler(req, res);
      } catch (err) {
        console.error('[LOCAL_API_ERROR]', err);
        res.status(500).json({ success: false, error: err.message });
      }
    });
    return;
  }

  if (reqPath === '/api/health' || reqPath === '/api/health.js') {
    try {
      const handler = require('./api/health.js');
      handler(req, res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  // 2. Static File Serving
  if (reqPath === '/') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('500 Internal Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

if (require.main === module) {
  findAvailablePort(DEFAULT_PORT, (err, port) => {
    if (err) {
      console.error('Failed to find an open port:', err);
      process.exit(1);
    }

    server.listen(port, () => {
      console.log(`\n======================================================`);
      console.log(`🚀 Luxury Portfolio Dev Server is LIVE!`);
      console.log(`👉 Open in browser: http://localhost:${port}`);
      console.log(`📁 Serving directory: ${PUBLIC_DIR}`);
      console.log(`⚡ API Routes: http://localhost:${port}/api/contact`);
      console.log(`⚡ Health Check: http://localhost:${port}/api/health`);
      console.log(`======================================================\n`);
    });
  });
}

module.exports = (req, res) => {
  server.emit('request', req, res);
};

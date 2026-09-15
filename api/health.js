// Vercel Serverless Function: Health Check & System Status
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    status: 'operational',
    service: 'Mohammad Hasan Haute Engineering API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
};

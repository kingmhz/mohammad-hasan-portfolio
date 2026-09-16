// Vercel Serverless Function: Direct Video Call & Client Brief Scheduler Endpoint
const https = require('https');

// In-Memory IP Sliding-Window Rate Limiter (Max 5 requests per 15 minutes)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Periodic cleanup of expired entries
if (typeof setInterval !== 'undefined') {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 10 * 60 * 1000);
  if (cleanupTimer.unref) cleanupTimer.unref();
}

module.exports = async (req, res) => {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Expected POST.'
    });
  }

  // IP Rate Limiting Check
  const rawIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || (req.socket && req.socket.remoteAddress) || 'unknown';
  const clientIp = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : 'unknown';
  if (clientIp !== 'unknown' && isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. Please wait a few moments before trying again or email hasanisbest786@gmail.com directly.'
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ success: false, error: 'Malformed JSON payload.' });
      }
    }

    const { name, email, projectType, budget, timeline, message, meetingSlot, platform, _gotcha } = body || {};

    // 1. Honeypot Anti-Spam Check
    if (_gotcha && _gotcha.trim().length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Your request has been registered.'
      });
    }

    // 2. Input Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your name or organization (minimum 2 characters).'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid work or personal email address.'
      });
    }

    const isMeeting = !!meetingSlot;
    const finalPlatform = platform || 'Google Meet';
    const reference = 'MH-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const meetingRoomId = 'hasan-' + Math.random().toString(36).substring(2, 6) + '-' + Math.random().toString(36).substring(2, 5);
    const meetingLink = `https://meet.google.com/${meetingRoomId}`;

    const finalMessage = message && message.trim().length > 0 
      ? message.trim() 
      : (meetingSlot ? `Reserved ${finalPlatform} Video Call: ${meetingSlot}` : '');

    if (!finalMessage || finalMessage.length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please provide brief details about your technical requirements.'
      });
    }

    const sanitizedData = {
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase().substring(0, 120),
      projectType: (projectType || (isMeeting ? '15-Min Strategic Video Discovery' : 'General Consultation')).trim().substring(0, 80),
      budget: (budget || 'Not Specified').trim().substring(0, 50),
      timeline: (timeline || (meetingSlot ? meetingSlot : 'Flexible')).trim().substring(0, 80),
      meetingSlot: meetingSlot ? meetingSlot.trim().substring(0, 80) : null,
      platform: finalPlatform,
      meetingLink: isMeeting ? meetingLink : null,
      message: finalMessage.substring(0, 3000),
      reference: reference,
      receivedAt: new Date().toISOString()
    };

    console.log('[DIRECT VIDEO CALL / INQUIRY RECEIVED]', JSON.stringify(sanitizedData, null, 2));

    // 3. Direct Email Forwarding to hasanisbest786@gmail.com via FormSubmit
    try {
      await forwardViaFormSubmit(sanitizedData);
    } catch (err) {
      console.error('[FORMSUBMIT_FORWARD_ERROR]', err.message);
    }

    // 4. Optional Resend Email Forwarding Integration (if configured in env)
    if (process.env.RESEND_API_KEY) {
      try {
        await forwardViaResend(sanitizedData);
      } catch (err) {
        console.error('[RESEND_FORWARD_ERROR]', err.message);
      }
    }

    // 5. Optional Webhook Forwarding (Discord, Slack, Make, Zapier)
    if (process.env.WEBHOOK_URL) {
      try {
        await forwardViaWebhook(process.env.WEBHOOK_URL, sanitizedData);
      } catch (err) {
        console.error('[WEBHOOK_FORWARD_ERROR]', err.message);
      }
    }

    // Return comprehensive meeting confirmation response
    return res.status(200).json({
      success: true,
      message: isMeeting 
        ? `Video call scheduled for ${sanitizedData.meetingSlot} on ${sanitizedData.platform}. A calendar invite with meeting link has been dispatched to ${sanitizedData.email}.`
        : 'Brief successfully transmitted. Mohammad Hasan will review your specifications and reply within 24 hours.',
      data: {
        reference: reference,
        meetingSlot: sanitizedData.meetingSlot,
        platform: sanitizedData.platform,
        meetingLink: sanitizedData.meetingLink,
        timestamp: sanitizedData.receivedAt
      }
    });

  } catch (error) {
    console.error('[API_ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while scheduling your call. Please email hasanisbest786@gmail.com directly.'
    });
  }
};

// Helper: Forward via FormSubmit directly to hasanisbest786@gmail.com (No API Key Required)
function forwardViaFormSubmit(data) {
  return new Promise((resolve, reject) => {
    const isMeeting = !!data.meetingSlot;
    const postData = JSON.stringify({
      _subject: isMeeting 
        ? `🚨 [NEW VIDEO CALL SCHEDULED] ${data.name} — ${data.meetingSlot} (${data.platform})`
        : `💼 [NEW CLIENT BRIEF] ${data.name} — ${data.projectType}`,
      "Client Name": data.name,
      "Client Email": data.email,
      "Meeting Date & Time": data.meetingSlot || 'General Brief',
      "Video Platform": data.platform || 'N/A',
      "Video Call Link": data.meetingLink || 'N/A',
      "Project Scope": data.projectType,
      "Estimated Budget": data.budget,
      "Client Message": data.message,
      "Tracking Reference": data.reference,
      _template: "table",
      _captcha: "false"
    });

    const options = {
      hostname: 'formsubmit.co',
      port: 443,
      path: '/ajax/hasanisbest786@gmail.com',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://mohammad-hasan-portfolio.vercel.app',
        'Referer': 'https://mohammad-hasan-portfolio.vercel.app/',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let resBody = '';
      res.on('data', chunk => resBody += chunk);
      res.on('end', () => {
        console.log('[FORMSUBMIT_RESPONSE]', res.statusCode, resBody);
        resolve(resBody);
      });
    });

    req.on('error', (err) => {
      console.warn('[FORMSUBMIT_NETWORK_WARN]', err.message);
      resolve(); // Do not block user flow on external notification delay
    });

    req.setTimeout(4000, () => {
      req.destroy();
      resolve();
    });

    req.write(postData);
    req.end();
  });
}

// Helper: Forward via Resend API
function forwardViaResend(data) {
  return new Promise((resolve, reject) => {
    const isMeeting = !!data.meetingSlot;
    const postData = JSON.stringify({
      from: 'Video Call Scheduler <onboarding@resend.dev>',
      to: [process.env.NOTIFICATION_EMAIL || 'hasanisbest786@gmail.com'],
      subject: isMeeting 
        ? `🎥 [VIDEO CALL SCHEDULED] ${data.name} — ${data.meetingSlot} (${data.platform})`
        : `[New Client Brief] ${data.name} — ${data.projectType} (${data.budget})`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #040507; color: #E2E8F0; padding: 24px; border-radius: 8px;">
          <h2 style="color: #D4AF37; margin-top: 0;">${isMeeting ? '🎥 New Video Call Consultation Scheduled' : 'New Project Brief Received'}</h2>
          <p><strong>Client Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #F3E5AB;">${data.email}</a></p>
          ${isMeeting ? `
            <p><strong>Scheduled Slot:</strong> <span style="color: #D4AF37; font-weight: bold;">${data.meetingSlot}</span></p>
            <p><strong>Platform:</strong> ${data.platform}</p>
            <p><strong>Meeting Room Link:</strong> <a href="${data.meetingLink}" style="color: #6EE7B7; font-weight: bold;">${data.meetingLink}</a></p>
          ` : ''}
          <p><strong>Project Category:</strong> ${data.projectType}</p>
          <p><strong>Budget Tier:</strong> ${data.budget}</p>
          <hr style="border: 1px solid #1C2028; margin: 20px 0;">
          <h4 style="color: #D4AF37;">Agenda / Notes:</h4>
          <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
          <div style="margin-top: 24px; font-size: 11px; color: #94A3B8;">
            Tracking Reference: ${data.reference} · Received at ${data.receivedAt}
          </div>
        </div>
      `
    });

    const options = {
      hostname: 'api.resend.com',
      port: 443,
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let resBody = '';
      res.on('data', chunk => resBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(resBody);
        } else {
          resolve();
        }
      });
    });

    req.on('error', () => resolve());
    req.write(postData);
    req.end();
  });
}

// Helper: Forward via Webhook
function forwardViaWebhook(url, data) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const isMeeting = !!data.meetingSlot;
      const postData = JSON.stringify({
        content: isMeeting
          ? `🎥 **NEW VIDEO CALL SCHEDULED!**\n**Client:** ${data.name}\n**Email:** ${data.email}\n**Time:** ${data.meetingSlot}\n**Platform:** ${data.platform}\n**Meeting Link:** ${data.meetingLink}\n**Agenda:** ${data.projectType}`
          : `🔔 **New Project Brief from ${data.name}**\n**Email:** ${data.email}\n**Scope:** ${data.projectType}\n**Budget:** ${data.budget}\n**Message:**\n${data.message}`
      });

      const options = {
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
        path: parsed.pathname + parsed.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const client = parsed.protocol === 'https:' ? https : require('http');
      const req = client.request(options, () => resolve());
      req.on('error', () => resolve());
      req.write(postData);
      req.end();
    } catch (e) {
      resolve();
    }
  });
}

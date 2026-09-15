// Vercel Serverless Function: Luxury Client Brief & Project Inquiry Endpoint
const https = require('https');

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

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ success: false, error: 'Malformed JSON payload.' });
      }
    }

    const { name, email, projectType, budget, timeline, message, meetingSlot, _gotcha } = body || {};

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

    const finalMessage = message && message.trim().length > 0 
      ? message.trim() 
      : (meetingSlot ? `Reserved Discovery Call Slot: ${meetingSlot}` : '');

    if (!finalMessage || finalMessage.length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please provide brief details about your technical requirements.'
      });
    }

    const sanitizedData = {
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase().substring(0, 120),
      projectType: (projectType || (meetingSlot ? '15-Min Discovery Call' : 'General Consultation')).trim().substring(0, 80),
      budget: (budget || 'Not Specified').trim().substring(0, 50),
      timeline: (timeline || (meetingSlot ? meetingSlot : 'Flexible')).trim().substring(0, 80),
      meetingSlot: meetingSlot ? meetingSlot.trim().substring(0, 80) : null,
      message: finalMessage.substring(0, 3000),
      receivedAt: new Date().toISOString()
    };

    console.log('[INQUIRY / MEETING RESERVATION RECEIVED]', JSON.stringify(sanitizedData, null, 2));

    // 3. Optional Resend Email Forwarding Integration
    if (process.env.RESEND_API_KEY) {
      try {
        await forwardViaResend(sanitizedData);
      } catch (err) {
        console.error('[RESEND_FORWARD_ERROR]', err.message);
      }
    }

    // 4. Optional Webhook Forwarding (Discord, Slack, Make, Zapier)
    if (process.env.WEBHOOK_URL) {
      try {
        await forwardViaWebhook(process.env.WEBHOOK_URL, sanitizedData);
      } catch (err) {
        console.error('[WEBHOOK_FORWARD_ERROR]', err.message);
      }
    }

    // Return polished luxury response
    return res.status(200).json({
      success: true,
      message: meetingSlot 
        ? `Meeting slot confirmed for ${sanitizedData.meetingSlot}. A private calendar invite will be sent to ${sanitizedData.email}.`
        : 'Brief successfully transmitted. Mohammad Hasan will review your specifications and reply within 24 hours.',
      data: {
        reference: 'MH-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        meetingSlot: sanitizedData.meetingSlot,
        timestamp: sanitizedData.receivedAt
      }
    });

  } catch (error) {
    console.error('[API_ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please email hasanisbest786@gmail.com directly.'
    });
  }
};

// Helper: Forward via Resend API
function forwardViaResend(data) {
  return new Promise((resolve, reject) => {
    const isMeeting = !!data.meetingSlot;
    const postData = JSON.stringify({
      from: 'Portfolio Inquiries <onboarding@resend.dev>',
      to: [process.env.NOTIFICATION_EMAIL || 'hasanisbest786@gmail.com'],
      subject: isMeeting 
        ? `📅 [NEW MEETING RESERVED] ${data.name} — ${data.meetingSlot}`
        : `[New Client Brief] ${data.name} — ${data.projectType} (${data.budget})`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #040507; color: #E2E8F0; padding: 24px; border-radius: 8px;">
          <h2 style="color: #D4AF37; margin-top: 0;">${isMeeting ? 'New Meeting Slot Reserved' : 'New Project Brief Received'}</h2>
          <p><strong>Client Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #F3E5AB;">${data.email}</a></p>
          ${isMeeting ? `<p><strong>Confirmed Slot:</strong> <span style="color: #D4AF37; font-weight: bold;">${data.meetingSlot}</span></p>` : ''}
          <p><strong>Project Category:</strong> ${data.projectType}</p>
          <p><strong>Budget Tier:</strong> ${data.budget}</p>
          <hr style="border: 1px solid #1C2028; margin: 20px 0;">
          <h4 style="color: #D4AF37;">Notes & Specifications:</h4>
          <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
          <div style="margin-top: 24px; font-size: 11px; color: #94A3B8;">
            Transmitted via mohammad-hasan-portfolio at ${data.receivedAt}
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
          reject(new Error(`Resend returned status ${res.statusCode}: ${resBody}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Helper: Forward via Webhook
function forwardViaWebhook(url, data) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const isMeeting = !!data.meetingSlot;
    const postData = JSON.stringify({
      content: isMeeting
        ? `🔥 **NEW MEETING RESERVED!**\n**Client:** ${data.name}\n**Email:** ${data.email}\n**Slot:** ${data.meetingSlot}\n**Scope:** ${data.projectType}`
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
    const req = client.request(options, (res) => {
      resolve();
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

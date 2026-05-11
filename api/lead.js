// Vercel serverless function — handles contact form submissions.
// Set RESEND_API_KEY and NOTIFICATION_EMAIL in Vercel environment variables.
// Get a free Resend API key at resend.com (100 emails/day free).

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, service, propertyType, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL;

  if (!resendKey || !toEmail) {
    console.error('Missing email config');
    return res.status(500).json({ error: 'Email not configured. Lead saved but not sent.' });
  }

  const emailBody = `
NEW LEAD — Capital City Pressure Washing

Name: ${name}
Phone: ${phone}
Email: ${email || 'not provided'}
Service Interest: ${service || 'not specified'}
Property Type: ${propertyType || 'not specified'}

Message:
${message || '(no message)'}

---
Submitted from capitalcitypressurewashing.com
  `.trim();

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Capital City Leads <onboarding@resend.dev>',
        to: [toEmail],
        subject: `🚿 New Lead: ${name} — ${service || 'General inquiry'}`,
        text: emailBody,
        reply_to: email || undefined,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send notification' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return res.status(500).json({ error: error.message });
  }
}

import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.MY_MAIL;
    const myEmail = process.env.MY_MAIL;

    if (!apiKey) {
      console.error("Missing BREVO_API_KEY in environment variables");
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    const url = "https://api.brevo.com/v3/smtp/email";
    const headers = {
      "accept": "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    };

    // 1. Send notification to the portfolio owner
    const notificationPayload = {
      sender: { name: "Portfolio Contact Form", email: senderEmail },
      to: [{ email: myEmail, name: "Shreyash Patel" }],
      replyTo: { email: email, name: name },
      subject: `New Portfolio Message from ${name}`,
      htmlContent: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    const notifyRes = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(notificationPayload),
    });

    if (!notifyRes.ok) {
      const errorData = await notifyRes.json();
      console.error("Brevo notification error:", errorData);
      throw new Error("Failed to send notification email");
    }

    // 2. Send auto-responder to the sender
    const autoResponderPayload = {
      sender: { name: "Shreyash Patel", email: senderEmail },
      to: [{ email: email, name: name }],
      subject: "Thank you for reaching out!",
      htmlContent: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <p>Hi ${name},</p>
          <p>Thank you for getting in touch! I have received your message and will get back to you as soon as possible.</p>
          <p>For your records, here is a copy of your message:</p>
          <blockquote style="border-left: 4px solid #4f46e5; padding-left: 16px; margin-left: 0; color: #555;">
            ${message.replace(/\n/g, '<br/>')}
          </blockquote>
          <p>Best regards,<br/><strong>Shreyash Patel</strong><br/>Full Stack Developer</p>
        </div>
      `,
    };

    // We don't want to fail the whole request if the auto-responder fails, just log it
    try {
      const autoRes = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(autoResponderPayload),
      });
      if (!autoRes.ok) {
        console.error("Brevo auto-responder error:", await autoRes.json());
      }
    } catch (err) {
      console.error("Auto-responder exception:", err);
    }

    return Response.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Contact API Error:", error);
    return Response.json({ error: "Failed to process request" }, { status: 500 });
  }
}


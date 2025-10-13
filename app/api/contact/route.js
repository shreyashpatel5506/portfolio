import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        // --- 1. Create the transporter ---
        // This is the service that will send the email. I'm using Gmail here.
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.MY_MAIL, // Your email from .env.local
                pass: process.env.MY_PASSWORD, // Your app password from .env.local
            },
        });

        // --- 2. Send email to yourself ---
        // This email notifies you that you have a new message from your portfolio.
        await transporter.sendMail({
            from: process.env.MY_MAIL,
            to: process.env.MY_MAIL,
            subject: `New Message from ${name} on your Portfolio`,
            html: `
                <h3>You've received a new message!</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        // --- 3. Send confirmation email to the user ---
        // This email confirms to the user that their message has been received.
        await transporter.sendMail({
            from: process.env.MY_MAIL,
            to: email, // The user's email address
            subject: "Thanks for getting in touch!",
            html: `
                <h3>Hi ${name},</h3>
                <p>Thanks for contacting me! I've received your message and will get back to you as soon as possible.</p>
                <p>Best regards,</p>
                <p>Shreyash Patel</p>
            `,
        });

        return NextResponse.json({ success: true, message: "Emails sent successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ success: false, error: "Failed to send email." }, { status: 500 });
    }
}

import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transport = nodemailer.createTransport({
    service: 'gmail',
    host: SMTP_SERVER_HOST,
    port: 587,
    secure: true,
    auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD,
    },
} as SMTPTransport.Options);

type SendEmailDto = {
    sender: { name: string; address: string }; // sender should be an object with name and address
    recipients: string[]; // recipients should be an array of strings (email addresses)
    subject: string;
    message: string;
}

export const sendEmail = async (dto: SendEmailDto) => {
    const { sender, recipients, subject, message } = dto;
    console.log(sender, recipients, subject, message, 'working')
    try {
        // Send the email
        const info = await transport.sendMail({
            from: `${sender.name} <${sender.address}>`, // Format sender properly
            to: recipients.join(','), // Join the recipients if it's an array
            subject,
            text: message,  // Plain text version
            html: message,  // HTML version (useful if you want to format the message)
        });
        console.log('Message sent: %s', info.messageId);
        return info; // Return the info for debugging purposes
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;  // Throw error for further handling
    }
};

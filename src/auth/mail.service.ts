// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: '',
        pass: '',
      },
    });
  }

  async sendUserConfirmation(email: string): Promise<void> {
    const mailOptions = {
      from: 'Pingup.com', // Sender address
      to: email, // List of recipients
      subject: 'Registration Successful', // Subject line
      text: 'You have successfully registered!', // Plain text body
      html: '<b>You have successfully registered!</b>', // HTML body
    };

    await this.transporter.sendMail(mailOptions);
  }
}

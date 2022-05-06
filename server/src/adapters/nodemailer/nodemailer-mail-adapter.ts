import nodemailer, { Transporter } from 'nodemailer';

import { MailAdapter, SendMailData } from "../mail-adapter";

export class NodemailerMailAdapter implements MailAdapter {
  private transport: Transporter;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9ff8ef80e2979d",
        pass: "9774321aea08f1"
      }
    });
  }

  async sendMail({ subject, content }: SendMailData) {
    await this.transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Diego Fernandes <diego.schell.f@gmail.com>",
      subject,
      html: content,
    })
  }
}
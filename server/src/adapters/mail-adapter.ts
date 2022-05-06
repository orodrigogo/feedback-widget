export interface SendMailData {
  subject: string;
  content: string;
}

export interface MailAdapter {
  sendMail(data: SendMailData): Promise<void>;
}
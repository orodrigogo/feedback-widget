import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  screenshot?: string;
  comment: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute({ type, screenshot, comment }: SubmitFeedbackUseCaseRequest) {
    if (!type) {
      throw new Error('Feedback type must be provided.');
    }

    if (!comment) {
      throw new Error('Feedback comment must be provided.');
    }

    await this.feedbacksRepository.create({
      type,
      screenshot,
      comment,
    })

    await this.mailAdapter.sendMail({
      subject: `[${type}] Novo feedback`,
      content: [
        `<p>Tipo de feedback: <strong>${type}</strong></p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : false,
      ].filter(Boolean).join('')
    });
  }
}
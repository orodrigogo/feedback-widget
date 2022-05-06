import { Router } from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = Router();

routes.post('/feedbacks', async (req, res) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedback = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter,
  )

  try {
    const { type, screenshot, comment } = req.body;

    await submitFeedback.execute({ type, screenshot, comment });

    return res.status(201).send()
  } catch (err) {
    return res.status(400).json({ message: 'Error submitting feedback.' })
  }
});
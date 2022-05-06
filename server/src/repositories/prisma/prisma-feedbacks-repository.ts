import { prisma } from "../../prisma";
import { CreateFeedbackData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: CreateFeedbackData): Promise<void> {
    await prisma.feedback.create({
      data,
    })
  }
}
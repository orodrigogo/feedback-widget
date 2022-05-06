export interface CreateFeedbackData {
  type: string;
  screenshot?: string;
  comment: string;
}

export interface FeedbacksRepository {
  create(data: CreateFeedbackData): Promise<void>;
}
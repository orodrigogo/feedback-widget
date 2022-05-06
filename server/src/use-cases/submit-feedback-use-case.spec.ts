import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackMock = jest.fn();
const sendMailMock = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackMock },
  { sendMail: sendMailMock }
)

describe('Submit feedback', () => {
  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({ 
      type: '', 
      comment: 'example comment' 
    })).rejects.toThrow()
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({ 
      type: 'bug', 
      comment: '' 
    })).rejects.toThrow()
  });

  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({ 
      type: 'bug', 
      comment: 'example comment',
      screenshot: 'test.jpg',
    })).resolves.not.toThrow();

    expect(sendMailMock).toBeCalled()
    expect(createFeedbackMock).toBeCalledWith(expect.objectContaining({
      type: 'bug', 
      comment: 'example comment' 
    }))
  });
})
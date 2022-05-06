import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";

import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../../lib/api";

import { Loading } from "../../../Loading";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
  feedbackType: FeedbackType;
}

export function FeedbackContentStep({ 
  onFeedbackCanceled, 
  onFeedbackSent, 
  feedbackType 
}: FeedbackContentStepProps) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')

  async function handleSendFeedback(event: FormEvent) {
    event.preventDefault();

    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);

    await api.post('/feedbacks', {
      type: feedbackType,
      screenshot,
      comment,
    })

    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  return (
    <>
      <header>
        <button onClick={onFeedbackCanceled} className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSendFeedback}>
        <textarea 
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin" 
          placeholder="Conte com detalhes o que está acontecendo..."
          value={comment}
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton 
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button 
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 transition-colors duration-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
            disabled={comment.length === 0}
            type="submit"
          >
            { isSendingFeedback ? <Loading /> : 'Enviar feedback' }
          </button>
        </footer>
      </form>
    </>
  );
}
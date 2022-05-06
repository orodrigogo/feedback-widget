import { useState } from 'react';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';

import bugImageUrl from '../../../assets/bug.svg';
import ideaImageUrl from '../../../assets/idea.svg';
import thoughtImageUrl from '../../../assets/thought.svg';

export const feedbackTypes = {
  'BUG': {
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto",
    },
    title: 'Problema'
  },
  'IDEA': {
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lâmpada",
    },
    title: 'Ideia'
  },
  'OTHER': {
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de uma nuvem de pensamento",
    },
    title: 'Outro'
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleFeedbackSent() {
    setFeedbackSent(true);
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      { feedbackSent ? (
        <FeedbackSuccessStep 
          onSendAnotherFeedbackRequest={handleRestartFeedback}
        />
      ) : (
        <>
          { !feedbackType ? (
            <FeedbackTypeStep 
              onFeedbackTypeChanged={setFeedbackType}
            />
          ) : (
            <FeedbackContentStep 
              feedbackType={feedbackType} 
              onFeedbackCanceled={() => setFeedbackType(null)}
              onFeedbackSent={handleFeedbackSent}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a className="underline underline-offset-1" target="_blank" href="https://rocketseat.com.br">Rocketseat</a>
      </footer>
    </div>
  );
}
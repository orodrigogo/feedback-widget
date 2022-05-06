import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../../Loading";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({ 
  screenshot,
  onScreenshotTook 
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleScreenshot() {
    setIsTakingScreenshot(true)

    const canvas = await html2canvas(document.querySelector('html')!)

    const base64image = canvas.toDataURL("image/png");

    onScreenshotTook(base64image)
    setIsTakingScreenshot(false)
  }

  function handleDeleteScreenshot() {
    onScreenshotTook(null)
  }

  if (screenshot) {
    return (
      <button 
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={screenshot ? { 
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        } : {}}
        onClick={handleDeleteScreenshot}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button 
      type="button"
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors duration-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
      onClick={handleScreenshot}
    >
      { isTakingScreenshot 
        ? <Loading /> 
        : <Camera className="w-6 h-6 text-zinc-100" />
      }
    </button>
  );
}
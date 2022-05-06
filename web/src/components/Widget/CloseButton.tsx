import { Popover } from "@headlessui/react";
import { X } from "phosphor-react";
import { ButtonHTMLAttributes } from "react";

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function CloseButton(props: CloseButtonProps) {
  return (
    <Popover.Button className="top-5 right-5 absolute text-zinc-400 hover:text-zinc-100" title="Fechar formulário de feedback" {...props}>
      <X weight="bold" className="w-4 h-4" />
    </Popover.Button>
  )
}
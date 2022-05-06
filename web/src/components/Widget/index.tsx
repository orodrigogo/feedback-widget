import { ChatTeardropDots } from "phosphor-react";
import { Popover, Transition } from '@headlessui/react'
import { WidgetForm } from "./WidgetForm";
import { Fragment } from "react";

export function Widget() {
  return (
    <Popover className="bottom-4 right-4 md:bottom-10 md:right-10 absolute flex flex-col items-end">
      {/* <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      > */}
        <Popover.Panel>
          <WidgetForm />
        </Popover.Panel>
      {/* </Transition> */}

      <Popover.Button 
        className="h-12 group bg-brand-500 rounded-full px-3 flex items-center"
      >
        <ChatTeardropDots className="w-6 h-6 overflow-visible" />
        <span className="flex-1 max-w-0 overflow-hidden group-hover:max-w-xs transition-width duration-500 ease-linear">
          <span className="pl-2"></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
}
"use client";

import { useEffect, useId, useRef } from "react";

interface ModalProps {
  title: string;
  dismissible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, dismissible, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const downTarget = useRef<EventTarget | null>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) {
      d.showModal();
      d.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(e) => {
        if (!dismissible) e.preventDefault();
      }}
      onPointerDown={(e) => {
        downTarget.current = e.target;
      }}
      onPointerUp={(e) => {
        const d = ref.current;
        if (dismissible && d && e.target === d && downTarget.current === d) {
          d.close();
        }
        downTarget.current = null;
      }}
      className="fixed inset-x-0 top-auto bottom-0 m-0 w-full max-w-none max-h-[90dvh] overflow-hidden p-0 rounded-t-2xl bg-paper text-ink shadow-xl
                 sm:inset-y-0 sm:m-auto sm:h-fit sm:max-w-lg sm:rounded-2xl"
    >
      <div className="max-h-[90dvh] overflow-y-auto p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-serif text-xl font-bold leading-snug">
            {title}
          </h2>
          <form method="dialog">
            <button
              type="submit"
              disabled={!dismissible}
              className="min-h-11 shrink-0 rounded-lg px-3 text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              닫기
            </button>
          </form>
        </div>
        {children}
      </div>
    </dialog>
  );
}

"use client";

import { PracticeNotice } from "@/components/PracticeNotice";

interface ReceiptViewProps {
  receiptNumber: string;
  message: string;
}

export function ReceiptView({ receiptNumber, message }: ReceiptViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <PracticeNotice variant="inline" />
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-accent/40 bg-white/60 p-5"
      >
        <p className="text-sm text-muted">접수 번호</p>
        <p className="mt-1 font-mono text-2xl font-bold tracking-wide">
          {receiptNumber}
        </p>
        <p className="mt-3 text-sm leading-relaxed">{message}</p>
        <p className="mt-2 text-sm text-muted">
          실제로 처리되지 않은 연습용 접수입니다.
        </p>
      </div>
      <form method="dialog">
        <button
          type="submit"
          data-autofocus
          className="min-h-11 w-full rounded-lg bg-accent px-4 font-medium text-white hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          닫기
        </button>
      </form>
    </div>
  );
}

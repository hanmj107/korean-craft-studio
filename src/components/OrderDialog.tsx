"use client";

import { useRef, useState } from "react";
import { Modal } from "@/components/Modal";
import { OrderForm } from "@/components/OrderForm";

export function OrderDialog({
  craftId,
  craftName,
}: {
  craftId: string;
  craftName: string;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function handleClose() {
    setOpen(false);
    setBusy(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${craftName} 주문 문의하기`}
        className="min-h-11 w-full rounded-lg bg-accent px-4 font-medium text-white hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        주문 문의하기
      </button>
      {open && (
        <Modal title="주문 문의" dismissible={!busy} onClose={handleClose}>
          <OrderForm craftId={craftId} onBusyChange={setBusy} />
        </Modal>
      )}
    </>
  );
}

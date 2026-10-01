"use client";

import { useRef, useState } from "react";
import { ClassForm } from "@/components/ClassForm";
import { Modal } from "@/components/Modal";
import { localDateString } from "@/lib/format";
import type { CraftClass } from "@/types";

export function ClassDialog({ craftClass }: { craftClass: CraftClass }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [minDate, setMinDate] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);

  function handleOpen() {
    setMinDate(localDateString(new Date()));
    setOpen(true);
  }

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
        onClick={handleOpen}
        className="min-h-11 w-full rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        신청하기
      </button>
      {open && (
        <Modal title="클래스 신청" dismissible={!busy} onClose={handleClose}>
          <ClassForm
            initialClassId={craftClass.id}
            minDate={minDate}
            onBusyChange={setBusy}
          />
        </Modal>
      )}
    </>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { PracticeNotice } from "@/components/PracticeNotice";
import { ReceiptView } from "@/components/ReceiptView";
import { isValidContact } from "@/lib/contact";
import { submitOrderInquiry } from "@/lib/mock-api";
import { crafts } from "@/mocks/crafts";
import type { SubmitStatus } from "@/types";

type FieldKey = "name" | "contact" | "craftId" | "quantity";
type Errors = Partial<Record<FieldKey, string>>;

const FIELD_ORDER: FieldKey[] = ["name", "contact", "craftId", "quantity"];

const inputClass =
  "min-h-11 w-full rounded-lg border border-muted/50 bg-white px-3 py-2 text-base text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent aria-[invalid=true]:border-danger disabled:opacity-60";
const labelClass = "mb-1 block text-sm font-medium";
const errorClass = "mt-1 text-sm text-danger";

interface OrderFormProps {
  craftId: string;
  onBusyChange: (busy: boolean) => void;
}

export function OrderForm({ craftId, onBusyChange }: OrderFormProps) {
  const uid = useId();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [selectedId, setSelectedId] = useState(craftId);
  const [quantity, setQuantity] = useState("1");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });
  const submittingRef = useRef(false);
  const mountedRef = useRef(false);
  const fieldRefs = useRef<
    Partial<Record<FieldKey, HTMLInputElement | HTMLSelectElement | null>>
  >({});

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const id = (key: string) => `${uid}-${key}`;

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = "이름을 입력해 주세요.";
    if (!contact.trim()) next.contact = "연락처를 입력해 주세요.";
    else if (!isValidContact(contact))
      next.contact = "올바른 연락처 형식이 아닙니다. 예: 010-1234-5678";
    if (!crafts.some((c) => c.id === selectedId))
      next.craftId = "상품을 선택해 주세요.";
    const q = Number(quantity);
    if (quantity.trim() === "" || !Number.isInteger(q) || q < 1 || q > 10)
      next.quantity = "수량은 1개에서 10개 사이의 정수로 입력해 주세요.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;
    const found = validate();
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((k) => found[k]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }
    submittingRef.current = true;
    setStatus({ state: "loading" });
    onBusyChange(true);
    let next: SubmitStatus;
    try {
      const res = await submitOrderInquiry({
        name: name.trim(),
        contact,
        craftId: selectedId,
        quantity: Number(quantity),
        message: message.trim(),
      });
      next = res.success
        ? {
            state: "success",
            receiptNumber: res.receiptNumber,
            message: res.message,
          }
        : { state: "error", message: res.message };
    } catch {
      next = {
        state: "error",
        message: "실습용 오류: 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      };
    }
    submittingRef.current = false;
    if (!mountedRef.current) return;
    setStatus(next);
    onBusyChange(false);
  }

  if (status.state === "success") {
    return (
      <ReceiptView
        receiptNumber={status.receiptNumber}
        message={status.message}
      />
    );
  }

  const loading = status.state === "loading";
  const errorMessages = FIELD_ORDER.flatMap((k) => {
    const m = errors[k];
    return m ? [m] : [];
  });

  const describe = (key: FieldKey) =>
    errors[key] ? id(`${key}-error`) : undefined;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={loading}
      className="flex flex-col gap-4"
    >
      <PracticeNotice variant="inline" />

      <div>
        <label htmlFor={id("name")} className={labelClass}>
          이름
        </label>
        <input
          id={id("name")}
          ref={(el) => {
            fieldRefs.current.name = el;
          }}
          type="text"
          data-autofocus
          placeholder="가상 이름"
          autoComplete="off"
          disabled={loading}
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describe("name")}
          className={inputClass}
        />
        {errors.name && (
          <p id={id("name-error")} className={errorClass}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={id("contact")} className={labelClass}>
          연락처
        </label>
        <input
          id={id("contact")}
          ref={(el) => {
            fieldRefs.current.contact = el;
          }}
          type="tel"
          inputMode="tel"
          placeholder="010-0000-0000"
          autoComplete="off"
          disabled={loading}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          aria-invalid={errors.contact ? true : undefined}
          aria-describedby={describe("contact")}
          className={inputClass}
        />
        {errors.contact && (
          <p id={id("contact-error")} className={errorClass}>
            {errors.contact}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={id("craftId")} className={labelClass}>
          상품
        </label>
        <select
          id={id("craftId")}
          ref={(el) => {
            fieldRefs.current.craftId = el;
          }}
          disabled={loading}
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          aria-invalid={errors.craftId ? true : undefined}
          aria-describedby={describe("craftId")}
          className={inputClass}
        >
          <option value="">상품을 선택하세요</option>
          {crafts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.craftId && (
          <p id={id("craftId-error")} className={errorClass}>
            {errors.craftId}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={id("quantity")} className={labelClass}>
          수량 (1~10)
        </label>
        <input
          id={id("quantity")}
          ref={(el) => {
            fieldRefs.current.quantity = el;
          }}
          type="number"
          inputMode="numeric"
          min={1}
          max={10}
          step={1}
          disabled={loading}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          aria-invalid={errors.quantity ? true : undefined}
          aria-describedby={describe("quantity")}
          className={inputClass}
        />
        {errors.quantity && (
          <p id={id("quantity-error")} className={errorClass}>
            {errors.quantity}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={id("message")} className={labelClass}>
          요청사항 (선택)
        </label>
        <textarea
          id={id("message")}
          rows={3}
          disabled={loading}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
        />
      </div>

      <div aria-live="polite" className="text-sm text-danger">
        {errorMessages.length > 0 &&
          `입력을 확인해 주세요. ${errorMessages.length}개 항목에 오류가 있습니다.`}
      </div>

      {status.state === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-danger/40 bg-white p-3 text-sm text-danger"
        >
          {status.message}
        </p>
      )}
      {loading && (
        <p role="status" className="text-sm text-muted">
          접수 중입니다. 잠시만 기다려 주세요.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="min-h-11 w-full rounded-lg bg-accent px-4 font-medium text-white hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
      >
        {loading ? "접수 중…" : "주문 문의 보내기"}
      </button>
    </form>
  );
}

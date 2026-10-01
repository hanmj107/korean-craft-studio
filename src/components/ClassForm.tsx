"use client";

import { useEffect, useRef, useState } from "react";
import { PracticeNotice } from "@/components/PracticeNotice";
import { ReceiptView } from "@/components/ReceiptView";
import { isValidContact } from "@/lib/contact";
import { localDateString } from "@/lib/format";
import { submitClassApplication } from "@/lib/mock-api";
import { classes } from "@/mocks/classes";
import type { SubmitStatus } from "@/types";

const inputClass =
  "min-h-11 w-full rounded-lg border border-muted/40 bg-white px-3 py-2 text-base placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent aria-[invalid=true]:border-danger";
const labelClass = "mb-1 block text-sm font-medium";
const errorClass = "mt-1 text-sm text-danger";

type FieldKey = "name" | "contact" | "classId" | "date" | "headcount";
type Errors = Partial<Record<FieldKey, string>>;

const fieldOrder: FieldKey[] = ["name", "contact", "classId", "date", "headcount"];
const fieldLabel: Record<FieldKey, string> = {
  name: "이름",
  contact: "연락처",
  classId: "클래스",
  date: "희망 날짜",
  headcount: "인원",
};

interface ClassFormProps {
  initialClassId: string;
  minDate: string;
  onBusyChange: (busy: boolean) => void;
}

export function ClassForm({
  initialClassId,
  minDate,
  onBusyChange,
}: ClassFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [classId, setClassId] = useState(initialClassId);
  const [date, setDate] = useState("");
  const [headcount, setHeadcount] = useState("1");
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

  const selected = classes.find((c) => c.id === classId);
  const capacity = selected?.capacity ?? 1;

  function handleClassChange(id: string) {
    setClassId(id);
    const cap = classes.find((c) => c.id === id)?.capacity ?? 1;
    const n = Number(headcount);
    if (Number.isFinite(n) && n > cap) setHeadcount(String(cap));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = "이름을 입력해 주세요.";
    if (!contact.trim()) next.contact = "연락처를 입력해 주세요.";
    else if (!isValidContact(contact)) {
      next.contact = "올바른 연락처 형식이 아닙니다. 예: 010-0000-0000";
    }
    if (!selected) next.classId = "클래스를 선택해 주세요.";
    if (!date) {
      next.date = "희망 날짜를 선택해 주세요.";
    } else if (date < localDateString(new Date())) {
      next.date = "오늘 이후의 날짜를 선택해 주세요.";
    }
    const n = Number(headcount);
    if (!Number.isInteger(n) || n < 1 || n > capacity) {
      next.headcount = `인원은 1명 이상 ${capacity}명 이하의 정수로 입력해 주세요.`;
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;
    const found = validate();
    setErrors(found);
    const firstInvalid = fieldOrder.find((k) => found[k]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }
    submittingRef.current = true;
    setStatus({ state: "loading" });
    onBusyChange(true);
    let next: SubmitStatus;
    try {
      const res = await submitClassApplication({
        name: name.trim(),
        contact,
        classId,
        date,
        headcount: Number(headcount),
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
  const errorKeys = fieldOrder.filter((k) => errors[k]);

  function describe(key: FieldKey, extra?: string) {
    const ids = [errors[key] ? `class-${key}-error` : "", extra ?? ""]
      .filter(Boolean)
      .join(" ");
    return ids || undefined;
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={loading}
      className="flex flex-col gap-4"
    >
      <PracticeNotice variant="inline" />

      <div aria-live="polite">
        {errorKeys.length > 0 && (
          <p className="text-sm font-medium text-danger">
            확인이 필요한 항목: {errorKeys.map((k) => fieldLabel[k]).join(", ")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="class-name" className={labelClass}>
          이름
        </label>
        <input
          id="class-name"
          ref={(el) => {
            fieldRefs.current.name = el;
          }}
          type="text"
          data-autofocus
          autoComplete="off"
          placeholder="가상 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describe("name")}
          className={inputClass}
        />
        {errors.name && (
          <p id="class-name-error" className={errorClass}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="class-contact" className={labelClass}>
          연락처
        </label>
        <input
          id="class-contact"
          ref={(el) => {
            fieldRefs.current.contact = el;
          }}
          type="tel"
          inputMode="tel"
          autoComplete="off"
          placeholder="010-0000-0000"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          aria-invalid={errors.contact ? true : undefined}
          aria-describedby={describe("contact")}
          className={inputClass}
        />
        {errors.contact && (
          <p id="class-contact-error" className={errorClass}>
            {errors.contact}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="class-classId" className={labelClass}>
          클래스
        </label>
        <select
          id="class-classId"
          ref={(el) => {
            fieldRefs.current.classId = el;
          }}
          value={classId}
          onChange={(e) => handleClassChange(e.target.value)}
          aria-invalid={errors.classId ? true : undefined}
          aria-describedby={describe("classId")}
          className={inputClass}
        >
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.classId && (
          <p id="class-classId-error" className={errorClass}>
            {errors.classId}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="class-date" className={labelClass}>
          희망 날짜
        </label>
        <input
          id="class-date"
          ref={(el) => {
            fieldRefs.current.date = el;
          }}
          type="date"
          min={minDate || undefined}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-invalid={errors.date ? true : undefined}
          aria-describedby={describe("date")}
          className={inputClass}
        />
        {errors.date && (
          <p id="class-date-error" className={errorClass}>
            {errors.date}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="class-headcount" className={labelClass}>
          인원
        </label>
        <input
          id="class-headcount"
          ref={(el) => {
            fieldRefs.current.headcount = el;
          }}
          type="number"
          inputMode="numeric"
          min={1}
          max={capacity}
          step={1}
          value={headcount}
          onChange={(e) => setHeadcount(e.target.value)}
          aria-invalid={errors.headcount ? true : undefined}
          aria-describedby={describe("headcount", "class-headcount-hint")}
          className={inputClass}
        />
        <p id="class-headcount-hint" className="mt-1 text-sm text-muted">
          최대 {capacity}명
        </p>
        {errors.headcount && (
          <p id="class-headcount-error" className={errorClass}>
            {errors.headcount}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="class-message" className={labelClass}>
          요청사항 (선택)
        </label>
        <textarea
          id="class-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
        />
      </div>

      {status.state === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-danger/40 bg-white p-3 text-sm text-danger"
        >
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="min-h-11 w-full rounded-lg bg-accent px-4 font-medium text-white hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
      >
        {loading ? "접수 중…" : "신청하기"}
      </button>
    </form>
  );
}

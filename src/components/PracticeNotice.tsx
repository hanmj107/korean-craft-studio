const NOTICE =
  "이 사이트는 실습용 프로토타입입니다. 입력한 정보는 저장되거나 전송되지 않으므로 실제 개인정보를 입력하지 마세요.";

export function PracticeNotice({ variant }: { variant: "banner" | "inline" }) {
  if (variant === "banner") {
    return (
      <div role="note" className="bg-sand text-ink">
        <p className="mx-auto max-w-6xl px-4 py-2 text-xs leading-relaxed sm:px-6 sm:text-sm">
          {NOTICE}
        </p>
      </div>
    );
  }
  return (
    <p
      role="note"
      className="mb-4 rounded-lg bg-sand px-3 py-2 text-sm leading-relaxed text-ink"
    >
      {NOTICE}
    </p>
  );
}

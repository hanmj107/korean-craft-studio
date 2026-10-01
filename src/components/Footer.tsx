export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/10 bg-sand/60">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 text-sm sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-serif text-lg font-bold">온결 공방</p>
          <p className="mt-2 leading-relaxed text-muted">
            결을 살린 한국 공예. 이 사이트의 모든 정보는 실습용 가상 정보입니다.
          </p>
        </div>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium">주소 (실습용 가상 정보)</dt>
            <dd className="text-muted">서울특별시 가상구 공예로 0길 0, 온결 공방</dd>
          </div>
          <div>
            <dt className="font-medium">운영시간 (실습용 가상 정보)</dt>
            <dd className="text-muted">화-일 10:00-18:00 / 월요일 휴무</dd>
          </div>
        </dl>
        <dl>
          <dt className="font-medium">문의처 (실습용 가상 정보)</dt>
          <dd className="text-muted">전화 02-0000-0000</dd>
          <dd className="text-muted">이메일 hello@example.com</dd>
        </dl>
      </div>
    </footer>
  );
}

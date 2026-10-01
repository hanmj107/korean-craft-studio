export function Header() {
  return (
    <header className="border-b border-ink/10">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        본문으로 건너뛰기
      </a>
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-5 sm:px-6">
        <span
          aria-hidden="true"
          className="grid size-8 place-items-center rounded-full bg-accent font-serif text-sm font-bold text-white"
        >
          결
        </span>
        <p className="font-serif text-xl font-bold tracking-wide">온결 공방</p>
      </div>
    </header>
  );
}

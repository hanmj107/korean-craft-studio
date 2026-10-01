"use client";

import { useRef, useState } from "react";

const TABS = [
  { id: "exhibition", label: "공예품 전시·주문" },
  { id: "classes", label: "공방 클래스" },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface CraftTabsProps {
  exhibition: React.ReactNode;
  classes: React.ReactNode;
}

export function CraftTabs({ exhibition, classes }: CraftTabsProps) {
  const [active, setActive] = useState<TabId>("exhibition");
  const refs = useRef<Record<TabId, HTMLButtonElement | null>>({
    exhibition: null,
    classes: null,
  });

  function select(id: TabId) {
    setActive(id);
    refs.current[id]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const last = TABS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    select(TABS[next].id);
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="주요 메뉴"
        className="sticky top-0 z-10 flex gap-2 border-b border-ink/15 bg-paper/95 px-1 backdrop-blur"
      >
        {TABS.map((tab, i) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`min-h-12 flex-1 border-b-2 px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:flex-none sm:px-8 sm:text-base ${
                selected
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id="panel-exhibition"
        aria-labelledby="tab-exhibition"
        hidden={active !== "exhibition"}
        tabIndex={0}
        className="pt-10 focus-visible:outline-2 focus-visible:outline-accent"
      >
        {exhibition}
      </div>
      <div
        role="tabpanel"
        id="panel-classes"
        aria-labelledby="tab-classes"
        hidden={active !== "classes"}
        tabIndex={0}
        className="pt-10 focus-visible:outline-2 focus-visible:outline-accent"
      >
        {classes}
      </div>
    </div>
  );
}

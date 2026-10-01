import { CraftCard } from "@/components/CraftCard";
import { crafts } from "@/mocks/crafts";

export function CraftSection() {
  return (
    <section aria-labelledby="craft-heading" className="flex flex-col gap-6">
      <div>
        <h2
          id="craft-heading"
          className="font-serif text-2xl font-bold sm:text-3xl"
        >
          손으로 빚고 짜고 깎은 우리 공예
        </h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted">
          온결 공방은 도자기, 나전칠기, 보자기, 목공예를 한곳에 모은 가상의
          공방입니다. 결을 살린 작은 생활 공예품을 소개합니다.
        </p>
      </div>

      <div className="rounded-xl bg-sand p-4">
        <h3 className="font-medium">제작 및 배송 안내 (가상)</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>주문 후 제작 2~3주가 걸립니다.</li>
          <li>제작이 끝나면 3~5일 안에 배송됩니다.</li>
          <li>모든 안내는 실습용으로 꾸민 내용이며 실제 주문은 처리되지 않습니다.</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {crafts.map((craft) => (
          <CraftCard key={craft.id} craft={craft} />
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import { ClassDialog } from "@/components/ClassDialog";
import { formatDuration, formatPrice } from "@/lib/format";
import type { CraftClass } from "@/types";

export function ClassCard({ craftClass }: { craftClass: CraftClass }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/60">
      <Image
        src={craftClass.image}
        alt={craftClass.imageAlt}
        width={800}
        height={600}
        unoptimized
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-serif text-lg font-bold">{craftClass.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">
          {craftClass.description}
        </p>
        <p className="text-base font-medium">{formatPrice(craftClass.price)}</p>
        <p className="flex flex-wrap gap-x-4 text-sm text-muted">
          <span>소요시간 {formatDuration(craftClass.durationMinutes)}</span>
          <span>최대 {craftClass.capacity}명</span>
        </p>
        <ClassDialog craftClass={craftClass} />
      </div>
    </article>
  );
}

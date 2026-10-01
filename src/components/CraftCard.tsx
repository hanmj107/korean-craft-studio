import Image from "next/image";
import { OrderDialog } from "@/components/OrderDialog";
import { formatPrice } from "@/lib/format";
import type { Craft } from "@/types";

export function CraftCard({ craft }: { craft: Craft }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-muted/20 bg-white/60">
      <div className="relative aspect-[4/3] w-full bg-sand">
        <Image
          src={craft.image}
          alt={craft.imageAlt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-2">
          <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-sm text-accent">
            {craft.craftType}
          </span>
          <h3 className="font-serif text-lg font-bold">{craft.name}</h3>
          <p className="text-sm leading-relaxed text-muted">
            {craft.description}
          </p>
        </div>
        <p className="mt-auto text-lg font-bold">{formatPrice(craft.price)}</p>
        <OrderDialog craftId={craft.id} craftName={craft.name} />
      </div>
    </article>
  );
}

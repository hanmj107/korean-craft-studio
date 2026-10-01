import { ClassCard } from "@/components/ClassCard";
import { classes } from "@/mocks/classes";

const prepItems = [
  "앞치마 (공방에서 가상으로 대여해 드립니다)",
  "흙·천·나무 가루가 묻어도 괜찮은 편한 복장",
  "긴 머리는 묶을 수 있는 끈",
];

export function ClassSection() {
  return (
    <section aria-labelledby="class-heading" className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 id="class-heading" className="font-serif text-2xl font-bold">
          손으로 배우는 체험 클래스
        </h2>
        <p className="leading-relaxed text-muted">
          온결 공방의 클래스는 처음 만나는 분도 편안하게 시작할 수 있도록 소규모로
          진행됩니다. 흙과 천, 나무의 결을 손끝으로 느끼며 나만의 작은 작품을
          만들어 보세요. 아래 모든 클래스와 안내는 실습용 가상 정보입니다.
        </p>
      </div>

      <div className="grid gap-4 rounded-2xl bg-sand p-5 sm:grid-cols-2">
        <div>
          <h3 className="font-serif text-lg font-bold">준비물 안내</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
            {prepItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold">취소 안내</h3>
          <p className="mt-2 text-sm leading-relaxed">
            체험 3일 전까지는 무료로 취소할 수 있고, 이후에는 재료비가 청구되는
            것으로 가정합니다. 이 정책은 실습용 가상 안내이며 실제 결제나 청구는
            발생하지 않습니다.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((craftClass) => (
          <ClassCard key={craftClass.id} craftClass={craftClass} />
        ))}
      </div>
    </section>
  );
}

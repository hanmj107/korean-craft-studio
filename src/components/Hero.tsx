import Image from "next/image";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mb-12 grid items-center gap-8 sm:mb-16 md:grid-cols-2 md:gap-12"
    >
      <div>
        <p className="text-sm font-medium tracking-widest text-accent">
          결을 살린 한국 공예
        </p>
        <h1
          id="hero-title"
          className="mt-3 font-serif text-3xl font-bold leading-snug sm:text-4xl lg:text-5xl"
        >
          손끝의 결이
          <br />
          일상에 머무는 곳
        </h1>
        <p className="mt-5 max-w-prose leading-relaxed text-muted">
          온결 공방은 도자기, 나전칠기, 보자기, 목공예를 만듭니다. 흙의 결, 나무의
          결, 천의 결을 거스르지 않고 천천히 다듬어, 오래 곁에 두고 쓸 수 있는
          물건을 지향합니다.
        </p>
        <p className="mt-3 text-sm text-muted">
          공예품을 둘러보고 주문 문의를 남기거나, 공방 클래스를 신청해 보세요.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl bg-sand">
        <Image
          src="/images/hero.svg"
          alt="따뜻한 베이지 배경 위에 놓인 도자기 항아리와 나무 접시, 보자기를 단순한 선으로 그린 일러스트"
          width={800}
          height={600}
          unoptimized
          priority
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}

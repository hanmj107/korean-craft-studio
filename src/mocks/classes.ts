import type { CraftClass } from "@/types";

export const classes: CraftClass[] = [
  {
    id: "pottery-wheel",
    name: "도자기 물레 체험",
    description:
      "물레 위에서 흙을 올리고 손으로 형태를 잡아 나만의 찻잔을 빚는 입문 클래스입니다. (실습용 가상 클래스)",
    price: 45000,
    durationMinutes: 120,
    capacity: 6,
    image: "/images/classes/pottery-wheel.svg",
    imageAlt: "물레 위에서 빚고 있는 청자빛 찻잔과 도자기 도구를 그린 일러스트",
  },
  {
    id: "bojagi-making",
    name: "보자기 만들기",
    description:
      "조각 천을 이어 붙여 작은 조각보 보자기를 만들어 보는 클래스입니다. 바느질이 처음이어도 괜찮습니다. (실습용 가상 클래스)",
    price: 38000,
    durationMinutes: 90,
    capacity: 8,
    image: "/images/classes/bojagi-making.svg",
    imageAlt: "여러 색 조각 천을 이어 만든 조각보 보자기와 바늘, 실을 그린 일러스트",
  },
  {
    id: "wood-spoon",
    name: "목공예 숟가락 깎기",
    description:
      "나무 조각을 칼과 사포로 다듬어 손에 꼭 맞는 숟가락을 만드는 클래스입니다. (실습용 가상 클래스)",
    price: 52000,
    durationMinutes: 150,
    capacity: 4,
    image: "/images/classes/wood-spoon.svg",
    imageAlt: "나무 숟가락과 조각칼, 나무 부스러기를 그린 일러스트",
  },
];

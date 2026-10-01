export type CraftType = "도자기" | "나전칠기" | "보자기" | "목공예";

export interface Craft {
  id: string;
  name: string;
  craftType: CraftType;
  description: string;
  price: number;
  image: string; // /images/crafts/*.svg
  imageAlt: string;
}

export interface CraftClass {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  capacity: number;
  image: string; // /images/classes/*.svg
  imageAlt: string;
}

export interface OrderInquiry {
  name: string;
  contact: string;
  craftId: string;
  quantity: number;
  message: string;
}

export interface ClassApplication {
  name: string;
  contact: string;
  classId: string;
  date: string; // yyyy-mm-dd
  headcount: number;
  message: string;
}

export type MockApiResult =
  | { success: true; receiptNumber: string; message: string }
  | { success: false; message: string };

export type SubmitStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; receiptNumber: string; message: string }
  | { state: "error"; message: string };

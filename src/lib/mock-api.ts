import { MOCK_FAIL_CONTACT, normalizeContact } from "@/lib/contact";
import type {
  ClassApplication,
  MockApiResult,
  OrderInquiry,
} from "@/types";

export const MOCK_DELAY_MS = 700;

const RECEIPT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeReceiptNumber(prefix: string): string {
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += RECEIPT_CHARS[Math.floor(Math.random() * RECEIPT_CHARS.length)];
  }
  return prefix + suffix;
}

function failure(): MockApiResult {
  return {
    success: false,
    message:
      "실습용 오류입니다. 연락처 010-0000-0000은 실패 응답을 확인하기 위한 값입니다. 다른 번호로 다시 시도해 주세요.",
  };
}

export async function submitOrderInquiry(
  input: OrderInquiry,
): Promise<MockApiResult> {
  await wait(MOCK_DELAY_MS);
  if (normalizeContact(input.contact) === MOCK_FAIL_CONTACT) return failure();
  return {
    success: true,
    receiptNumber: makeReceiptNumber("MOCK-ORD-"),
    message: "주문 문의가 접수된 것으로 표시됩니다. 실제로 저장·전송되지 않습니다.",
  };
}

export async function submitClassApplication(
  input: ClassApplication,
): Promise<MockApiResult> {
  await wait(MOCK_DELAY_MS);
  if (normalizeContact(input.contact) === MOCK_FAIL_CONTACT) return failure();
  return {
    success: true,
    receiptNumber: makeReceiptNumber("MOCK-CLS-"),
    message: "클래스 신청이 접수된 것으로 표시됩니다. 실제로 저장·전송되지 않습니다.",
  };
}

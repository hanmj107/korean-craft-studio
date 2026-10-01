export const MOCK_FAIL_CONTACT = "01000000000";

export function normalizeContact(raw: string): string {
  return raw.replace(/[\s\-.]/g, "");
}

export function isValidContact(raw: string): boolean {
  return /^01[016789]\d{7,8}$/.test(normalizeContact(raw));
}

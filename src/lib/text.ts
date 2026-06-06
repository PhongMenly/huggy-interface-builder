// Removes emoji / pictographic characters from rendered labels so the UI
// stays clean and icon-free per Sale Master AI design.
const EMOJI_RE = /[\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0E\uFE0F\u200D\u20E3]+/gu;

export function stripEmoji(input: string): string {
  if (!input) return input;
  return input.replace(EMOJI_RE, "").replace(/\s{2,}/g, " ").trim();
}
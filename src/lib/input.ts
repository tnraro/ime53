export const enum I {
  consonant,
  vowel,
  backspace,
}

export interface InputToken {
  type: I,
  value: string,
}
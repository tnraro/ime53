export const enum I {
  compound_consonant,
  consonant,
  vowel,
  backspace,
}

export interface InputToken {
  type: I,
  value: string,
}
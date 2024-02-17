/**
 * Letter may:
 * - consonant - ㄱㄴㄷ
 * - consonant sequence ㄱㄱ(ㄲ) ㄹㅁ(ㄻ)
 * - vowel ㅏㅣ
 * - vowel sequence ㅡㅣ(ㅢ)ㅗㅏ(ㅘ)
 * 
 * The sequence of basic letters can compound.
 */
export type Letter = string;
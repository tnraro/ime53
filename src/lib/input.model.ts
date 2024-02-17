import { isInitial, keyToHangul, findCompoundInitial } from "./hangul-data";
import { I, type InputToken } from "./input";

const getInputType = (input: string): I => {
  if (input === "Backspace") return I.backspace;
  if (isInitial(input)) {
    if (/[ㄲㄸㅃㅆㅉ]/.test(input)) {
      return I.compound_consonant;
    }
    return I.consonant;
  }
  return I.vowel;
}

export const keyToInputToken = (key: string): InputToken | undefined => {
  if (key === "Backspace") {
    return { type: I.backspace, value: "" };
  }
  if (/^[a-z]$/i.test(key)) {
    const input = keyToHangul(key)!;
    const type = getInputType(input);
    if (type === I.compound_consonant) {
      return { type, value: findCompoundInitial(input)! };
    }
    return { type, value: input };
  }
}
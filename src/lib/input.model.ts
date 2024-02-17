import { isInitial, keyToHangul } from "./hangul-data";
import { I, type InputToken } from "./input";

export const keyToInputToken = (key: string): InputToken | undefined => {
  if (key === "Backspace") {
    return { type: I.backspace, value: "" };
  }
  if (/^[a-z]$/i.test(key)) {
    const input = keyToHangul(key)!;
    const type = isInitial(input) ? I.consonant : I.vowel;
    return { type, value: input };
  }
}
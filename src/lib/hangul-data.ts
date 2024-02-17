const order = {
  key: "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
  hangul: "ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡㅃㅉㄸㄲㅆㅛㅕㅑㅒㅖㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡ",
  initial: "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ",
  medial: "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ",
  final: " ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ",
};

export const keyToHangul = (key: string) => {
  const index = order.key.indexOf(key);
  if (index === -1) return undefined;
  return order.hangul.at(index);
}

export const getInitialIndex = (key: string) => {
  const index = order.initial.indexOf(key);
  if (index === -1) return undefined;
  return index;
}
export const getMedialIndex = (key: string) => {
  const index = order.medial.indexOf(key);
  if (index === -1) return undefined;
  return index;
}
export const getFinalIndex = (key: string) => {
  const index = order.final.indexOf(key);
  if (index === -1) return undefined;
  return index;
}

export const isInitial = (key: string) =>
  getInitialIndex(key) != null;
export const isFinal = (key: string) =>
  getFinalIndex(key) != null;

const compound = {
  initial: new Map(),
  medial: new Map(Object.entries({
    ㅗㅏ: "ㅘ",
    ㅗㅐ: "ㅙ",
    ㅗㅣ: "ㅚ",
    ㅜㅓ: "ㅝ",
    ㅜㅔ: "ㅞ",
    ㅜㅣ: "ㅟ",
    ㅡㅣ: "ㅢ",
    ㅘ: "ㅗㅏ",
    ㅙ: "ㅗㅐ",
    ㅚ: "ㅗㅣ",
    ㅝ: "ㅜㅓ",
    ㅞ: "ㅜㅔ",
    ㅟ: "ㅜㅣ",
    ㅢ: "ㅡㅣ",
  })),
  final: new Map(Object.entries({
    ㄱㅅ: "ㄳ",
    ㄴㅈ: "ㄵ",
    ㄴㅎ: "ㄶ",
    ㄹㄱ: "ㄺ",
    ㄹㅁ: "ㄻ",
    ㄹㅂ: "ㄼ",
    ㄹㅅ: "ㄽ",
    ㄹㅌ: "ㄾ",
    ㄹㅍ: "ㄿ",
    ㄹㅎ: "ㅀ",
    ㅂㅅ: "ㅄ",
    ㄳ: "ㄱㅅ",
    ㄵ: "ㄴㅈ",
    ㄶ: "ㄴㅎ",
    ㄺ: "ㄹㄱ",
    ㄻ: "ㄹㅁ",
    ㄼ: "ㄹㅂ",
    ㄽ: "ㄹㅅ",
    ㄾ: "ㄹㅌ",
    ㄿ: "ㄹㅍ",
    ㅀ: "ㄹㅎ",
    ㅄ: "ㅂㅅ",
  })),
}

export const findCompoundInitial = (x: string) => compound.initial.get(x);
export const findCompoundMedial = (x: string) => compound.medial.get(x);
export const findCompoundFinal = (x: string) => compound.final.get(x);

export const isCompoundInitial = (x: string) => findCompoundInitial(x) != null;
export const isCompoundMedial = (x: string) => findCompoundMedial(x) != null;
export const isCompoundFinal = (x: string) => findCompoundFinal(x) != null;


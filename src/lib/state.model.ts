import { findCompoundFinal, findCompoundMedial, getFinalIndex, getInitialIndex, getMedialIndex } from "./hangul-data";
import { S, type State } from "./state";

const initialToString = (state: { initial?: string }) => {
  let initial = state.initial;
  return initial ?? "♥";
}
const medialToString = (state: { medial?: string }) => {
  let medial = state.medial;
  if (medial?.length == 2) {
    medial = findCompoundMedial(medial);
  }
  return medial ?? "♥";
}
const finalToString = (state: { final?: string }) => {
  let final = state.final ?? " ";
  if (final?.length == 2) {
    return findCompoundFinal(final) ?? "♥";
  }
  return final;
}

export const stateToString = (state: State) => {
  switch (state.type) {
    case S.empty: return "";
    case S.initial: return initialToString(state);
    case S.medial: return medialToString(state);
    default: {
      const initial = getInitialIndex(initialToString(state));
      const medial = getMedialIndex(medialToString(state));
      const final = getFinalIndex(finalToString(state as { final?: string }));
      if (initial == null || medial == null || final == null) return "♥";
      const cp = (initial * 21 + medial) * 28 + final + 0xac00;
      return String.fromCodePoint(cp);
    }
  }
}
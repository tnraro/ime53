import type { Letter } from "./letter";

export const enum S {
  empty,
  initial,
  medial,
  syllable_without_final,
  syllable_with_final,
}
export interface StateEmpty {
  type: S.empty,
}
export interface StateInitial {
  type: S.initial,
  initial: Letter;
}
export interface StateMedial {
  type: S.medial,
  medial: Letter;
}
export interface StateSyllableWithoutFinal {
  type: S.syllable_without_final,
  initial: Letter;
  medial: Letter;
}
export interface StateSyllableWithFinal {
  type: S.syllable_with_final,
  initial: Letter;
  medial: Letter;
  final: Letter;
};
export type State = StateEmpty | StateInitial | StateMedial | StateSyllableWithoutFinal | StateSyllableWithFinal;

export const Empty = (): StateEmpty => ({
  type: S.empty
})
export const Initial = (initial: Letter): StateInitial => ({
  type: S.initial,
  initial,
})
export const Medial = (medial: Letter): StateMedial => ({
  type: S.medial,
  medial,
})
export const SyllableWithoutFinal = (initial: Letter, medial: Letter): StateSyllableWithoutFinal => ({
  type: S.syllable_without_final,
  initial,
  medial,
})
export const SyllableWithFinal = (initial: Letter, medial: Letter, final: Letter): StateSyllableWithFinal => ({
  type: S.syllable_with_final,
  initial,
  medial,
  final,
})
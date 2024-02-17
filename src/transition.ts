import { isCompoundInitial, isCompoundMedial, isCompoundFinal, isInitial, isFinal } from "./lib/hangul-data";
import { I, type InputToken } from "./lib/input";
import { append, type Result, replace, replaceAndAppend, unhandle } from "./lib/result";
import { S, Initial, type State, Medial, SyllableWithoutFinal, SyllableWithFinal } from "./lib/state";

export const transition = (state: State, input: InputToken): Result => {
  switch (state.type) {
    case S.empty: {
      switch (input.type) {
        case I.consonant: return append(Initial(input.value));
        case I.vowel: return append(Medial(input.value));
        case I.backspace: return unhandle();
      }
    }
    case S.initial: {
      switch (input.type) {
        case I.consonant: return append(Initial(input.value));
        case I.vowel: {
          return replace(SyllableWithoutFinal(state.initial, input.value));
        }
        case I.backspace: return unhandle();
      }
    }
    case S.medial: {
      switch (input.type) {
        case I.consonant: return replace(SyllableWithoutFinal(input.value, state.medial));
        case I.vowel: {
          if (isCompoundMedial(state.medial + input.value)) {
            return replace(Medial(state.medial + input.value));
          }
          return append(Medial(input.value));
        }
        case I.backspace: return unhandle();
      }
    }
    case S.syllable_without_final: {
      switch (input.type) {
        case I.consonant: {
          if (isFinal(input.value)) {
            return replace(SyllableWithFinal(state.initial, state.medial, input.value));
          }
          return append(Initial(input.value));
        }
        case I.vowel: {
          if (isCompoundMedial(state.medial + input.value))
            return replace(SyllableWithoutFinal(state.initial, state.medial + input.value));
          return append(Medial(input.value));
        }
        case I.backspace: {
          if (isCompoundMedial(state.medial)) {
            return replace(SyllableWithoutFinal(state.initial, state.medial[0]));
          }
          return replace(Initial(state.initial));
        }
      }
    }
    case S.syllable_with_final: {
      switch (input.type) {
        case I.consonant: {
          if (isCompoundFinal(state.final + input.value))
            return replace(SyllableWithFinal(state.initial, state.medial, state.final + input.value));
          return append(Initial(input.value));
        }
        case I.vowel: {
          if (isCompoundFinal(state.final)) {
            return replaceAndAppend(SyllableWithFinal(state.initial, state.medial, state.final[0]), SyllableWithoutFinal(state.final[1], input.value));
          }
          return replaceAndAppend(SyllableWithoutFinal(state.initial, state.medial), SyllableWithoutFinal(state.final, input.value));
        }
        case I.backspace: {
          if (isCompoundFinal(state.final)) {
            return replace(SyllableWithFinal(state.initial, state.medial, state.final[0]));
          }
          return replace(SyllableWithoutFinal(state.initial, state.medial));
        }
      }
    }
  }
  throw new Error(`unexpected state "${state}" and input "${input}"`);
}
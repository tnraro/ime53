import type { State } from "./state";

export const enum R {
  unhandled,
  append,
  replace,
  replace_and_append,
}
export type Result = {
  type: R.unhandled,
} | {
  type: R.append,
  state: State,
} | {
  type: R.replace,
  state: State,
} | {
  type: R.replace_and_append,
  state_to_replace: State,
  state_to_append: State,
}

export const unhandle = (): Result => ({ type: R.unhandled })
export const append = (state: State): Result => ({ type: R.append, state });
export const replace = (state: State): Result => ({ type: R.replace, state });
export const replaceAndAppend = (state_to_replace: State, state_to_append: State): Result => ({ type: R.replace_and_append, state_to_replace, state_to_append });

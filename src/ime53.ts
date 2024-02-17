import { keyToInputToken } from "./lib/input.model";
import { R } from "./lib/result";
import { Empty, type State } from "./lib/state";
import { stateToString } from "./lib/state.model";
import { transition } from "./transition";

export type Ime53Response = {
  ok: true;
  replace: boolean;
  value: string;
} | {
  ok: false;
}

export class Ime53 {
  #state: State = Empty();
  constructor() { }
  reset() {
    this.#state = Empty();
  }
  next(key: string): Ime53Response {
    const input = keyToInputToken(key);
    if (input == null) {
      this.reset();
      return { ok: false };
    }

    const result = transition(this.#state, input);

    switch (result.type) {
      case R.unhandled: {
        this.reset();
        return { ok: false };
      }
      case R.append: {
        this.#state = result.state;
        return { ok: true, replace: false, value: stateToString(result.state) };
      }
      case R.replace: {
        this.#state = result.state;
        return { ok: true, replace: true, value: stateToString(result.state) };
      }
      case R.replace_and_append: {
        this.#state = result.state_to_append;
        return {
          ok: true,
          replace: true,
          value: stateToString(result.state_to_replace) + stateToString(result.state_to_append),
        };
      }
    }
  }
}
# ime53

Hangul IME

```ts
import { Ime53 } from "../src/index";

const ime = new Ime53();

ime.next("g"); // { ok: true, replace: false, value: "ㅎ" }
ime.next("Backspace"); // { ok: false }
ime.next("k"); // { ok: true, replace: false, value: "ㅏ" }
ime.next("f"); // { ok: true, replace: true, value: "라" }
ime.next("f"); // { ok: true, replace: true, value: "랄" }
ime.next("h"); // { ok: true, replace: true, value: "라로" }
```
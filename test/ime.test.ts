import { Ime53 } from "../src/index";

// declare global IME to fit most usecase
const ime = new Ime53();

describe("scenario", () => {
  const writes = [...`
  r -> ㄱ
  k -> ㅏ
  rk -> 가
  rks -> 간
  rksk -> 가나
  ekfrk -> 달가

  rr -> ㄱㄱ
  rkqt -> 값
  fg -> ㄹㅎ
  wlqr -> 집ㄱ

  hk -> ㅘ
  hkl -> ㅘㅣ
  rml -> 긔
  mm -> ㅡㅡ
  rmm -> 그ㅡ

  kr -> 가
  rkq -> 갑
  krq -> 갑
  rkqq -> 갑ㅂ
  rkQ -> 가ㅃ
  rktt -> 갓ㅅ
  rkT -> 갔
  rkttk -> 갓사
  rkTk -> 가싸

  android -> 뭉개야
  dkssudgktpdy? -> 안녕하세요?

  .s.k,, sms, -> .ㄴ.ㅏ,, 는,
  hawkrjf dhsfkdls -> 모자걸 온라인
  hdsfklds -> 온라인

  ghkrdls -> 확인
  hkgrdls -> 확인
  qnpfr -> 뷁
  ajrrh -> 먹고
  `
    .matchAll(/^\s*(?<input_seq>.*?)\s*->\s*(?<output>.+?)\s*$/gm)]
    .map(x => {
      const { input_seq, output } = x.groups!;
      return {
        inputs: [...input_seq],
        output
      }
    })
  for (const testcase of writes) {
    test(`${testcase.inputs.join("")} ->  ${testcase.output}`, () => {
      let s = ""
      for (const input of testcase.inputs) {
        const v = ime.next(input);
        if (v.ok) {
          if (v.replace) {
            s = s.slice(0, -1);
          }
          s += v.value;
        } else {
          s += input;
        }
      }
      ime.reset();
      expect(s).toBe(testcase.output);
    })
  }
});
describe("step-by-step", () => {
  test("ㄱ", () => {
    expect(ime.next("r")).toStrictEqual({ ok: true, replace: false, value: "ㄱ" });
    ime.reset();
  });
  test("1", () => {
    expect(ime.next("1")).toStrictEqual({ ok: false });
    ime.reset();
  });
  test("ㄱㄱ", () => {
    expect(ime.next("r")).toStrictEqual({ ok: true, replace: false, value: "ㄱ" });
    expect(ime.next("r")).toStrictEqual({ ok: true, replace: false, value: "ㄱ" });
    ime.reset();
  });
  test("가", () => {
    expect(ime.next("r")).toStrictEqual({ ok: true, replace: false, value: "ㄱ" });
    expect(ime.next("k")).toStrictEqual({ ok: true, replace: true, value: "가" });
    ime.reset();
  });
  test("값", () => {
    expect(ime.next("r")).toStrictEqual({ ok: true, replace: false, value: "ㄱ" });
    expect(ime.next("k")).toStrictEqual({ ok: true, replace: true, value: "가" });
    expect(ime.next("q")).toStrictEqual({ ok: true, replace: true, value: "갑" });
    expect(ime.next("t")).toStrictEqual({ ok: true, replace: true, value: "값" });
    ime.reset();
  });
  test("갑시다", () => {
    expect(ime.next("r")).toStrictEqual({ ok: true, replace: false, value: "ㄱ" });
    expect(ime.next("k")).toStrictEqual({ ok: true, replace: true, value: "가" });
    expect(ime.next("q")).toStrictEqual({ ok: true, replace: true, value: "갑" });
    expect(ime.next("t")).toStrictEqual({ ok: true, replace: true, value: "값" });
    expect(ime.next("l")).toStrictEqual({ ok: true, replace: true, value: "갑시" });
    expect(ime.next("e")).toStrictEqual({ ok: true, replace: true, value: "싣" });
    expect(ime.next("k")).toStrictEqual({ ok: true, replace: true, value: "시다" });
    ime.reset();
  });
  test("ㄴㄴ", () => {
    expect(ime.next("s")).toStrictEqual({ ok: true, replace: false, value: "ㄴ" });
    expect(ime.next("s")).toStrictEqual({ ok: true, replace: false, value: "ㄴ" });
    ime.reset();
  });
  test("ㅘ", () => {
    expect(ime.next("h")).toStrictEqual({ ok: true, replace: false, value: "ㅗ" });
    expect(ime.next("k")).toStrictEqual({ ok: true, replace: true, value: "ㅘ" });
    ime.reset();
  });
  test("긔", () => {
    expect(ime.next("r")).toStrictEqual({ ok: true, replace: false, value: "ㄱ" });
    expect(ime.next("m")).toStrictEqual({ ok: true, replace: true, value: "그" });
    expect(ime.next("l")).toStrictEqual({ ok: true, replace: true, value: "긔" });
    ime.reset();
  });
  test("가ㅃ", () => {
    expect(ime.next("r")).toStrictEqual({ ok: true, replace: false, value: "ㄱ" });
    expect(ime.next("k")).toStrictEqual({ ok: true, replace: true, value: "가" });
    expect(ime.next("Q")).toStrictEqual({ ok: true, replace: false, value: "ㅃ" });
    ime.reset();
  });
  test(".ㄴ.ㅏ", () => {
    expect(ime.next(".")).toStrictEqual({ ok: false });
    expect(ime.next("s")).toStrictEqual({ ok: true, replace: false, value: "ㄴ" });
    expect(ime.next(".")).toStrictEqual({ ok: false });
    expect(ime.next("k")).toStrictEqual({ ok: true, replace: false, value: "ㅏ" });
    ime.reset();
  });
  test("hkgrdls", () => {
    expect(ime.next("h")).toStrictEqual({ ok: true, replace: false, value: "ㅗ" });
    expect(ime.next("k")).toStrictEqual({ ok: true, replace: true, value: "ㅘ" });
    expect(ime.next("g")).toStrictEqual({ ok: true, replace: true, value: "화" });
    expect(ime.next("r")).toStrictEqual({ ok: true, replace: true, value: "확" });
    expect(ime.next("d")).toStrictEqual({ ok: true, replace: false, value: "ㅇ" });
    expect(ime.next("l")).toStrictEqual({ ok: true, replace: true, value: "이" });
    expect(ime.next("s")).toStrictEqual({ ok: true, replace: true, value: "인" });
    ime.reset();
  });
  test("c BS", () => {
    expect(ime.next("c")).toStrictEqual({ ok: true, replace: false, value: "ㅊ" });
    expect(ime.next("Backspace")).toStrictEqual({ ok: false });
    ime.reset();
  });
  test("i BS", () => {
    expect(ime.next("i")).toStrictEqual({ ok: true, replace: false, value: "ㅑ" });
    expect(ime.next("Backspace")).toStrictEqual({ ok: false });
    ime.reset();
  });
  test("xml BS", () => {
    expect(ime.next("x")).toStrictEqual({ ok: true, replace: false, value: "ㅌ" });
    expect(ime.next("m")).toStrictEqual({ ok: true, replace: true, value: "트" });
    expect(ime.next("l")).toStrictEqual({ ok: true, replace: true, value: "틔" });
    expect(ime.next("Backspace")).toStrictEqual({ ok: true, replace: true, value: "트" });
    expect(ime.next("Backspace")).toStrictEqual({ ok: true, replace: true, value: "ㅌ" });
    expect(ime.next("Backspace")).toStrictEqual({ ok: false });
    ime.reset();
  });
  test("Epr BS", () => {
    expect(ime.next("E")).toStrictEqual({ ok: true, replace: false, value: "ㄸ" });
    expect(ime.next("p")).toStrictEqual({ ok: true, replace: true, value: "떼" });
    expect(ime.next("r")).toStrictEqual({ ok: true, replace: true, value: "떽" });
    expect(ime.next("Backspace")).toStrictEqual({ ok: true, replace: true, value: "떼" });
    ime.reset();
  });
  test("qkfq BS", () => {
    expect(ime.next("q")).toStrictEqual({ ok: true, replace: false, value: "ㅂ" });
    expect(ime.next("k")).toStrictEqual({ ok: true, replace: true, value: "바" });
    expect(ime.next("f")).toStrictEqual({ ok: true, replace: true, value: "발" });
    expect(ime.next("q")).toStrictEqual({ ok: true, replace: true, value: "밟" });
    expect(ime.next("Backspace")).toStrictEqual({ ok: true, replace: true, value: "발" });
    expect(ime.next("Backspace")).toStrictEqual({ ok: true, replace: true, value: "바" });
    expect(ime.next("Backspace")).toStrictEqual({ ok: true, replace: true, value: "ㅂ" });
    expect(ime.next("Backspace")).toStrictEqual({ ok: false });
    ime.reset();
  });
  test("BS", () => {
    expect(ime.next("Backspace")).toStrictEqual({ ok: false });
  });
});

describe("KeyboardEvent.key", () => {
  test("Escape", () => {
    expect(ime.next("d")).toStrictEqual({ ok: true, replace: false, value: "ㅇ" });
    expect(ime.next("Escape")).toStrictEqual({ ok: false });
    expect(ime.next("k")).toStrictEqual({ ok: true, replace: false, value: "ㅏ" });
    ime.reset();
  });
  test("Enter", () => {
    expect(ime.next("x")).toStrictEqual({ ok: true, replace: false, value: "ㅌ" });
    expect(ime.next("Enter")).toStrictEqual({ ok: false });
    expect(ime.next("m")).toStrictEqual({ ok: true, replace: false, value: "ㅡ" });
    ime.reset();
  });
  test("3", () => {
    expect(ime.next("x")).toStrictEqual({ ok: true, replace: false, value: "ㅌ" });
    expect(ime.next("3")).toStrictEqual({ ok: false });
    expect(ime.next("m")).toStrictEqual({ ok: true, replace: false, value: "ㅡ" });
    ime.reset();
  });
  test("F12", () => {
    expect(ime.next("x")).toStrictEqual({ ok: true, replace: false, value: "ㅌ" });
    expect(ime.next("F12")).toStrictEqual({ ok: false });
    expect(ime.next("m")).toStrictEqual({ ok: true, replace: false, value: "ㅡ" });
    ime.reset();
  });
})
# ime53 automata

## State

- E: empty
- I: initial
- M: medial
- X: syllable without final
- S: syllable with final

## Input

- c: consonant
- v: vowel
- x: backspace

## Production Rules

```
E -> cI ; append
  -> vM ; append

I -> cI ; append ㄱ + ㄱ -> ㄱ
  -> vX ; replace ㄱ + ㅏ -> 가
;    xE: let backspace erase the letter

M -> cX ; replace ㅏ + ㄱ -> 가
  -> vM ; replace ㅡ + ㅣ -> ㅢ
     vM ; append ㅏ + ㅏ -> ㅏ

X -> cS ; replace 가 + ㄱ -> 각
     cI ; append 가 + ㄲ -> ㄲ
  -> vX ; replace 그 + ㅣ -> 긔
     vM ; append 그 + ㅏ -> ㅏ 
  -> xX ; replace 긔 + \b -> 그
     xI ; replace 그 + \n -> ㄱ

S -> cS ; replace 달 + ㄱ -> 닭
     cI ; append 닭 + ㄱ -> ㄱ
  -> vX ; replace and append 닭 + ㅏ -> 달가
     vX ; replace and append 달 + ㅏ -> 다라
  -> xS ; replace 닭 + \b -> 달
     xX ; replace 달 + \b -> 다
```

### Example

```
hdsfklds
E => hㅗ ; vM ㅗ
  => d오 ; cX 오
  => s온 ; cS 온
  => fㄹ ; cI 온ㄹ
  => k라 ; vX 온라
  => lㅣ ; vM 온라ㅣ
  => d이 ; cX 온라이
  => s인 ; cS 온라인
```
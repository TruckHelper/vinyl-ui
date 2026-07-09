# packages/ui — 라이브러리 작업 규칙

## 컴포넌트 작성

- 스타일은 **인라인 `styled(...)` 팩토리 + 객체 문법**. 별도 레시피 파일(`cva`/`sva`) 금지.
- 단일 요소: `styled('button', { base, variants })`.
- 멀티파트: Ark 파트를 **각각 `styled`로 감싸 플랫 export**. 점 표기(`Accordion.Item`) 금지,
  `Accordion` / `AccordionItem`로 평평하게. (Ark 상태 context는 유지됨 → 접근성 정상)
- 상태를 쓰는 컴포넌트는 파일 상단에 `'use client'`.

## 토큰

- **색·간격 하드코딩 금지.** 항상 시맨틱 토큰 참조(`accent.default`, `fg.muted`, `border.default`).

## 구조·import

- Panda 산출물은 bare import: `import { styled } from 'styled-system/jsx'` (tsconfig `paths` 필수).
- variant 이름은 Figma 속성과 대응되게 짓는다(Code Connect).

## 테스트

## 패키징 함정

- **배포는 `dist`만**(`files: ["dist"]`). `tsup`은 `minify: false` — styled 호출이 추출
  가능하게 남겨야 함.

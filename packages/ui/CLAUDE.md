# packages/ui — 라이브러리 작업 규칙

`@bigmobility/vinyl-ui` (Ark UI 헤드리스 + Panda CSS) 컴포넌트를 작성할 때 **반드시** 따르는 규칙.

## 1. 컴포넌트 작성

- **스타일 = `styled` 팩토리 + 객체 문법.** 별도 레시피 파일(`cva`/`sva`) 금지. 단일 요소는 `styled('button', { base, variants })`.
- **멀티파트 = 플랫 export.** Ark 파트를 각각 `styled`로 감싸 평평하게 내보낸다. 점 표기(`Accordion.Item`) 금지 → `Accordion` / `AccordionItem`. (
  Ark 상태 context 유지 → 접근성 정상)
- **클라이언트 컴포넌트.** 상태를 쓰면 파일 최상단에 `'use client'`.

## 2. 토큰·스타일

- **시맨틱 토큰만.** 색·간격은 시맨틱 토큰으로만(`layout.primary`, `text.default`). 원시 토큰(`orange.500`) 직접 참조 지양.
- **단위는 rem.** root `62.5%`(프리셋이 배포) → 10px=1rem, 환산 `px ÷ 10`, 항상 토큰 경유(`p: '16'` → 1.6rem). 예외: `radii.full`(pill)·
  `shadows`만 px.
- **hex는 대문자** (`#EB6013`). `rgba()` 등은 예외.
- **토큰 키는 kebab(하이픈).** `emerald-green`, `layout.primary-dark`. camelCase·중첩(`layout.primary.dark`) 금지.
- **타이포는 `textStyle` 우선.** `fontSize`/`fontWeight`/`lineHeight` 나열 대신 합성 스타일. 키는 `{그룹}.{크기}-{굵기}`(`body.medium-normal`,
  `heading.large-bold`), 전 그룹 weight 접미사 유지.

## 3. import·네이밍

- Panda 산출물은 **bare import**: `import { styled } from 'styled-system/jsx'` (tsconfig `paths` 필수).
- **variant 이름은 Figma 속성과 대응**되게 짓는다 (Code Connect).

## 4. 테스트

## 5. 패키징 함정

- **배포는 `dist`만** (`files: ["dist"]`).
- `tsup`은 **`minify: false`** — `styled(...)` 호출이 정적 추출 가능하게 남아야 함.

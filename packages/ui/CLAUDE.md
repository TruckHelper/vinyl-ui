# packages/ui — 라이브러리 작업 규칙

`@bigmobility/vinyl-ui` (Ark UI 헤드리스 + Panda CSS) 컴포넌트를 작성할 때 **반드시** 따르는 규칙.

## 1. 컴포넌트 작성

- **스타일 = `styled` 팩토리 + 객체 문법.** 별도 레시피 파일(`cva`/`sva`) 금지. 단일 요소는 `styled('button', { base, variants })`.
- **멀티파트 = 플랫 export.** Ark 파트를 각각 `styled`로 감싸 평평하게 내보낸다. 점 표기(`Accordion.Item`) 금지 → `Accordion` / `AccordionItem`. (
  Ark 상태 context 유지 → 접근성 정상)
- **클라이언트 컴포넌트.** 상태를 쓰면 파일 최상단에 `'use client'`.
- **타입은 `type`으로 통일.
- **JSX prop 2개 이상은 줄바꿈.** prop이 2개 이상이면 각 prop을 한 줄에 하나씩, 1개면 인라인 유지.

## 2. 토큰·스타일

- **시맨틱 토큰만.** 색·간격은 시맨틱 토큰으로만(`layout.primary`, `text.default`). 원시 토큰(`orange.500`) 직접 참조 지양.
- **표준 CSS 속성명만 사용.** Panda 단축 별칭·커스텀 유틸 금지. 예외: `textStyle` 합성·조건(`_hover` 등)·토큰 참조는 표준 CSS 대응이 없는 Panda 계층이라 허용.
- **단위는 rem.** root `62.5%`(프리셋이 배포) → 10px=1rem, 환산 `px ÷ 10`, 항상 토큰 경유. 예외: `radii.full`(pill)·`shadows`·`border`(테두리
  두께)는 px.
- **hex는 대문자** (`#EB6013`). `rgba()` 등은 예외.
- **토큰 키는 kebab(하이픈).** `emerald-green`, `layout.primary-dark`. camelCase·중첩(`layout.primary.dark`) 금지.
- **타이포는 `textStyle` 우선.** `fontSize`/`fontWeight`/`lineHeight` 나열 대신 합성 스타일. 키는 `{그룹}.{크기}-{굵기}`(`body.medium-normal`,
  `heading.large-bold`), 전 그룹 weight 접미사 유지.

## 3. import·네이밍

- Panda 산출물은 **bare import**: `import { styled } from 'styled-system/jsx'` (tsconfig `paths` 필수).
- **컴포넌트 파일은 PascalCase** (`Icon.tsx`, `Button.tsx`). 컴포넌트별 index 배럴은 두지 않고 `src/index.ts`가 각 파일을 직접 export. 단일 컴포넌트는
  파일 1개, 멀티파트는 파트별 파일(`Select.tsx`, `SelectTrigger.tsx` …)로 나누고 폴더 배럴 없이 `src/index.ts`가 각 파트 파일을 직접 export.
- **variant 이름은 Figma 속성과 대응**되게 짓는다 (Code Connect).

## 4. 테스트

- 파일은 컴포넌트 옆 `<Component>.test.tsx`.
- **동작·접근성 위주.** `screen` 쿼리로 검증(role·텍스트 우선, 장식 요소는 `data-testid`).

## 5. 패키징

- **배포는 `dist`만** (`files: ["dist"]`).
- `tsup` **`minify: false`**(styled 정적 추출) + **`treeshake: true`**. treeshake는 **RSC 호환 필수** — styled-system/jsx 배럴이 끌고 오는 `createStyleContext`(`createContext`)를 제거해야 서버 컴포넌트에서 import 가능.

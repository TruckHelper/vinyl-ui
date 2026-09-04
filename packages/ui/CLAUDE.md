# packages/ui — 라이브러리 작업 규칙

`@bigmobility/vinyl-ui` (Ark UI 헤드리스 + Panda CSS) 컴포넌트를 작성할 때 **반드시** 따르는 규칙.

## 1. 컴포넌트 작성

- **스타일 = `styled` 팩토리 + 객체 문법.** 별도 레시피 파일(`cva`/`sva`) 금지. 단일 요소는 `styled('button', { base, variants })`.
- **멀티파트 = 플랫 export.** Ark 파트를 각각 `styled`로 감싸 평평하게 내보낸다. 점 표기(`Accordion.Item`) 금지 → `Accordion` / `AccordionItem`. (
  Ark 상태 context 유지 → 접근성 정상)
- **클라이언트/서버 세트 구분.** context·state·Ark 등 클라이언트 API를 쓰는 컴포넌트는 **client 세트**(`field`/`select`/`accordion`), 순수 표현 컴포넌트는 **server 세트**(`button`/`icon`). `'use client'`는 빌드(`tsup.config.ts`의 `CLIENT_ENTRIES`)가 각 client 서브패스 출력 최상단에 주입한다. 소스에도 client 컴포넌트엔 `'use client'`를 붙여 로컬(jest/dev) 정합성을 유지한다. server 세트엔 붙이지 않는다(서버 컴포넌트 유지).
- **타입은 `type`으로 통일.
- **JSX prop 2개 이상은 줄바꿈.** prop이 2개 이상이면 각 prop을 한 줄에 하나씩, 1개면 인라인 유지.
- **통합형은 설정형, 커스텀은 조합.** 통합형 컴포넌트(예: `TextField`)는 **props로만 조절**하고 **형태/슬롯 커스텀은 지원하지 않는다**(slotProps·children 슬롯 교체 모두 금지 — prop 폭발·타입 매칭 취약 회피). 형태·구조 커스텀이 필요하면 **오픈 프리미티브(context root + 파트, 예: `Field` + `Label`/`Input`/`ErrorText`) 조합** 또는 소비자가 그걸 감싼 **자체 래퍼**로 한다. Radix/shadcn과 같은 컴파운드·조합 노선.

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

- Panda 산출물 `styled`는 **`styled-system/jsx/factory`에서 import**: `import { styled } from 'styled-system/jsx/factory'` (tsconfig `paths` 필수). 배럴 `styled-system/jsx`는 `'use client'`가 붙은 `create-style-context`를 끌어와 styled를 클라이언트로 오염시키므로 **사용 금지**.
- **컴포넌트 파일은 PascalCase** (`Icon.tsx`, `Button.tsx`). 단일 컴포넌트는 파일 1개, 멀티파트는 파트별 파일(`Select.tsx`, `SelectTrigger.tsx` …).
- **루트 배럴 없음. 패밀리별 서브패스 export.** 파트 파일을 폴더 배럴이 아니라 **패밀리 엔트리**(`src/field.ts`, `src/select.ts`, `src/button.ts` …)가 재-export하고, `package.json` `exports`가 각 서브패스(`./field`, `./select` …)를 노출한다. 소비자는 `@bigmobility/vinyl-ui/field`처럼 서브패스로 import. 새 컴포넌트는 해당 패밀리 엔트리에 추가.
- **variant 이름은 Figma 속성과 대응**되게 짓는다 (Code Connect).

## 4. 테스트

- 파일은 컴포넌트 옆 `<Component>.test.tsx`.
- **동작·접근성 위주.** `screen` 쿼리로 검증(role·텍스트 우선, 장식 요소는 `data-testid`).

## 5. 패키징

- **배포는 `dist`만** (`files: ["dist"]`).
- **빌드 = `tsup` 단일 설정, 서브패스 엔트리별 번들.** `minify:false`(styled 정적 추출) + `treeshake:true` + **`splitting:false`**(엔트리마다 styled 사본을 독립적으로 가져 공유 청크에 `'use client'`가 전파·오염되는 것을 막음).
- **RSC 호환**: client 세트(`CLIENT_ENTRIES`)는 `onSuccess`에서 각 출력 최상단에 `'use client'`를 prepend한다(esbuild가 `banner`의 지시문을 스트립하므로 — issue #3115). server 세트는 지시문 없이 서버 컴포넌트로 유지. 서버 컴포넌트가 서브패스를 import할 때 top-level `createContext`가 섞이지 않도록, 루트 배럴을 두지 않고 `styled`는 factory에서만 가져온다.

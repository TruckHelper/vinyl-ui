# apps/docs — 문서 앱 작업 규칙

`@bigmobility/vinyl-ui` 문서/검증 앱. **Next 16 App Router + Panda CSS**로, 라이브러리를
워크스페이스 의존(`@bigmobility/vinyl-ui`)으로 소비한다. 이 앱에서 작업할 때 **반드시** 따른다.

## 1. 스타일

- **스타일 = `styled` 팩토리 + 객체 문법.** 라이브러리(`packages/ui`) 관례를 그대로 따른다. `cva`/`sva` 별도 레시피 금지.
- **Panda 산출물은 bare import**: `import { styled } from 'styled-system/jsx'` (tsconfig `paths` 설정됨).
- **시맨틱 토큰만.** 색·간격은 시맨틱 토큰으로(`layout.*`, `text.*`). **원시 hex·`rgb()` 하드코딩 금지** — Figma가 raw 값이어도 가장 가까운 토큰으로 매핑한다.
- **단위는 rem.** 프리셋이 root `62.5%`를 깐다(10px=1rem, 환산 `px ÷ 10`). 예외: `radii.full`·`shadows`·`border`(두께)는 px.
- **타이포는 `textStyle` 우선**(`heading.*`, `body.*`). 프리셋 스케일을 넘는 값(예: 랜딩 hero 56px)만 **`panda.config.ts`
  의 `theme.extend.textStyles`** 로 docs 로컬 확장한다. 개별 요소 `fontSize` 하드코딩 지양.
- **`packages/ui`(배포 대상)는 이 앱 작업으로 수정하지 않는다.** 필요한 확장은 docs 쪽에서 한다.

## 2. 컴포넌트 배치·네이밍

- **조각 컴포넌트는 `app/` 밖 `src/components/`** 에 둔다(라우팅과 분리). 기능별 하위 폴더(`landing/`, `docs/`). `app/_components`(private
  folder) 방식은 쓰지 않는다.
- **파일은 PascalCase**(`Navbar.tsx`, `DocsSidebar.tsx`). 배럴 파일 없이 사용처에서 직접 import.
- **컴포넌트 파일은 default export로 단일 컴포넌트를 내보낸다.** 훅·팩토리·타입 등 컴포넌트가 아닌 것은 named export를 유지한다.
- **상태를 쓰면 파일 최상단 `'use client'`.**
- **JSX prop 2개 이상은 줄바꿈**(각 prop 한 줄), 1개면 인라인.
- 타입은 `type`으로 통일.

## 3. 도그푸딩 (핵심)

- **문서/랜딩 UI는 실제 vinyl-ui 컴포넌트로 만든다.** 버튼은 라이브러리 `Button`을 쓰고 자체 `<button>`을 새로 만들지 않는다. "이 시스템으로 만든 결과물"이 곧 데모.
- **아이콘은 `Icon`(lucide) 사용.** Figma 커스텀 SVG를 다운로드해 하드코딩하지 않고 lucide 아이콘명으로 매핑한다.
- 브랜드 색·톤은 라이브러리 토큰을 따른다(현재 액센트는 `layout.emphasis` = navy).

## 4. Fumadocs 문서 사이트

- **문서 엔진은 `fumadocs-core`(헤드리스) + `fumadocs-mdx`만** 쓴다. **`fumadocs-ui`는 도입 금지**
- 사이드바·TOC·검색·브레드크럼·MDX 타이포 등 **보이는 모든 것은 Panda `styled` + vinyl-ui로 직접 구현**한다. fumadocs-core는 로직/상태(page tree,
  scroll-spy, search)만 제공.

## 5. 개발·검증

루트 `apps/docs` 기준:

- `npm run dev` — 개발(포트 8080, Turbopack)
- `npm run css` — panda codegen(`styled-system` 재생성). **`panda.config.ts`를 바꾸면 반드시 실행.**
- `npm run check` — 타입체크(`tsc --noEmit`)
- `npm run lint` — eslint(`--fix`)

- **Turbopack 캐시 주의.** `panda.config.ts` 변경 후 dev에서 설정이 안 잡히거나 이전 에러가 남으면 **`rm -rf .next` 후 재시작**한다(설정 번들 캐시 문제).
- dev는 반드시 `apps/docs`에서 실행(루트 cwd에서 띄우면 경로 해석이 어긋난다).

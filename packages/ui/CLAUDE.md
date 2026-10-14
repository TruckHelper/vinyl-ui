# packages/ui — 라이브러리 작업 규칙

`@bigmobility/vinyl-ui` (Ark UI 헤드리스 + Panda CSS) 컴포넌트를 작성할 때 반드시 따르는 규칙.

## 1. 컴포넌트 작성

- 스타일 = `styled` 팩토리 + 객체 문법 사용함. 별도 레시피 파일(`cva`/`sva`) 금지. 단일 요소는 `styled('button', { base, variants })`.
- 멀티파트 = 플랫 export. Ark 파트를 각각 `styled`로 감싸 평평하게 내보냄.
- 타입은 `type`으로 사용함.
- JSX prop 2개 이상은 줄바꿈. prop이 2개 이상이면 각 prop을 한 줄에 하나씩, 1개면 인라인 유지.
- props에 컴포넌트를 넣지 않음(slotProps·children 슬롯 교체 금지).

## 2. 토큰·스타일

- 시맨틱 토큰만. 색·간격은 시맨틱 토큰으로만(`layout.primary`, `text.default`). 원시 토큰(`orange.500`) 직접 참조 지양.
- 표준 CSS 속성명만 사용. Panda 단축 별칭·커스텀 유틸 금지. 예외: `textStyle` 합성·조건(`_hover` 등)·토큰 참조는 표준 CSS 대응이 없는 Panda 계층이라 허용.
- 단위는 rem. root `62.5%`(프리셋이 배포) → 10px=1rem, 환산 `px ÷ 10`, 기본은 토큰 경유. 예외: `radii.full`(pill)·`shadows`·`border`(테두리
  두께)는 px.
- 단일 컴포넌트 전용 치수(아이콘 원·점·버튼 크기 등)는 컴포넌트 파일에 rem으로 직접 지정할 수 있음(`width: '2.4rem'`). 둘 이상의 컴포넌트가
  공유하거나 브랜드가 조정할 값만 시맨틱 토큰으로 둠. 색·간격·타이포는 이 예외에 해당하지 않음.
- hex는 대문자 (`#EB6013`). `rgba()` 등은 예외.
- 토큰 키는 kebab(하이픈). `emerald-green`, `layout.primary-dark`. camelCase·중첩(`layout.primary.dark`) 금지.
- 타이포는 `textStyle` 우선. `fontSize`/`fontWeight`/`lineHeight` 나열 대신 합성 스타일. 키는 `{그룹}.{크기}-{굵기}`(`body.medium-normal`,
  `heading.large-bold`), 전 그룹 weight 접미사 유지.

## 3. import·네이밍

- 컴포넌트 파일 네이밍은 PascalCase를 사용함.
- 루트 배럴 없음. 패밀리별 서브패스 export. 파트 파일을 폴더 배럴이 아니라 패밀리 엔트리가
  재-export하고, `package.json` `exports`가 각 서브패스(`./field`, `./select`)를 노출함.
- variant 이름은 Figma 속성과 대응되게 작명함.

## 4. 테스트

- 파일은 컴포넌트 옆 `<Component>.test.tsx`.
- 동작·접근성 위주. `screen` 쿼리로 검증(role·텍스트 우선, 장식 요소는 `data-testid`).

## 5. 패키징

- 배포는 `dist`만 (`files: ["dist"]`).
- 빌드 = `tsup` 단일 설정, 서브패스 엔트리별 번들. `minify:false`(styled 정적 추출) + `treeshake:true` + `splitting:false`(엔트리마다
  styled 사본을 독립적으로 가져 공유 청크에 `'use client'`가 전파·오염되는 것을 막음).
- RSC 호환: client 세트(`CLIENT_ENTRIES`)는 `onSuccess`에서 각 출력 최상단에 `'use client'`를 작성함.

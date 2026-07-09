# Vinyl UI project

## Intro

`vinyl-ui` — 헤드리스 컴포넌트(Ark UI)를 Panda CSS로 스타일링해 **npm 패키지**로 배포하는
오픈소스 디자인 시스템. 여러 프로젝트가 동일한 컴포넌트 구조를 공유하되 **브랜드 토큰만**
override 해서 사용.

## 핵심 원칙

- **배포는 npm 패키지, 복사 아님.** 소비자가 컴포넌트 내부를 안 고쳐야 `npm update`가 안 깨지고
  여러 프로젝트 간 일관성이 유지된다. 커스텀은 항상 원본 밖에서 한다.
- **브랜드는 토큰으로 분리.** 컴포넌트 코드는 안 바뀌고 각 프로젝트가 preset으로 색만 갈아끼운다.

## 프로젝트 구조

- **npm workspaces 모노레포** (`packages/*`, `apps/*`), Node >=24 (`.nvmrc`: 24)
- `packages/ui` — 배포 대상 `@bigmobility/vinyl-ui`. dist만 배포(src/테스트/설정 제외)
- `apps/docs` — Next.js 문서/검증 앱

## 명령어

루트에서 실행(워크스페이스 전파, `--if-present`):

- `npm run build` — 빌드
- `npm run dev` — 개발(watch)
- `npm run test` — 테스트
- `npm run check` — 타입체크(`tsc --noEmit`)

`packages/ui` 개별 명령:

- `npm run build` — panda codegen + tsup(`dist` 생성)
- `npm run css` — panda codegen(`styled-system` 생성)
- `npm run lint` — eslint (`--fix` 포함)
- `npm run test` — 테스트

## 작업 규칙: 사전 검토 (Pre-review)

**어떤 작업이든 코드/파일을 수정하기 전에 반드시 사전 검토를 받는다. 승인 없이는 실행하지 않는다.**

실행 직전에 다음을 제시하고 명시적 승인을 기다린다.

1. **대상 작업** — 지금 진행할 작업 항목(작업 순서의 어느 단계인지).
2. **변경 계획** — 생성/수정/삭제할 파일 목록과 각 파일에서 할 일.
3. **핵심 결정** — 선택지와 채택안 + 근거
4. **실행할 명령** — 설치·빌드·테스트 등.

원칙:

- 승인 전에는 파일을 만들거나 고치지 않는다 (읽기·조사는 허용).
- 한 번에 한 작업 단위로 검토받고, 승인된 범위만 실행한다.
- 승인된 범위를 벗어나면 멈추고 다시 사전 검토를 받는다.
- 작업 완료 후 결과·검증을 보고하고 다음 작업의 사전 검토로 넘어간다.

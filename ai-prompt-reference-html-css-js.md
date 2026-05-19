# HTML, CSS, JS 기반 AI·프롬프트 자료정리집 작성 가이드

## 문서 목적

이 문서는 HTML, CSS, JavaScript 기반으로 제작할 **AI·프롬프트 자료정리집** 프로젝트를 위해, Antigravity AI 코딩 에이전트가 그대로 참고할 수 있는 형태의 마크다운 기준 문서다. 자료정리집의 목표는 프롬프트 엔지니어링, 생성형 AI 기초, 모델별 활용법, 실전 템플릿, 실패 사례, 워크플로우를 한곳에 구조화하여 정리하는 것이다.[web:157][page:1][page:2]

이 자료정리집은 단순 링크 모음이 아니라, 사용자가 빠르게 탐색하고 복사하고 재사용할 수 있는 **실전형 레퍼런스 웹앱**을 지향한다. 따라서 문서 구조, 정보 계층, 검색성, 카드형 탐색, 코드 블록 복사, 예시 프롬프트 재사용성이 핵심 품질 기준이다.[page:1][page:2]

## 프로젝트 정의

### 프로젝트명
- Prompt Archive
- AI Playbook
- Prompt Library
- Prompt Atlas

최종 이름은 자유롭게 정하되, 문서 전체에서는 가칭으로 **Prompt Atlas**를 사용한다.

### 한 줄 정의

Prompt Atlas는 프롬프트 엔지니어링과 생성형 AI 활용 지식을 HTML, CSS, JavaScript만으로 정리·탐색·복사·학습할 수 있게 만든 정적 자료정리 웹앱이다.[web:157][page:2]

### 현재 범위
- HTML, CSS, JavaScript 기반 정적 웹앱
- 로컬 파일로 바로 열 수 있는 구조
- 검색, 필터, 카테고리 탐색, 코드 복사 기능 포함
- 외부 백엔드 없이 동작
- JSON 또는 JS 객체 기반 데이터 로드

### 현재 범위 외
- 로그인 기능
- 사용자별 저장 기능
- 서버 DB 연동
- AI API 실시간 호출 기능
- 문서 자동 생성 파이프라인

## 자료정리 대상 범위

자료정리집에 포함할 핵심 카테고리는 아래와 같다.

| 카테고리 | 포함 내용 |
|---|---|
| AI 기초 | 생성형 AI, LLM, 토큰, 컨텍스트 윈도우, RAG, 추론 모델 개념 |
| 프롬프트 기초 | 명확한 지시, 역할 지정, 출력 형식 지정, 제약 조건 부여 |
| 프롬프트 기법 | zero-shot, few-shot, chain-style reasoning, prompt chaining, XML/Markdown 구조화 |
| 모델별 차이 | OpenAI 계열, Claude 계열, reasoning 모델 vs GPT형 모델 차이 |
| 실전 템플릿 | 요약, 분류, 번역, 코드 생성, 논문 정리, 메타분석 보조, 발표문 작성 |
| 실패 사례 | 환각, 모호한 지시, 과도한 범위, 잘못된 출력 형식, 근거 부재 |
| 평가와 개선 | success criteria, 테스트 케이스, 프롬프트 반복 개선 |
| 리소스 모음 | 공식 문서, 튜토리얼, 가이드, 참고 링크 |

OpenAI는 프롬프트 엔지니어링을 “모델이 요구사항을 일관되게 충족하도록 효과적인 지시를 작성하는 과정”으로 설명하며, 역할 메시지, 예시, 문맥 제공, 구조화된 포맷, 모델별 지시 수준 차이를 핵심 요소로 제시한다.[page:2] Anthropic 역시 명확한 지시, 예시 제공, XML 구조화, 역할 부여, thinking, chaining, 평가 기준 수립을 핵심 기법으로 안내한다.[page:1]

## 정보 구조 설계

자료정리집은 아래 6개 상위 메뉴로 구성한다.

1. 홈
2. AI 기초
3. 프롬프트 기법
4. 실전 템플릿
5. 실패와 개선
6. 리소스

### 권장 페이지 구조

```text
/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   ├── js/data.js
│   ├── js/render.js
│   └── icons/
└── data/
    └── prompts.json (선택)
```

### 단일 페이지 앱 권장 이유

이번 프로젝트는 정보 탐색과 빠른 복사가 핵심이므로, 여러 HTML 파일보다 **단일 페이지 앱(SPA처럼 동작하는 정적 구조)** 이 더 적합하다. 해시 라우팅(`#basics`, `#techniques`, `#templates`) 또는 섹션 스크롤 방식으로 구성하면 HTML/CSS/JS만으로도 충분히 구현 가능하다.

## 콘텐츠 카테고리 상세 정의

### 1. AI 기초

이 섹션은 비전공자도 이해할 수 있도록 핵심 용어를 짧고 명확하게 설명한다.

필수 항목:
- 생성형 AI란 무엇인가
- LLM이란 무엇인가
- 토큰이란 무엇인가
- 컨텍스트 윈도우란 무엇인가
- RAG란 무엇인가
- reasoning model과 일반 GPT형 모델의 차이

OpenAI는 reasoning 모델은 복잡한 작업과 다단계 계획에 강하고, GPT 계열은 빠르고 비용 효율적이지만 더 명시적인 지시를 잘 따른다고 설명한다.[page:2] 따라서 이 차이를 표와 예시로 정리해야 한다.

예시 표:

| 개념 | 쉬운 설명 | 실전 의미 |
|---|---|---|
| 토큰 | 모델이 처리하는 텍스트 조각 | 입력이 길수록 비용·속도 영향 |
| 컨텍스트 윈도우 | 모델이 한 번에 고려할 수 있는 정보량 | 긴 문서 요약, RAG 설계에 중요 |
| RAG | 외부 문서를 찾아 프롬프트에 넣는 방식 | 환각 감소, 최신 자료 반영 |
| reasoning model | 내부 추론에 강한 모델 | 복잡한 분석, 단계적 문제 해결 |

### 2. 프롬프트 기법

이 섹션은 자료정리집의 중심이다. 각 기법은 아래 형식으로 통일한다.

- 기법명
- 정의
- 언제 쓰는가
- 좋은 예시
- 나쁜 예시
- 주의점

필수 기법 목록:
- Clear instruction
- Role prompting
- Output formatting
- Few-shot prompting
- Context injection
- Markdown 구조화
- XML 태그 활용
- Prompt chaining
- Evaluation-driven iteration

OpenAI는 개발자 메시지에 Identity, Instructions, Examples, Context 순서의 구조를 두는 방식을 예시로 보여주며, Markdown과 XML 태그가 논리적 경계를 분명히 하는 데 도움이 된다고 설명한다.[page:2] Anthropic도 XML 구조화, 역할 지정, 예시, chaining, success criteria 수립을 권장한다.[page:1]

예시 카드 데이터 형식:

```js
{
  id: "few-shot",
  category: "프롬프트 기법",
  title: "Few-shot Prompting",
  summary: "입력-출력 예시를 몇 개 제공해 원하는 패턴을 모델이 따르게 하는 방식",
  whenToUse: ["분류", "형식 통일", "톤 맞추기"],
  goodExample: "아래 예시 형식처럼 문장을 긍정/부정/중립으로 분류하라...",
  badExample: "그냥 알아서 분류해줘",
  caution: "예시 편향이 생기지 않도록 다양한 사례 포함"
}
```

### 3. 모델별 활용법

이 섹션은 모델마다 지시 방식이 다를 수 있다는 점을 정리한다.

핵심 내용:
- OpenAI 계열: GPT 모델은 더 구체적이고 명시적인 지시를 잘 따름[page:2]
- reasoning 계열: 더 높은 수준의 목표 지시만으로도 복잡한 문제 해결 가능[page:2]
- Claude 계열: clear, direct, examples, XML, thinking, chaining 중심 가이드 제공[page:1]

권장 비교표:

| 구분 | OpenAI GPT형 | Reasoning형 | Claude 계열 |
|---|---|---|---|
| 지시 방식 | 구체적 지시 선호 | 목표 중심 고수준 지시 가능 | 명확하고 구조화된 지시 선호 |
| 예시 중요도 | 높음 | 상황별 | 높음 |
| 구조화 | Markdown/XML 유용 | 유용 | XML 태그 활용 강조 |
| 적합 작업 | 코드, 문서, 포맷 고정 작업 | 복잡한 분석·계획 | 긴 문맥·정리·가이드형 작업 |

### 4. 실전 템플릿

이 섹션은 실제로 가장 많이 쓰이는 프롬프트를 바로 복사할 수 있게 만든다. 카드마다 “복사” 버튼이 있어야 한다.

필수 템플릿 예시:
- 논문 요약 프롬프트
- 메타분석 자료 추출 프롬프트
- 네트워크 메타분석 개념 설명 프롬프트
- 코드 디버깅 프롬프트
- HTML/CSS/JS 프로젝트 기획 프롬프트
- 발표 자료 초안 프롬프트
- 영문 교정 프롬프트
- 표 기반 데이터 정리 프롬프트

예시 템플릿:

```text
역할: 당신은 재활의학 및 물리치료 분야 연구 보조 AI이다.
목표: 아래 논문 초록을 PICO, 주요 결과, 임상적 의미, 한계점으로 나누어 표 형식으로 정리하라.
출력 형식: Markdown table
제약 조건: 추측하지 말고, 초록에 없는 내용은 '보고되지 않음'이라고 표기하라.
입력 자료:
[논문 초록 본문]
```

이런 식의 템플릿은 사용자의 연구 배경과도 잘 맞는다. 특히 구조화된 출력, 제약 조건, 역할 부여는 공식 가이드들이 공통적으로 강조하는 방법이다.[web:157][page:1][page:2]

### 5. 실패 사례와 개선법

이 섹션은 “왜 원하는 답이 안 나왔는가”를 정리하는 교육용 섹션이다.

필수 항목:
- 질문이 너무 모호함
- 출력 형식이 없음
- 근거 자료를 안 줌
- 작업이 너무 큼
- 예시가 없음
- 성공 기준이 없음

Anthropic은 먼저 success criteria와 eval을 정의하라고 권장하고[page:1], OpenAI는 프롬프트 성능을 평가하는 eval 구축과 모델 버전 고정을 권장한다.[page:2] 따라서 이 섹션은 단순 팁이 아니라 **문제 → 원인 → 수정된 프롬프트** 구조로 작성해야 한다.

예시 표:

| 실패 유형 | 원인 | 수정 방법 |
|---|---|---|
| 답이 장황함 | 길이·형식 지시 없음 | “3문장 이내, bullet 3개” 명시 |
| 환각 발생 | 참고 자료 미제공 | 문서 본문 첨부 또는 RAG 사용 |
| 출력이 들쭉날쭉 | 예시 없음 | few-shot 예시 추가 |
| 작업 누락 | 복합 작업 한 번에 요청 | 단계별 체인으로 분리 |

### 6. 리소스 섹션

외부 링크는 공식 문서를 우선으로 정리한다.

필수 링크 목록:
- OpenAI Prompt Engineering Guide [https://platform.openai.com/docs/guides/prompt-engineering][web:157]
- Claude Prompt Engineering Overview [https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview][web:161]
- Prompt Engineering Guide (dair-ai) [https://github.com/dair-ai/prompt-engineering-guide][web:170]
- Learn Prompting [https://learnprompting.org/docs/introduction][web:159]
- Google Cloud Prompt Engineering Guide [https://cloud.google.com/discover/what-is-prompt-engineering][web:164]

## UI/UX 요구사항

### 디자인 방향
- 깔끔한 문서형 + 카드형 혼합 UI
- 개발자 문서 느낌이 있으나 너무 건조하지 않게 구성
- 좌측 사이드바 + 우측 콘텐츠 구조 권장
- 모바일에서는 상단 탭 또는 오프캔버스 메뉴로 전환

### 필수 UI 컴포넌트
- 상단 검색창
- 카테고리 필터 칩
- 카드 목록
- 상세 보기 패널 또는 모달
- 코드 블록 복사 버튼
- 외부 링크 버튼
- 북마크 아이콘(로컬 상태만)

### 검색 기능 요구사항
- 제목 검색
- 키워드 검색
- 카테고리 필터 검색
- 난이도 필터(입문/중급/고급)
- 모델 태그 필터(OpenAI / Claude / 공통)

예시 태그 체계:

```js
["입문", "공통", "프롬프트 기법"]
["중급", "Claude", "XML"]
["고급", "OpenAI", "Reasoning"]
```

## HTML 구조 지침

```html
<body>
  <header class="topbar">
    <div class="brand">Prompt Atlas</div>
    <input type="search" id="searchInput" placeholder="프롬프트, 기법, 모델 검색" />
  </header>

  <div class="app-layout">
    <aside class="sidebar">
      <nav>
        <button data-section="all">전체</button>
        <button data-section="ai-basics">AI 기초</button>
        <button data-section="techniques">프롬프트 기법</button>
        <button data-section="templates">실전 템플릿</button>
        <button data-section="failures">실패와 개선</button>
        <button data-section="resources">리소스</button>
      </nav>
    </aside>

    <main class="content">
      <section id="filterBar"></section>
      <section id="cardList"></section>
      <section id="detailPanel"></section>
    </main>
  </div>
</body>
```

## CSS 작성 지침

- CSS 변수로 색상 체계 정의
- 코드 블록은 다크 톤, 일반 배경은 밝은 중립색 권장
- 라운드는 과하지 않게 8px~12px 수준
- card hover는 미세한 elevation만 적용
- 문단 가독성을 위해 최대 본문 폭 72ch 유지
- 모바일 우선 반응형 설계

예시 토큰:

```css
:root {
  --bg: #f7f7f5;
  --surface: #ffffff;
  --surface-2: #f0f1ec;
  --text: #1e1f1c;
  --muted: #6b6f67;
  --border: #d8dbd1;
  --primary: #165d52;
  --primary-soft: #d9ece8;
  --code-bg: #16181d;
  --code-text: #e9edf1;
  --danger: #a53b3b;
  --radius: 12px;
}
```

## JavaScript 기능 요구사항

필수 구현 기능:
- 데이터 배열 렌더링
- 검색어에 따른 실시간 필터링
- 카테고리 필터링
- 태그 클릭 필터링
- 카드 클릭 시 상세 표시
- 코드 블록 복사
- URL 외부 링크 열기
- 현재 필터 상태 유지(메모리 수준)

권장 함수 목록:

```js
renderCards(items)
renderDetail(item)
filterItems({ keyword, section, tags, level, model })
copyPrompt(text)
setActiveSection(section)
setActiveTags(tags)
```

## 데이터 구조 지침

정적 프로젝트이므로 `data.js` 또는 `prompts.json`에 아래 형식으로 저장한다.

```js
const promptItems = [
  {
    id: "role-prompting-001",
    section: "techniques",
    category: "프롬프트 기법",
    title: "Role Prompting",
    level: "입문",
    model: ["공통"],
    tags: ["역할", "기초", "지시문"],
    summary: "모델에게 역할을 부여해 말투와 관점을 안정화하는 기법",
    description: "전문가 역할, 교사 역할, 코딩 에이전트 역할 등을 부여하면 출력의 일관성을 높일 수 있다.",
    goodExample: "당신은 물리치료학 박사 수준의 연구 보조 AI이다...",
    badExample: "설명해줘",
    caution: "역할만 주고 출력 형식·제약을 안 주면 결과가 들쭉날쭉할 수 있다.",
    sourceType: "official",
    sources: [
      { label: "OpenAI Prompt Engineering", url: "https://platform.openai.com/docs/guides/prompt-engineering" },
      { label: "Claude Prompt Engineering Overview", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview" }
    ]
  }
];
```

## 콘텐츠 작성 원칙

1. 설명은 짧고 명확하게 쓴다.
2. 각 항목에는 반드시 예시를 넣는다.
3. “좋은 프롬프트 / 나쁜 프롬프트”를 같이 제시한다.
4. 공식 문서 기준 내용을 우선 반영한다.[web:157][web:161]
5. 추상적 이론보다 바로 쓸 수 있는 템플릿을 우선 배치한다.
6. 초보자용 설명과 실무자용 주의점을 함께 둔다.

## 추천 콘텐츠 초안 목차

```text
1. 이 사이트는 무엇인가
2. 생성형 AI 빠른 이해
3. 프롬프트 엔지니어링 핵심 원칙
4. 역할 부여와 지시문 설계
5. 예시 기반 프롬프트 작성법
6. Markdown/XML 구조화 기법
7. RAG와 문맥 제공 전략
8. 모델별 프롬프팅 차이
9. 실전 템플릿 모음
10. 실패 사례와 개선 기록
11. 공식 문서와 학습 리소스
```

## 완료 기준

아래 기준을 모두 충족해야 이 자료정리집이 완료된 것으로 판단한다.

- [ ] HTML, CSS, JS만으로 동작한다.
- [ ] 메인 화면에서 카테고리 탐색이 가능하다.
- [ ] 검색창에서 제목/요약/태그 검색이 가능하다.
- [ ] 카드 클릭 시 상세 내용을 확인할 수 있다.
- [ ] 예시 프롬프트에 복사 버튼이 있다.
- [ ] 공식 리소스 링크가 포함되어 있다.[web:157][web:161][web:170]
- [ ] 모바일 화면에서도 사용 가능하다.
- [ ] 최소 20개 이상의 자료 카드가 포함된다.
- [ ] AI 기초 / 기법 / 템플릿 / 실패 / 리소스 5개 이상의 대분류가 구현된다.

## 검증 기준

### 기능 검증
- 검색창에 `few-shot` 입력 → 관련 카드만 남아야 함
- `Claude` 태그 클릭 → Claude 관련 카드만 필터링돼야 함
- 템플릿 카드에서 복사 버튼 클릭 → 클립보드 복사 성공해야 함
- 외부 링크 클릭 → 공식 문서 열림

### 콘텐츠 검증
- 각 카드에 제목, 요약, 설명, 예시, 주의점이 모두 있어야 함
- 출처가 공식 자료인지 확인 가능해야 함
- 초보자도 읽을 수 있는 설명과 실무자가 참고할 수 있는 예시가 같이 있어야 함

### UI 검증
- 1280px 이상 데스크톱에서 좌측 사이드바가 유지됨
- 768px 이하에서 레이아웃이 세로형으로 자연스럽게 전환됨
- 긴 프롬프트가 코드 블록에서 깨지지 않음

## Antigravity AI 코딩 에이전트 지시사항

1. 우선 정적 SPA 형태로 구현하라.
2. 데이터는 `data.js` 내부 배열로 먼저 작성하라.
3. HTML은 의미론적 태그를 사용하라.
4. CSS는 변수 중심으로 작성하라.
5. JavaScript는 프레임워크 없이 순수 함수 중심으로 작성하라.
6. 더미 텍스트 대신 실제 프롬프트 자료를 최소 20개 이상 넣어라.
7. 카드 UI와 상세 패널 UI를 분리하라.
8. 복사 가능한 프롬프트 블록을 핵심 기능으로 구현하라.
9. 공식 출처 링크를 각 카드 하단에 표시하라.[web:157][web:161]
10. AI스럽고 과장된 마케팅 문구 대신 문서형·레퍼런스형 톤을 유지하라.

## 권장 초기 데이터셋 20개 예시

- 생성형 AI란?
- LLM이란?
- 토큰과 컨텍스트 윈도우
- RAG 기초
- Role Prompting
- Clear Instruction
- Output Formatting
- Few-shot Prompting
- Context Injection
- XML Structuring
- Markdown Structuring
- Prompt Chaining
- Evaluation 설계
- OpenAI식 프롬프트 구조
- Claude식 프롬프트 구조
- 논문 요약 템플릿
- 코드 디버깅 템플릿
- 발표 자료 작성 템플릿
- 환각 줄이기 체크리스트
- 공식 리소스 모음

## 최종 메모

이 프로젝트의 본질은 “AI를 소개하는 사이트”가 아니라, **AI와 프롬프트를 공부하고 실제로 쓰기 위한 정리형 레퍼런스 도구**를 만드는 것이다. 따라서 예쁜 랜딩페이지보다 정보 구조, 탐색성, 복사 편의성, 실용적 예시가 더 중요하다.[page:1][page:2]

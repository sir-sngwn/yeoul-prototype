# 여울 (YEOUL)

여행의 기억을 **3D 지구본 · 지도 동선 · 소셜 피드**로 엮어내는 올 다크(All-Dark) 모바일 여행 기록 프로토타입입니다.

- **GitHub Repository**: https://github.com/sir-sngwn/yeoul-prototype
- **Live Demo (GitHub Pages)**: https://sir-sngwn.github.io/yeoul-prototype/

---

## 주요 화면 및 기능 (4-Tab 구조)

### 1. 지구본 (Globe & Activity)
- **도시별 3D 지구본 탐색**: 프라하 · 도쿄 · 오사카 · 홍콩 칩 전환 시 시점 이동과 함께 하단 원형 스토리 하이라이트 바가 해당 도시 스팟으로 즉시 동기화됩니다.
- **풀스크린 스토리 뷰어**: 원형 버블을 탭하면 자동 재생 스토리, 공감 토글, 답장, 공유 스튜디오 연동 모달이 열립니다.
- **Activity 드로어**: 하단 시트를 드래그/휠로 위로 끌어올리면 친구들의 최근 활동 피드를 확인할 수 있습니다.

### 2. 지도 (Map & AI Best Cut)
- **스티키 다크 지도 & 동선**: 방문 순서 넘버링 핀과 반투명 점선 동선(`Leaflet.js`), 스크롤 연동 카드 포커싱, 그룹 필터(`전체`, `Day 1`, `Day 2`, `동행자별`)를 제공합니다.
- **사진 추가 & 실제 EXIF 자동 배치**: 우측 상단 `+ 사진 추가` 시트에서 샘플 사진 배치뿐 아니라 **`+ 기기 사진`**으로 로컬 JPG/PNG/WebP를 불러와 `exifr`로 GPS 위경도와 촬영 시각을 자동 추출하고 지도에 배치합니다.
- **AI 베스트 컷 전환 & 미니멀 HUD**: 사진을 탭해 대표 컷 ↔ 후보 컷을 비교할 수 있으며, 우측 상단 `✦` 배지를 탭하면 Canvas 실측 분석 기반 **색감 · 대비 · 노출** 3줄 게이지 HUD가 토글됩니다.
- **3D 공간 패럴랙스 & 지도 뷰어**: 카드 우측 하단 `3D` / `↗` 버튼을 통해 `[ 3D | 지도 ]` 통합 `<dialog>` 모달에서 마우스·터치 반응형 3D 깊이 패럴랙스 뷰와 Google Maps를 전환할 수 있습니다.
- **공유 스튜디오 & PNG 저장**: 상단 공유 버튼으로 9:16 스토리 / 4:5 피드 포스터 미리보기를 띄우고, HTML5 `<canvas>` 벡터 그래픽으로 `yeoul_prague_story.png`를 즉시 다운로드할 수 있습니다.

### 3. 친구 피드 (Friends Feed)
- 도시/동행자 필터 칩과 게시물별 좋아요, 댓글 드로어, 동행자 태그, 공유 스튜디오 연동을 지원합니다.

### 4. 마이 (Profile, Friends & DM)
- 팔로우/팔로잉 관리, `@handle` 친구 추가, 하단 추천 친구 가로 캐러셀, 실시간 1:1 다크 DM 채팅 모달을 제공합니다.

---

## 기술 스택

- **Core**: Single-File `HTML5` / `CSS3` (Zero-Text Minimalism Dark System: `#0A0A0A`, `#141414`, `#1F1F1F`) / `Vanilla JavaScript`
- **Maps & 3D**: `Globe.gl`, `Leaflet.js` (Esri Dark Gray Canvas), CSS 3D Perspective Parallax
- **Media & Audio**: `exifr` (EXIF GPS & `DateTimeOriginal` 파싱), `Canvas 2D API` (픽셀 밝기·대비·채도 분석 및 PNG 포스터 렌더링), `Web Audio API` (장소별 사운드)

---

## 파일 구조 및 실행 방법

```text
.
├── index.html    # 단일 파일 실행본 (HTML + CSS + JS)
└── README.md     # 프로젝트 소개 및 실행 가이드
```

별도 빌드나 서버 설치 없이 [`index.html`](./index.html)을 브라우저로 바로 열거나 GitHub Pages 링크로 접속해 실행할 수 있습니다.

# Project: RunAsUser (The User-Scope Installer Fixer)

## 1. 개요 (Overview)
**RunAsUser**는 윈도우 환경에서 VS Code, Cursor, Antigravity 등의 프로그램 설치/업데이트 시 발생하는 **"Administrator Privileges(관리자 권한)"** 충돌 문제를 해결해주는 웹 기반 유틸리티 도구입니다.

사용자의 실행 권한을 강제로 낮춰주는(De-elevate) 명령어를 생성하여, **"Updates are disabled because you are running as Administrator"** 또는 **"This User Installer is not meant to be run as an Administrator"** 에러를 즉시 해결합니다.

## 2. SEO 및 타겟 키워드 전략 (SEO Strategy)
* **Target Audience:** 개발 환경(IDE) 업데이트가 막힌 개발자, "User-scope" 에러를 겪는 윈도우 사용자.
* **Core Keywords:** * `User scope installation error fix`
    * `Updates are disabled administrator`
    * `Run as invoker windows 10/11`
    * `Antigravity update fail`
    * `VS Code user setup admin error`

## 3. 기술 스택 (Tech Stack)
* **Framework:** Next.js (App Router) - SEO 최적화 및 빠른 로딩.
* **Styling:** Tailwind CSS - 다크 모드 기반의 터미널/해커 스타일 UI.
* **Deployment:** GitHub Pages - 정적 배포 용이.

## 4. 핵심 기능 (Core Features)

### A. 자가 진단 (Self Diagnosis)
* 사용자가 현재 겪고 있는 에러 상황을 체크리스트로 확인.
    * "속성 > 호환성 탭에서 관리자 권한 체크를 해제했습니까?"
    * "네트워크 드라이브나 공유 폴더에서 실행 중입니까?"

### B. 원클릭 솔루션 생성 (The Fix Generator)
* 사용자가 문제가 되는 **설치 파일명**(예: `Antigravity.exe`)을 입력하면, 즉시 해결 명령어를 생성.

#### 기능 1: CMD 명령어 생성 (Copy & Paste)
* **Logic:** 윈도우 내장 `runas` 명령어를 활용하여 신뢰 수준(TrustLevel)을 강제로 낮춤.
* **Output:**
    ```cmd
    runas /trustlevel:0x20000 "파일명.exe"
    ```
    *(클립보드 복사 버튼 포함)*

#### 기능 2: 자동 실행 배치 파일 (.bat) 다운로드
* 복잡한 타이핑 없이 파일을 다운받아 설치 파일 옆에 두고 실행하면 해결.
* **`RunAsUser_Fix.bat` 내용:**
    ```batch
    @echo off
    title RunAsUser - Force User Scope
    echo [INFO] 강제로 일반 유저 권한(0x20000)으로 실행합니다...
    
    :: 사용자가 드래그&드롭하거나 파일명을 입력받음
    set /p target="실행할 설치 파일명(확장자 포함)을 입력하세요: "
    
    runas /trustlevel:0x20000 "%target%"
    pause
    ```

## 5. UI/UX 디자인 가이드
* **Main Concept:** `Terminal`, `Command Prompt`, `Matrix Green`
* **Color Palette:**
    * Background: `#0d1117` (GitHub Dark Dimmed)
    * Accent: `#2ea043` (Success Green)
    * Text: `#c9d1d9` (Readable Gray)
* **Layout:**
    * **Hero Section:** 에러 메시지 스크린샷을 보여주며 "이거 뜨나요? 3초 만에 해결해 드립니다." 문구 배치.
    * **Input Section:** 커다란 터미널 창 모양의 입력 필드.
    * **Footer:** SEO 키워드가 자연스럽게 녹아든 FAQ 섹션.

## 6. 프롬프트 참고용 데이터 (Context for AI)
* **핵심 원리:** 윈도우의 UAC(User Account Control)가 켜져 있거나 레지스트리에 호환성 플래그가 꼬였을 때, `runas /trustlevel:0x20000` 명령어를 사용하면 **관리자 권한을 상속받지 않고(Basic User Token)** 프로세스를 실행할 수 있음.
* 이 웹 도구는 사용자의 로컬 파일을 직접 건드리지 않고, 올바른 실행 방법(명령어)을 텍스트로 제공하는 것이 목적임.
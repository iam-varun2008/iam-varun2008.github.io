(() => {
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const englishCopy = {
    previousScreenshot: "Previous project screenshot",
    nextScreenshot: "Next project screenshot",
    viewFullImage: "View screenshot full size",
    closeViewer: "Close image viewer",
    imageViewer: "Project screenshot viewer",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    emailCopied: "Email copied",
    readLess: "Read less",
    readMore: "Read more",
    mailSubject: name => `Portfolio message from ${name}`,
    mailFrom: "From",
    mailEmail: "Email"
  };

  const koreanCopy = {
    previousScreenshot: "이전 프로젝트 스크린샷",
    nextScreenshot: "다음 프로젝트 스크린샷",
    viewFullImage: "스크린샷 크게 보기",
    closeViewer: "이미지 뷰어 닫기",
    imageViewer: "프로젝트 스크린샷 뷰어",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    emailCopied: "이메일 주소가 복사되었습니다",
    readLess: "접기",
    readMore: "더 보기",
    mailSubject: name => `${name}님의 포트폴리오 문의`,
    mailFrom: "보낸 사람",
    mailEmail: "이메일"
  };

  const englishContent = new Map();
  const englishAttributes = new Map();
  const rememberAttribute = (element, name) => {
    if (!englishAttributes.has(element)) englishAttributes.set(element, new Map());
    const attributes = englishAttributes.get(element);
    if (!attributes.has(name)) attributes.set(name, element.getAttribute(name));
  };
  const rememberContent = element => {
    if (!englishContent.has(element)) englishContent.set(element, [...element.childNodes]);
    rememberAttribute(element, "aria-label");
  };

  const setHtml = (selector, value) => qsa(selector).forEach(element => {
    rememberContent(element);
    element.innerHTML = value;
  });
  const setText = (selector, value) => qsa(selector).forEach(element => {
    rememberContent(element);
    element.textContent = value;
  });
  const setList = (selector, values) => qsa(selector).forEach((element, index) => {
    if (values[index] === undefined) return;
    rememberContent(element);
    element.textContent = values[index];
  });
  const setOwnTextList = (selector, values) => qsa(selector).forEach((element, index) => {
    if (values[index] === undefined) return;
    rememberContent(element);
    [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => node.remove());
    element.append(document.createTextNode(` ${values[index]}`));
  });
  const setAttribute = (selector, name, value) => qsa(selector).forEach(element => {
    rememberAttribute(element, name);
    element.setAttribute(name, value);
  });

  function restoreEnglish() {
    englishContent.forEach((nodes, element) => {
      if (element.isConnected) element.replaceChildren(...nodes);
    });
    englishAttributes.forEach((attributes, element) => {
      if (!element.isConnected) return;
      attributes.forEach((value, name) => {
        if (value === null) element.removeAttribute(name);
        else element.setAttribute(name, value);
      });
    });
    document.title = "Nandi Varun Reddy | Computer Science & Cybersecurity Portfolio";
    const englishDescription = "Computer science and cybersecurity student Nandi Varun Reddy presents practical Python projects in network security, packet analysis, and log analysis.";
    setAttribute('meta[name="description"]', "content", englishDescription);
    setAttribute('meta[property="og:title"]', "content", "Nandi Varun Reddy | Computer Science & Cybersecurity Portfolio");
    setAttribute('meta[property="og:description"]', "content", "A bilingual portfolio of practical Python projects in network security, packet analysis, and log analysis.");
  }

  const gateCursor = qs(".cursor");
  const trackGateCursor = event => {
    if (!gateCursor) return;
    gateCursor.style.left = `${event.clientX}px`;
    gateCursor.style.top = `${event.clientY}px`;
  };
  if (gateCursor && matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", trackGateCursor, { passive:true });
  }

  function applyKorean() {
    const nav = ["홈", "소개", "프로젝트", "아트", "목표", "연락처"];
    document.documentElement.lang = "ko";
    document.title = "난디 바룬 레디 | 컴퓨터과학 및 사이버보안 포트폴리오";
    const koreanDescription = "인도 텔랑가나의 컴퓨터과학 및 사이버보안 학생 난디 바룬 레디가 Python으로 만든 네트워크 보안, 패킷 분석, 로그 분석 프로젝트를 소개하는 이중 언어 포트폴리오입니다.";
    setAttribute('meta[name="description"]', "content", koreanDescription);
    setAttribute('meta[property="og:title"]', "content", "난디 바룬 레디 | 컴퓨터과학 및 사이버보안 포트폴리오");
    setAttribute('meta[property="og:description"]', "content", koreanDescription);
    setHtml(".language-mark,.brand-chip", "바룬<sup>®</sup>");
    setText(".hero-word,.loader-word", "바룬");
    setHtml(".footer-word", "바룬<sup>®</sup>");
    setText(".cursor span", "보기");
    setText(".mobile-header .call-chip", "문의하기");
    setAttribute(".menu-button", "aria-label", "메뉴 열기");
    setAttribute(".sidebar", "aria-label", "포트폴리오 내비게이션");
    setAttribute(".socials a:first-child", "aria-label", "바룬의 GitHub");
    setAttribute(".socials a:last-child", "aria-label", "바룬에게 이메일 보내기");
    setHtml(".side-intro > p", "<strong class=\"inline-full-name\">난디 바룬 레디</strong>는 네트워킹, Linux, 윤리적 보안, 위협 탐지를 배우며 실용적인 Python 도구를 만드는 컴퓨터과학 및 사이버보안 학생입니다.");
    setHtml(".side-projects-target span", "<b>보안</b> 프로젝트");
    setHtml(".side-years-target span", "인증된<br />수료증");
    setList(".side-label", nav);
    setList(".hero-nav a", nav);
    setOwnTextList(".mobile-menu nav a", nav);
    setList(".skill-marquee span", ["Python", "Linux", "보안", "아트", "Python", "Linux", "보안", "아트"]);
    setAttribute(".client-strip", "aria-label", "기술: Python, Linux, 보안, 아트");
    setText(".book-button", "문의하기");

    setHtml(".hero-kicker", "보안을 만드는 사람.<br />바로 바룬입니다.<small><strong class=\"hero-full-name\">난디 바룬 레디</strong><span>컴퓨터과학 및 사이버보안 학생</span></small>");
    setAttribute(".hero-photo", "alt", "난디 바룬 레디의 인물 사진");
    setHtml(".hero-title h1", "<span>보안을,</span><span>실전에</span><span>적용하다.</span>");
    setText(".hero-actions a:first-child", "문의하기");
    setText(".hero-actions a:last-child", "소개 보기");
    setHtml(".projects-stat span", "<b>보안</b> 프로젝트");
    setHtml(".years-stat span", "인증된<br />수료증");
    setOwnTextList(".traits-card > span", ["창의적", "신뢰할 수 있는", "전략적", "실행하는 사람", "효율적"]);
    setText(".hero-copy", "네트워킹, Linux, 윤리적 보안, 위협 탐지를 배우며 실용적인 Python 도구를 만드는 컴퓨터과학 및 사이버보안 학생입니다.");
    setText(".scroll-note span", "스크롤하여 둘러보기");

    setText(".about .eyebrow", "학습 · 제작 · 보안");
    setHtml(".about .section-heading h2", "나에 대해 (&amp;)<br />나의 여정");
    setHtml(".about .section-heading > p", "저는 인도 텔랑가나 출신의 컴퓨터과학 및 사이버보안에 관심이 있는 학생 <strong class=\"inline-full-name\">난디 바룬 레디</strong>입니다. Python 프로젝트를 통해 네트워킹, 방어형 보안, 자동화, 위협 탐지를 더욱 실용적으로 이해하고 있습니다. 기술 밖에서는 흑연 드로잉을 통해 인내심, 관찰력, 세부 사항에 대한 주의력을 길렀습니다.");
    setText(".timeline-card:nth-of-type(1) .year", "10학년");
    setText(".timeline-card:nth-of-type(1) h3", "10학년");
    setText(".timeline-card:nth-of-type(1) > p", "스스로 꾸준히 학습하는 규율을 길러 준 탄탄한 학업 기반입니다.");
    setText(".timeline-card:nth-of-type(1) .academic-score small", "평점");
    setHtml(".timeline-card:nth-of-type(1) .card-meta > span", "평균 평점<br /><em>학업 성적</em>");
    setText(".timeline-card:nth-of-type(2) .year", "11학년");
    setText(".timeline-card:nth-of-type(2) h3", "11학년");
    setText(".timeline-card:nth-of-type(2) > p", "모든 과목에서 집중력과 꾸준함을 유지하며 공부했습니다.");
    setHtml(".timeline-card:nth-of-type(2) .card-meta > span", "461 / 470점<br /><em>학업 성적</em>");
    setText(".timeline-card:nth-of-type(3) .year", "12학년");
    setText(".timeline-card:nth-of-type(3) h3", "12학년");
    setText(".timeline-card:nth-of-type(3) > p", "인내와 꾸준함, 세부 사항에 대한 집중력을 보여 주는 성적으로 학교 과정을 마쳤습니다.");
    setHtml(".timeline-card:nth-of-type(3) .card-meta > span", "979 / 1000점<br /><em>학업 성적</em>");
    setText(".timeline-card:nth-of-type(4) h3", "IELTS 아카데믹");
    setText(".timeline-card:nth-of-type(4) > p", "학업 목적의 듣기, 읽기, 쓰기, 말하기 전 영역에서 높은 영어 능력을 입증한 종합 밴드 점수입니다.");
    setHtml(".timeline-card:nth-of-type(4) .card-meta > span", "듣기 7.5 · 읽기 7.5 · 쓰기 8.0 · 말하기 6.5<br /><em>종합 밴드 점수 · CEFR C1</em>");
    setText(".timeline-card:nth-of-type(5) > p", "Harvard University의 CS50에서 제공하는 Python 프로그래밍 입문 과정입니다.");
    setHtml(".timeline-card:nth-of-type(5) .card-meta > span", "Python 프로그래밍<br /><em>인증된 과정</em>");
    setText(".timeline-card:nth-of-type(6) h3", "프리 시큐리티 과정");
    setText(".timeline-card:nth-of-type(6) > p", "컴퓨터, 네트워킹, 웹, 보안의 핵심 기초를 다루는 TryHackMe 프리 시큐리티 학습 경로입니다.");
    setHtml(".timeline-card:nth-of-type(6) .card-meta > span", "TryHackMe 프리 시큐리티<br /><em>인증된 과정</em>");
    setText(".certificate-link", "수료증 보기 ↗");

    setText(".technical-foundation .eyebrow", "현재의 기초");
    setText(".technical-foundation h3", "기술 기초");
    setList(".foundation-group dt", ["프로그래밍", "사이버보안", "네트워킹", "도구 / 기술", "시스템"]);
    setList(".foundation-group dd", [
      "Python",
      "네트워크 보안, 로그 분석, 기본 위협 탐지, 윤리적 보안 개념",
      "TCP/IP 기초, 포트 및 서비스, 패킷 분석, DNS, ICMP",
      "Git, GitHub, Scapy, Streamlit",
      "Linux 기초, 명령줄"
    ]);

    setText(".work-intro .eyebrow", "선정 프로젝트");
    setHtml(".work-intro h2", "탐지하도록 만들고,<br />이해하도록 설계하다");
    setText(".work-intro > p", "제가 학습하는 방식을 보여 주는 세 가지 프로젝트입니다. 도구를 만들고, 허가된 환경에서 테스트하고, 결과를 문서화해 누구나 쉽게 살펴볼 수 있게 했습니다.");
    setAttribute(".project-card:nth-child(1) .project-gallery", "aria-label", "네트워크 보안 모니터 스크린샷");
    setAttribute(".project-card:nth-child(2) .project-gallery", "aria-label", "포트 취약점 스캐너 스크린샷");
    setAttribute(".project-card:nth-child(3) .project-gallery", "aria-label", "로그 분석기 스크린샷");
    setList(".project-card:nth-child(1) .project-tags span", ["01", "Python", "Scapy", "Streamlit", "네트워킹", "규칙 기반 탐지"]);
    setList(".project-card:nth-child(2) .project-tags span", ["02", "Python", "네트워크", "위험"]);
    setList(".project-card:nth-child(3) .project-tags span", ["03", "Python", "로그", "방어"]);
    setText(".project-card:nth-child(1) .project-info h3", "네트워크 보안 모니터");
    setText(".project-card:nth-child(1) .project-summary", "실시간 트래픽을 캡처하고, 패킷 동작을 분석하며, 규칙 기반 탐지를 적용하고, 보안 경보를 기록하며, 실시간 Streamlit 대시보드를 통해 네트워크 활동을 시각화하는 Python 기반 네트워크 보안 모니터입니다.");
    setText(".project-card:nth-child(1) .project-proof", "패킷 검사, 네트워크 프로토콜 분석, 동작 기반 탐지 규칙, 지속적인 보고, 시각화, 자동화된 규칙 테스트를 보여 줍니다.");
    setText(".project-card:nth-child(2) .project-info h3", "포트 취약점 스캐너");
    setText(".project-card:nth-child(2) .project-summary", "허가된 대상에서 선택한 포트를 스캔하고, 노출된 서비스를 식별하며, 기본적인 보안 위험을 평가하고 권고 사항을 생성하는 Python 네트워킹 도구입니다.");
    setText(".project-card:nth-child(2) .project-proof", "Python 소켓 프로그래밍, 서비스 식별, 모듈형 프로그램 구조, 위험 분류, 보고서 생성을 보여 줍니다.");
    setText(".project-card:nth-child(3) .project-info h3", "로그 분석기");
    setText(".project-card:nth-child(3) .project-summary", "Apache 형식의 로그를 구문 분석해 로그인 실패 시도, 관리자 경로 접근, 반복되는 404 오류, 요청 활동, 의심스러운 동작과 같은 패턴을 식별하는 Python 로그 분석 도구입니다.");
    setText(".project-card:nth-child(3) .project-proof", "정규 표현식, 로그 구문 분석, 규칙 기반 분석, IP 활동 추적, 위험 분류, 보고서 생성을 보여 줍니다.");
    setText(".project-card .project-actions a:first-child", "데모 ↗");
    setAttribute('.project-card:nth-child(1) img:nth-child(1)', 'alt', '실시간 패킷 합계와 프로토콜 분포를 보여 주는 Streamlit 대시보드');
    setAttribute('.project-card:nth-child(1) img:nth-child(2)', 'alt', '프로토콜 분포, 현재 경보, 경보 기록을 보여 주는 네트워크 모니터 대시보드');
    setAttribute('.project-card:nth-child(1) img:nth-child(3)', 'alt', '네트워크 보안 모니터 자동 탐지 테스트가 통과된 터미널 화면');
    setAttribute('.project-card:nth-child(2) img:nth-child(1)', 'alt', '포트 스캐너 소스 코드');
    setAttribute('.project-card:nth-child(2) img:nth-child(2)', 'alt', '스캐너 대상 입력 화면');
    setAttribute('.project-card:nth-child(2) img:nth-child(3)', 'alt', '포트 취약점 보고서');
    setAttribute('.project-card:nth-child(2) img:nth-child(4)', 'alt', '저장된 포트 스캔 보고서');
    setAttribute('.project-card:nth-child(3) img:nth-child(1)', 'alt', '로그 분석기 및 위협 탐지기 Python 소스 코드');
    setAttribute('.project-card:nth-child(3) img:nth-child(2)', 'alt', 'Apache 형식의 로그 파일을 분석하는 터미널 화면');
    setAttribute('.project-card:nth-child(3) img:nth-child(3)', 'alt', '요청 활동, 로그인 실패, 404 오류, 관리자 접근을 요약한 터미널 보고서');
    setAttribute('.project-card:nth-child(3) img:nth-child(4)', 'alt', 'IP 요청 수를 보여 주는 저장된 로그 분석 보고서');

    setText(".services .eyebrow", "미술 아카이브");
    setHtml(".services .section-heading h2", "흑연 드로잉 (&amp;)<br />디지털 습작");
    setText(".services .section-heading > p", "예술은 보안에서 중요하게 여기는 인내, 관찰력, 정확성, 그리고 다른 사람이 지나치기 쉬운 세부 사항을 보는 힘을 길러 줍니다.");
    setList(".art-caption h3", ["인물 습작", "보안 주제 습작", "산악 풍경 습작", "건축 습작"]);
    setList(".art-caption p", ["인물의 성격, 명암, 표정을 탐구합니다.", "코드와 구조를 잉크의 감각으로 표현합니다.", "규모감, 분위기, 시선의 흐름을 연구합니다.", "구조, 고요함, 세부 묘사를 탐구합니다."]);

    setText(".testimonials .eyebrow", "목표");
    setHtml(".testimonials .section-heading h2", "내가 향하는 곳<br />그리고 그 이유");
    setAttribute(".testimonial-track", "aria-label", "목표 카드");
    setText(".goal-card:nth-child(1) h3", "윤리적 해커 및 침투 테스터");
    setText(".goal-card:nth-child(1) > p", "컴퓨터과학을 공부하고 Linux와 네트워킹 기초를 강화하며, 통제된 환경에서 연습하고 더 안전한 시스템을 만드는 데 도움이 되는 판단력을 기르겠습니다.");
    setText(".goal-card:nth-child(1) footer strong", "보안 분야");
    setText(".goal-card:nth-child(1) footer small", "윤리적 실습 · 깊이 있는 기초");
    setText(".goal-card:nth-child(2) h3", "제작을 통한 학습");
    setText(".goal-card:nth-child(2) > p", "방어형 프로젝트를 계속 만들고, 초급 실습 랩과 CTF에서 연습하며, 배운 내용을 기록하고, 각 프로젝트를 통해 기술 작업의 깊이를 더하겠습니다.");
    setText(".goal-card:nth-child(2) footer strong", "빌더 분야");
    setText(".goal-card:nth-child(2) footer small", "Python · 프로젝트 · 커뮤니티");
    setText(".drag-hint", "드래그 / 스크롤");

    setText(".contact .eyebrow", "연락하기");
    setHtml(".contact .section-heading h2", "함께 유용한 것을<br />만들어 봅시다.");
    setText(".contact .section-heading > p", "학습 기회, 협업, 프로젝트 피드백, 사이버보안이나 컴퓨터과학에 관한 대화를 언제든 환영합니다.");
    setText(".contact-card:nth-child(1) > span", "이메일");
    setText(".contact-card:nth-child(1) > b", "메일 보내기 ↗");
    setText(".contact-card:nth-child(2) > b", "코드 보기 ↗");
    setText(".contact-card:nth-child(3) > span", "위치");
    setText(".contact-card:nth-child(3) > strong", "인도 텔랑가나");
    setText(".contact-card:nth-child(3) > b", "온라인으로 연락 가능");
    setText('.contact-form label:nth-child(1) > span', '이름');
    setAttribute('.contact-form input[name="name"]', 'placeholder', '어떻게 불러 드릴까요?');
    setText('.contact-form label:nth-child(2) > span', '이메일');
    setText('.contact-form label:nth-child(3) > span', '메시지');
    setAttribute('.contact-form textarea', 'placeholder', '전하고 싶은 내용을 적어 주세요.');
    setText('.contact-form button', '메시지 보내기 ↗');
    setText('.contact-form > small', '메시지가 작성된 상태로 이메일 앱이 열립니다.');
    setText('.toast', '이메일 주소가 복사되었습니다');
  }

  function applyLanguage(language) {
    const isKorean = language === "ko";
    document.documentElement.lang = isKorean ? "ko" : "en";
    document.body.classList.toggle("lang-ko", isKorean);
    document.body.classList.toggle("lang-en", !isKorean);
    window.portfolioLanguage = isKorean ? "ko" : "en";
    window.portfolioCopy = isKorean ? koreanCopy : englishCopy;
    if (isKorean) applyKorean();
    else restoreEnglish();
    window.refreshPortfolioTranslations?.();
    updateLanguageToggle();
  }

  function updateLanguageToggle() {
    const toggle = qs(".language-toggle");
    if (!toggle) return;
    const isKorean = window.portfolioLanguage === "ko";
    toggle.dataset.active = isKorean ? "ko" : "en";
    toggle.setAttribute("aria-label", isKorean ? "영어로 전환" : "Switch to Korean");
  }

  function getVisibleTextElements() {
    const selector = "main,aside,.mobile-header,.mobile-menu";
    const containers = qsa(selector);
    const all = containers.flatMap(container => [container, ...qsa("*", container)]);
    const candidates = all.filter(element => {
      if (element.closest(".language-toggle,.cursor,.image-viewer")) return false;
      if (element.matches("script,style,input,textarea,video,img,svg,path,br,sup,.nav-label-clone,.button-label-clone")) return false;
      if (![...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim())) return false;
      return true;
    }).map(element => {
      if (element.matches(".text-word")) return element.closest("[data-text-reveal-ready]") || element;
      if (element.matches(".hero-letter")) return element.closest(".hero-word") || element;
      if (element.matches(".nav-label-primary")) return element.closest("[data-nav-roll-ready]") || element;
      if (element.matches(".button-label-primary")) return element.closest("[data-button-roll-ready]") || element;
      if (element.matches(".roll-line")) return element.closest("[data-roll-ready]") || element;
      if (element.matches(".mega-roll-line")) return element.parentElement || element;
      return element;
    });

    const unique = [...new Set(candidates)];
    return unique.filter(element => !unique.some(parent => parent !== element && parent.contains(element))).filter(element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const margin = 24;
      const intersectsViewport = rect.bottom > -margin && rect.top < innerHeight + margin && rect.right > -margin && rect.left < innerWidth + margin;
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > .02 && rect.width > 0 && rect.height > 0 && intersectsViewport;
    });
  }

  function getLanguageReelElements() {
    return getVisibleTextElements();
  }

  const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

  function animateLanguageReel(elements, direction) {
    const ordered = [...elements].sort((first, second) => {
      const firstRect = first.getBoundingClientRect();
      const secondRect = second.getBoundingClientRect();
      return firstRect.top - secondRect.top || firstRect.left - secondRect.left;
    });
    const outgoing = direction === "out";
    const duration = outgoing ? 260 : 440;
    const delayRange = outgoing ? 18 : 30;
    const easing = outgoing ? "cubic-bezier(.55,.06,.45,.94)" : "cubic-bezier(.16,1,.3,1)";
    const activeAnimations = [];
    const animations = ordered.map((element, index) => {
      const current = getComputedStyle(element);
      const restOpacity = current.opacity;
      const frames = outgoing
        ? [
            { translate:"0 0", opacity:restOpacity },
            { translate:"0 -.45em", opacity:0, offset:.72 },
            { translate:"0 -.7em", opacity:0 }
          ]
        : [
            { translate:"0 .55em", opacity:.32 },
            { translate:"0 .12em", opacity:restOpacity, offset:.5 },
            { translate:"0 -.04em", opacity:restOpacity, offset:.84 },
            { translate:"0 0", opacity:restOpacity }
          ];
      const animation = element.animate(frames, {
        duration,
        delay:(index / Math.max(1, ordered.length - 1)) * delayRange,
        easing,
        fill:"both"
      });
      activeAnimations.push(animation);
      return animation.finished.catch(() => undefined);
    });
    return Promise.all(animations).then(() => activeAnimations);
  }

  async function switchLanguage(language) {
    if (document.body.classList.contains("language-switching") || language === window.portfolioLanguage) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    qsa(".language-spin-item").forEach(element => element.classList.remove("language-spin-item"));
    const oldElements = getLanguageReelElements();
    const scrollYBefore = window.scrollY;
    document.body.classList.add("language-switching");

    if (!reduced) {
      const outgoingAnimations = await animateLanguageReel(oldElements, "out");

      applyLanguage(language);
      window.scrollTo(0, scrollYBefore);
      outgoingAnimations.forEach(animation => animation.cancel());
      const newElements = getLanguageReelElements();
      const incomingAnimations = await animateLanguageReel(newElements, "in");
      incomingAnimations.forEach(animation => animation.cancel());

      qsa(".language-spin-item").forEach(element => element.classList.remove("language-spin-item"));
      document.body.classList.remove("language-switching");
      window.dispatchEvent(new CustomEvent("portfolio:languagechange", { detail:{ language } }));
      window.ScrollTrigger?.refresh();
      return;
    }

    applyLanguage(language);
    window.scrollTo(0, scrollYBefore);
    const newElements = getVisibleTextElements();

    await wait(40);

    qsa(".language-spin-item").forEach(element => element.classList.remove("language-spin-item"));
    document.body.classList.remove("language-switching");
    window.dispatchEvent(new CustomEvent("portfolio:languagechange", { detail:{ language } }));
    window.ScrollTrigger?.refresh();
  }

  function loadPortfolio() {
    const script = document.createElement("script");
    script.src = "app.js?v=20260812-language-reel";
    script.onload = () => {
      window.removeEventListener("pointermove", trackGateCursor);
      document.body.classList.remove("language-pending");
      qs(".language-gate")?.remove();
      updateLanguageToggle();
    };
    script.onerror = () => {
      document.body.classList.remove("language-pending", "is-loading");
      qs(".language-gate")?.remove();
    };
    document.body.append(script);
  }

  let choosing = false;
  qsa("[data-language]").forEach(button => button.addEventListener("click", () => {
    if (choosing) return;
    choosing = true;
    applyLanguage(button.dataset.language);
    qs(".language-gate")?.classList.add("is-leaving");
    setTimeout(loadPortfolio, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 420);
  }));

  qs(".language-toggle")?.addEventListener("click", () => {
    const nextLanguage = window.portfolioLanguage === "ko" ? "en" : "ko";
    switchLanguage(nextLanguage);
  });

  requestAnimationFrame(() => qs('[data-language="en"]')?.focus());
})();

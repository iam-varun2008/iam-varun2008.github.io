(() => {
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const englishCopy = {
    previousScreenshot: "Previous project screenshot",
    nextScreenshot: "Next project screenshot",
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
    emailCopied: "이메일 주소가 복사되었습니다",
    readLess: "접기",
    readMore: "더 보기",
    mailSubject: name => `${name}님의 포트폴리오 문의`,
    mailFrom: "보낸 사람",
    mailEmail: "이메일"
  };

  const setHtml = (selector, value) => qsa(selector).forEach(element => { element.innerHTML = value; });
  const setText = (selector, value) => qsa(selector).forEach(element => { element.textContent = value; });
  const setList = (selector, values) => qsa(selector).forEach((element, index) => {
    if (values[index] !== undefined) element.textContent = values[index];
  });
  const setOwnTextList = (selector, values) => qsa(selector).forEach((element, index) => {
    if (values[index] === undefined) return;
    [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => node.remove());
    element.append(document.createTextNode(` ${values[index]}`));
  });
  const setAttribute = (selector, name, value) => qsa(selector).forEach(element => element.setAttribute(name, value));

  function applyKorean() {
    const nav = ["홈", "소개", "프로젝트", "아트", "목표", "연락처"];
    document.documentElement.lang = "ko";
    document.title = "사이버보안 포트폴리오 — 바룬®";
    setAttribute('meta[name="description"]', "content", "사이버보안 학습자이자 Python 개발자, 흑연 드로잉 작가인 바룬의 포트폴리오입니다.");
    setHtml(".language-mark,.brand-chip", "바룬<sup>®</sup>");
    setText(".hero-word,.loader-word", "바룬");
    setHtml(".footer-word", "바룬<sup>®</sup>");
    setText(".cursor span", "보기");
    setText(".mobile-header .call-chip", "문의하기");
    setAttribute(".menu-button", "aria-label", "메뉴 열기");
    setAttribute(".sidebar", "aria-label", "포트폴리오 내비게이션");
    setAttribute(".socials a:first-child", "aria-label", "바룬의 GitHub");
    setAttribute(".socials a:last-child", "aria-label", "바룬에게 이메일 보내기");
    setText(".side-intro > p", "실용적인 Python 도구를 만들고 윤리적 보안을 배우며 흑연 드로잉에서 영감을 받은 작업을 하는 사이버보안 학습자입니다.");
    setHtml(".side-projects-target span", "<b>보안</b> 프로젝트");
    setHtml(".side-years-target span", "인증된<br />수료증");
    setList(".side-label", nav);
    setList(".hero-nav a", nav);
    setOwnTextList(".mobile-menu nav a", nav);
    setList(".skill-marquee span", ["Python", "Linux", "보안", "아트", "Python", "Linux", "보안", "아트"]);
    setAttribute(".client-strip", "aria-label", "기술: Python, Linux, 보안, 아트");
    setText(".book-button", "문의하기");

    setHtml(".hero-kicker", "보안을 만드는 사람.<br />바로 바룬입니다.");
    setAttribute(".hero-photo", "alt", "바룬");
    setHtml(".hero-title h1", "<span>보안을,</span><span>실전에</span><span>적용하다.</span>");
    setText(".hero-actions a:first-child", "문의하기");
    setText(".hero-actions a:last-child", "소개 보기");
    setHtml(".projects-stat span", "<b>보안</b> 프로젝트");
    setHtml(".years-stat span", "인증된<br />수료증");
    setOwnTextList(".traits-card > span", ["창의적", "신뢰할 수 있는", "전략적", "실행하는 사람", "효율적"]);
    setText(".hero-copy", "Python으로 방어형 보안 도구를 만들며 네트워킹, Linux, 윤리적 해킹, 위협 탐지를 학습하고 있습니다.");
    setText(".scroll-note span", "스크롤하여 둘러보기");

    setText(".about .eyebrow", "학습 · 제작 · 보안");
    setHtml(".about .section-heading h2", "나에 대해 (&amp;)<br />나의 여정");
    setText(".about .section-heading > p", "학업 성과와 검증된 과정들은 사이버보안을 향해 한 걸음씩 실천해 온 제 여정을 보여 줍니다.");
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
    setText(".timeline-card:nth-of-type(4) > p", "Harvard University의 CS50에서 제공하는 Python 프로그래밍 입문 과정입니다.");
    setHtml(".timeline-card:nth-of-type(4) .card-meta > span", "Python 프로그래밍<br /><em>인증된 과정</em>");
    setText(".timeline-card:nth-of-type(5) h3", "프리 시큐리티 과정");
    setText(".timeline-card:nth-of-type(5) > p", "컴퓨터, 네트워킹, 웹, 보안의 핵심 기초를 다루는 TryHackMe 프리 시큐리티 학습 경로입니다.");
    setHtml(".timeline-card:nth-of-type(5) .card-meta > span", "TryHackMe 프리 시큐리티<br /><em>인증된 과정</em>");
    setText(".certificate-link", "수료증 보기 ↗");

    setText(".work-intro .eyebrow", "선정 프로젝트");
    setHtml(".work-intro h2", "탐지하도록 만들고,<br />이해하도록 설계하다");
    setText(".work-intro > p", "제가 학습하는 방식을 보여 주는 세 가지 프로젝트입니다. 도구를 만들고, 허가된 환경에서 테스트하고, 결과를 문서화해 누구나 쉽게 살펴볼 수 있게 했습니다.");
    setAttribute(".project-card:nth-child(1) .project-gallery", "aria-label", "로그 분석기 스크린샷");
    setAttribute(".project-card:nth-child(2) .project-gallery", "aria-label", "포트 취약점 스캐너 스크린샷");
    setList(".project-card:nth-child(1) .project-tags span", ["01", "Python", "로그", "방어"]);
    setList(".project-card:nth-child(2) .project-tags span", ["02", "Python", "네트워크", "위험"]);
    setList(".project-card:nth-child(3) .project-tags span", ["03", "HTML", "CSS", "모션"]);
    setText(".project-card:nth-child(1) .project-info h3", "로그 분석기");
    setText(".project-card:nth-child(1) .project-info p", "Apache 형식의 로그를 구문 분석해 로그인 실패, 관리자 접근, 404 오류, 요청 수, 의심스러운 활동을 보고합니다.");
    setText(".project-card:nth-child(2) .project-info h3", "포트 취약점 스캐너");
    setText(".project-card:nth-child(2) .project-info p", "허가된 대상의 포트를 스캔하고 노출된 서비스를 식별하며, 기본 위험을 분석해 실행 가능한 권고 사항을 생성합니다.");
    setText(".project-card:nth-child(3) .project-info h3", "바룬 포트폴리오");
    setText(".project-card:nth-child(3) .project-info p", "사이버보안 프로젝트, 학업 성과, 수료증, 목표, 예술 작업을 모션 중심으로 구성한 개인 포트폴리오입니다.");
    setText(".project-card:nth-child(1) .project-actions a:first-child,.project-card:nth-child(2) .project-actions a:first-child", "데모 ↗");
    setText(".project-card:nth-child(3) .project-actions a:first-child", "라이브 ↗");
    setAttribute('.project-card:nth-child(1) img:nth-child(1)', 'alt', '로그 분석기 소스 코드');
    setAttribute('.project-card:nth-child(1) img:nth-child(2)', 'alt', '로그 분석기 실행 화면');
    setAttribute('.project-card:nth-child(1) img:nth-child(3)', 'alt', '터미널의 로그 분석 보고서');
    setAttribute('.project-card:nth-child(1) img:nth-child(4)', 'alt', '저장된 로그 분석 보고서');
    setAttribute('.project-card:nth-child(2) img:nth-child(1)', 'alt', '포트 스캐너 소스 코드');
    setAttribute('.project-card:nth-child(2) img:nth-child(2)', 'alt', '스캐너 대상 입력 화면');
    setAttribute('.project-card:nth-child(2) img:nth-child(3)', 'alt', '포트 취약점 보고서');
    setAttribute('.project-card:nth-child(2) img:nth-child(4)', 'alt', '저장된 포트 스캔 보고서');
    setAttribute('.project-card:nth-child(3) img', 'alt', '바룬 포트폴리오 메인 화면');

    setHtml(".journey h2", "깊이 배우고<br />명확하게 만들며<br /><span>윤리적으로 시험하고</span><br /><span>계속 성장합니다</span>");
    setText(".journey-inner > p", "방향은 분명합니다. 기초를 탄탄히 익히고, 유용한 방어형 도구를 만들며, 허가된 환경에서만 실습하고, 모든 프로젝트를 성장의 증거로 남기겠습니다.");
    setText(".talk-orbit > span", "소통하고 싶으신가요?");
    setText(".talk-orbit > strong", "이야기해요 ↗");

    setText(".services .eyebrow", "미술 아카이브");
    setHtml(".services .section-heading h2", "흑연 드로잉 (&amp;)<br />디지털 습작");
    setText(".services .section-heading > p", "예술은 보안에서 중요하게 여기는 인내, 관찰력, 정확성, 그리고 다른 사람이 지나치기 쉬운 세부 사항을 보는 힘을 길러 줍니다.");
    setList(".art-caption h3", ["인물 습작", "보안 주제 습작", "산악 풍경 습작", "건축 습작"]);
    setList(".art-caption p", ["인물의 성격, 명암, 표정을 탐구합니다.", "코드와 구조를 잉크의 감각으로 표현합니다.", "규모감, 분위기, 시선의 흐름을 연구합니다.", "구조, 고요함, 세부 묘사를 탐구합니다."]);

    setText(".testimonials .eyebrow", "목표");
    setHtml(".testimonials .section-heading h2", "내가 향하는 곳<br />그리고 그 이유");
    setAttribute(".testimonial-track", "aria-label", "목표 카드");
    setText(".goal-card:nth-child(1) h3", "윤리적 해커이자 침투 테스트 전문가가 되기.");
    setText(".goal-card:nth-child(1) > p", "컴퓨터과학을 공부하고 Linux와 네트워킹 역량을 강화하며, 통제된 실습 환경에서 연습해 더 안전한 시스템 구축에 필요한 판단력을 기르겠습니다.");
    setText(".goal-card:nth-child(1) footer strong", "보안 분야");
    setText(".goal-card:nth-child(1) footer small", "윤리적 실습 · 깊이 있는 기초");
    setText(".goal-card:nth-child(2) h3", "실제 문제를 해결하는 도구를 만들며 배우기.");
    setText(".goal-card:nth-child(2) > p", "방어형 보안 프로젝트를 계속 확장하고, 초급 CTF에 참여하며, 배운 내용을 문서화해 다른 학습자도 이해할 수 있는 작업을 만들겠습니다.");
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
  }

  function loadPortfolio() {
    const script = document.createElement("script");
    script.src = "app.js?v=20260809-handoff10";
    script.onload = () => {
      document.body.classList.remove("language-pending");
      qs(".language-gate")?.remove();
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

  requestAnimationFrame(() => qs('[data-language="en"]')?.focus());
})();

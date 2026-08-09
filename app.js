const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

history.scrollRestoration = "manual";
window.scrollTo(0, 0);
document.body.classList.add("is-loading");

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasMotion = Boolean(window.gsap && window.ScrollTrigger);
let lenis = null;

qsa("[data-word-reveal]").forEach(element => {
  const words = element.textContent.trim().split(/\s+/);
  element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");
});

const journeyHeading = qs(".journey h2");
if (journeyHeading) {
  journeyHeading.innerHTML = journeyHeading.innerHTML.split(/<br\s*\/?>/i).map(line => `<span class="journey-line">${line}</span>`).join("");
}

function prepareRollingLines(element) {
  if (!element || element.dataset.rollReady) return;
  const lines = element.innerHTML.split(/<br\s*\/?>/i);
  element.dataset.rollReady = "true";
  element.setAttribute("aria-label", element.innerText.trim().replace(/\s+/g, " "));
  element.innerHTML = lines.map(line => `<span class="roll-line-mask"><span class="roll-line" aria-hidden="true">${line.trim()}</span></span>`).join("");
}

qsa(".about .section-heading h2,.work-intro h2,.services .section-heading h2,.testimonials .section-heading h2,.contact .section-heading h2,.timeline-card h3").forEach(prepareRollingLines);

qsa(".mega-title > span").forEach(line => {
  line.classList.add("roll-line-mask");
  line.innerHTML = `<span class="mega-roll-line" aria-hidden="true">${line.innerHTML}</span>`;
});

function prepareNavigationLabel(element) {
  if (!element || element.dataset.navRollReady) return;
  const text = element.textContent.trim();
  element.dataset.navRollReady = "true";
  element.setAttribute("aria-label", text);
  element.innerHTML = `<span class="nav-label-mask" aria-hidden="true"><span class="nav-label-primary">${text}</span><span class="nav-label-clone">${text}</span></span>`;
}

qsa(".hero-nav a,.side-label").forEach(prepareNavigationLabel);

function prepareButtonRoll(element) {
  if (!element || element.dataset.buttonRollReady) return;
  const text = element.textContent.trim();
  element.dataset.buttonRollReady = "true";
  element.setAttribute("aria-label", text);
  element.innerHTML = `<span class="button-label-mask" aria-hidden="true"><span class="button-label-primary">${text}</span><span class="button-label-clone">${text}</span></span>`;
}

qsa(".book-button,.call-chip,.hero-actions a:first-child,.contact-form button,.certificate-link").forEach(prepareButtonRoll);

qsa(".project-gallery").forEach(gallery => {
  const images = qsa("img", gallery);
  if (!images.length) return;
  let activeIndex = 0;
  const showImage = index => {
    activeIndex = (index + images.length) % images.length;
    images.forEach((image, imageIndex) => image.classList.toggle("is-active", imageIndex === activeIndex));
  };
  showImage(0);
  if (images.length < 2) return;
  gallery.classList.add("has-controls");
  gallery.insertAdjacentHTML("beforeend", `<button class="gallery-control gallery-prev" type="button" aria-label="Previous project screenshot">←</button><button class="gallery-control gallery-next" type="button" aria-label="Next project screenshot">→</button><span class="gallery-count" aria-live="polite">01 / 0${images.length}</span>`);
  const count = qs(".gallery-count", gallery);
  const step = direction => {
    showImage(activeIndex + direction);
    count.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
  };
  qs(".gallery-prev", gallery).addEventListener("click", event => { event.stopPropagation(); step(-1); });
  qs(".gallery-next", gallery).addEventListener("click", event => { event.stopPropagation(); step(1); });
});

function rollNavigationLabel(link) {
  if (!hasMotion || reduceMotion || !link) return;
  const primary = qs(".nav-label-primary", link);
  const clone = qs(".nav-label-clone", link);
  if (!primary || !clone) return;
  gsap.killTweensOf([primary, clone]);
  gsap.set(primary, { yPercent:0 });
  gsap.set(clone, { yPercent:110 });
  gsap.timeline({ defaults:{ duration:.42, ease:"power2.inOut", overwrite:true } })
    .to(primary, { yPercent:-110 }, 0)
    .to(clone, { yPercent:0 }, 0)
    .set([primary, clone], { clearProps:"transform" });
}

function startSmoothScroll() {
  if (reduceMotion || !window.Lenis || innerWidth <= 900) return;

  lenis = new Lenis({
    duration: .4,
    lerp: .1,
    easing: value => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
    smoothWheel: true
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  qsa('a[href^="#"]').forEach(link => link.addEventListener("click", event => {
    const target = qs(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, { offset: 0, duration: 1.25 });
  }));
}

function playIntro() {
  const loader = qs(".loader");
  const loaderWord = qs(".loader-word");
  const heroWord = qs(".hero-word");
  const photo = qs(".hero-photo");
  const title = qs(".hero-title");
  const actions = qs(".hero-actions");
  const navs = qsa(".hero-nav");
  const navLabels = qsa(".hero-nav .nav-label-primary");
  const navClones = qsa(".hero-nav .nav-label-clone");
  const navSeparators = qsa(".hero-nav i");
  const stats = qsa(".stat-card");
  const traits = qs(".traits-card");
  const finalCopy = [qs(".hero-kicker"), qs(".hero-copy")].filter(Boolean);
  const scrollNote = qs(".scroll-note");

  if (!hasMotion || reduceMotion) {
    loader?.remove();
    document.body.classList.remove("is-loading");
    document.body.classList.add("intro-complete");
    createMotionScenes();
    return;
  }

  gsap.set(loader, { autoAlpha: 1, yPercent: 0 });
  gsap.set(loaderWord, { x: "100vw", y: 0, yPercent: 0, scale: 1, autoAlpha: 0 });
  gsap.set(heroWord, { x: "9vw", y: 0, scale: 1, autoAlpha: 0 });
  gsap.set(photo, { xPercent: innerWidth <= 900 ? -50 : 0, yPercent: 14, scale: .88, filter: "blur(20px)", autoAlpha: 0 });
  gsap.set(title, { y: 24, scale: .9, filter: "blur(10px)", autoAlpha: 0 });
  gsap.set(actions, { y: 9, autoAlpha: 0 });
  gsap.set(navs, { y:0, autoAlpha:1 });
  gsap.set(navLabels, { yPercent:125 });
  gsap.set(navClones, { yPercent:125 });
  gsap.set(navSeparators, { autoAlpha:0 });
  gsap.set(stats, { y: 22, scale: .96, autoAlpha: 0 });
  gsap.set(traits, { x: 16, autoAlpha: 0 });
  gsap.set(finalCopy, { y: 10, autoAlpha: 0 });
  gsap.set(scrollNote, { autoAlpha: 0 });

  const intro = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      loader?.remove();
      document.body.classList.remove("is-loading");
      document.body.classList.add("intro-complete");
      createMotionScenes();
      startSmoothScroll();
      ScrollTrigger.refresh();
    }
  });

  intro
    .to(loaderWord, { x: 0, autoAlpha: 1, duration: 1, ease: "power3.inOut" }, .2)
    .set(heroWord, { x: 0, autoAlpha: 1 }, 1.4)
    .to(loader, { autoAlpha: 0, duration: .2, ease: "power1.out" }, 1.4)
    .to(photo, { yPercent: 0, scale: 1, filter: "blur(0px)", autoAlpha: 1, duration: 1.1, ease: "power2.out" }, 1.4)
    .to(title, { y: 0, scale: 1, filter: "blur(0px)", autoAlpha: 1, duration: 1, ease: "power2.out" }, 1.7)
    .to(navLabels, { yPercent:0, duration:.72, stagger:.065, ease:"power3.out", onComplete:() => gsap.set([navLabels, navClones], { clearProps:"transform" }) }, 2)
    .to(navSeparators, { autoAlpha:1, duration:.24, stagger:.025, ease:"power1.out" }, 2.18)
    .to(stats, { y: 0, scale: 1, autoAlpha: 1, duration: .9, stagger: .1, ease: "power2.out" }, 2)
    .to(traits, { x: 0, autoAlpha: 1, duration: .9, ease: "power2.out" }, 2)
    .to(actions, { y: 0, autoAlpha: 1, duration: .8, ease: "power2.out" }, 2.65)
    .to(finalCopy, { y: 0, autoAlpha: 1, duration: .7, stagger: .1, ease: "power2.out" }, 3.05)
    .to(scrollNote, { autoAlpha: 1, duration: .45 }, 3.35);
}

function createMotionScenes() {
  if (!hasMotion || reduceMotion) return;
  gsap.registerPlugin(ScrollTrigger);

  const hero = qs(".hero");
  const heroWord = qs(".hero-word");
  const heroPhoto = qs(".hero-photo");
  const heroTitle = qs(".hero-title");
  const heroNavs = qsa(".hero-nav");
  const heroStats = qsa(".stat-card");
  const heroTraits = qs(".traits-card");
  const sidebar = qs(".sidebar");
  const work = qs(".work");
  const projectTrack = qs(".project-track");
  const projectCards = qsa(".project-card");

  ScrollTrigger.matchMedia({
    "(min-width: 901px)": () => {
      const rect = element => element?.getBoundingClientRect();
      const sidePanels = qsa(".sidebar > *");
      const morphPairs = [
        [heroWord, qs(".side-logo-target"), .055, .24],
        [qs(".projects-stat"), qs(".side-projects-target"), .085, .21],
        [qs(".years-stat"), qs(".side-years-target"), .1, .21],
        [qs(".hero-actions a:first-child"), qs(".book-button"), .15, .2]
      ];
      qsa(".hero-nav a").forEach(link => {
        const target = qs(`.side-nav a[href="${link.getAttribute("href")}"] .side-label`);
        if (target) morphPairs.push([link, target, .075, .22]);
      });
      const morphGeometry = morphPairs.filter(pair => pair[0] && pair[1]).map(([source, target, at, duration]) => {
        const from = rect(source);
        const to = rect(target);
        return { source, target, at, duration, x:to.left-from.left, y:to.top-from.top, scaleX:to.width/from.width, scaleY:to.height/from.height };
      });
      const morphTargets = morphGeometry.map(item => item.target);
      const sideEarlyDetails = qsa(".side-nav .nav-icon,.client-strip,.email-copy");
      const sideLateDetails = qsa(".side-intro p,.socials");

      gsap.set(sidebar, { xPercent: 0, autoAlpha: 1, pointerEvents:"none" });
      gsap.set(sidePanels, { y:12, autoAlpha:0 });
      gsap.set(morphTargets, { autoAlpha:0 });
      gsap.set([...sideEarlyDetails, ...sideLateDetails], { autoAlpha:0 });

      const heroTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom bottom",
          scrub: .55,
          invalidateOnRefresh: true
        }
      });
      const heroClock = { progress:0 };
      heroTimeline.to(heroClock, { progress:1, duration:1, ease:"none" }, 0);

      heroTimeline
        .to([qs(".hero-kicker"), qs(".hero-copy"), qs(".scroll-note")], { yPercent: -100, autoAlpha: 0, duration: .05 }, .05)
        .to(qsa(".hero-nav i"), { autoAlpha: 0, duration: .04 }, .01)
        .to(heroTraits, { x: "-25vw", y: "-5vw", scale: .3, autoAlpha: 0, duration: .15, ease:"power1.inOut" }, .05)
        .to(heroPhoto, { y: "23vh", scale: 2.12, filter: "blur(90px)", autoAlpha:.3, duration: .67 }, .03)
        .to(heroTitle, { x: "38vw", y: "-40vh", scale: .58, filter:"blur(18px)", autoAlpha:0, duration: .37, ease:"power1.inOut" }, .08)
        .to(qs(".hero-actions a:last-child"), { y:20, autoAlpha:0, duration:.16 }, .18)
        .to(sidePanels, { y:0, autoAlpha:1, duration:.1, stagger:.008, ease:"power1.out" }, .22)
        .to(sideEarlyDetails, { autoAlpha:1, duration:.05, stagger:.006 }, .29)
        .to(sideLateDetails, { autoAlpha:1, duration:.08, stagger:.01 }, .62)
        .set(sidebar, { pointerEvents:"auto" }, .42);

      morphGeometry.forEach(item => {
        const handoff = item.at + item.duration;
        heroTimeline.to(item.source, {
          x:item.x, y:item.y, scaleX:item.scaleX, scaleY:item.scaleY, transformOrigin:"left top", duration:item.duration, ease:"power1.inOut"
        }, item.at)
          .set(item.target, { autoAlpha:1 }, handoff)
          .set(item.source, { autoAlpha:0 }, handoff);
      });

      const maxProjectShift = () => Math.max(0, projectTrack.scrollWidth - (innerWidth - 255) + 68);
      gsap.set(projectCards, { yPercent: 10, scale:.6, autoAlpha: 0 });
      gsap.to(projectCards.slice(0, 2), {
        yPercent:0, scale:1, autoAlpha:1, duration:1.1, stagger:.1, ease:"expo.out",
        scrollTrigger:{ trigger:work, start:"top 80%", once:true }
      });
      const workTween = gsap.to(projectTrack, {
        x: () => -maxProjectShift(), ease:"none",
        scrollTrigger:{
          trigger:work,
          start:"top top",
          end:() => `+=${Math.max(innerHeight, work.offsetHeight - innerHeight * 1.75)}`,
          scrub:1,
          invalidateOnRefresh:true
        }
      });
      projectCards.slice(2).forEach(card => gsap.to(card, {
        yPercent:0, scale:1, autoAlpha:1, duration:1.1, ease:"expo.out",
        scrollTrigger:{ trigger:card, containerAnimation:workTween, start:"left 92%", once:true }
      }));

      return () => {
        heroTimeline.kill();
        workTween.kill();
      };
    },
    "(max-width: 900px)": () => {
      gsap.set([".hero-word", ".hero-title", ".stat-card", ".traits-card", ".hero-kicker"], { clearProps: "transform,opacity,visibility,filter" });
      gsap.set(".hero-photo", { xPercent: -50, yPercent: 0, scale: 1, autoAlpha: 1, filter: "drop-shadow(0 20px 30px rgba(0,0,0,.18))" });
      gsap.set(projectCards, { clearProps: "transform,opacity,visibility" });
    }
  });

  const timelinePath = qs(".timeline:not([hidden]) .timeline-path");
  if (timelinePath) {
    gsap.fromTo(timelinePath, { clipPath:"inset(0 0 100% 0)" }, {
      clipPath:"inset(0 0 0% 0)",
      ease: "none",
      scrollTrigger: { trigger: ".timeline", start: "top 82%", end: "bottom 35%", scrub: .75 }
    });
  }

  const timelineDots = qsa(".timeline:not([hidden]) .timeline-dots circle");
  gsap.set(timelineDots, { scale:0, autoAlpha:0 });
  qsa(".timeline:not([hidden]) .timeline-card").forEach((card, index) => {
    gsap.fromTo(card,
      { yPercent:15, scale:.65, autoAlpha:0 },
      { yPercent:0, scale:1, autoAlpha:1, ease:"none", scrollTrigger:{ trigger:card, start:"top 102%", end:"top 84%", scrub:.55 } }
    );
    gsap.fromTo(qsa(".roll-line", card), { yPercent:105 }, {
      yPercent:0,
      duration:.6,
      delay:.22,
      ease:"expo.out",
      scrollTrigger:{ trigger:card, start:"top 92%", once:true }
    });
    if (timelineDots[index]) gsap.to(timelineDots[index], { scale:1, autoAlpha:1, duration:.45, ease:"back.out(2)", scrollTrigger:{ trigger:card, start:"top 90%", once:true } });
  });

  const genericReveals = qsa(".reveal").filter(item => !item.matches(".timeline-card,.overview-copy,.mega-title,.service-card") && !item.querySelector(".roll-line"));
  genericReveals.forEach((item, index) => {
    gsap.fromTo(item,
      { y: 48 + (index % 3) * 5, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration:.7, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 90%", once:true } }
    );
  });

  const megaLines = qsa(".mega-roll-line");
  if (megaLines.length) {
    gsap.fromTo(megaLines, { yPercent: 105 }, {
      yPercent: 0,
      stagger: .12,
      ease: "none",
      scrollTrigger: { trigger: ".overview", start: "top 84%", end: "top 34%", scrub: .62 }
    });
  }

  const rollingTitles = [
    { heading:qs(".about .section-heading h2"), trigger:qs(".about"), start:"top 90%", extras:qsa(".about .section-heading > :not(h2)") },
    { heading:qs(".work-intro h2"), trigger:qs(".work-sticky"), start:"top 80%", extras:qsa(".work-intro .eyebrow,.work-intro > p") },
    { heading:qs(".services .section-heading h2"), trigger:qs(".services .section-heading"), start:"top 94%", end:"top 48%", scrub:.58, extras:qsa(".services .section-heading > :not(h2)") },
    { heading:qs(".testimonials .section-heading h2"), trigger:qs(".testimonials .section-heading"), start:"top 90%", extras:qsa(".testimonials .section-heading > :not(h2)") },
    { heading:qs(".contact .section-heading h2"), trigger:qs(".contact .section-heading"), start:"top 90%", extras:qsa(".contact .section-heading > :not(h2)") }
  ];

  rollingTitles.forEach(({ heading, trigger, start, end, scrub, extras }) => {
    if (!heading || !trigger) return;
    gsap.fromTo(qsa(".roll-line", heading), { yPercent:110, rotate:3, filter:"blur(3px)" }, {
      yPercent:0,
      rotate:0,
      filter:"blur(0px)",
      duration:.78,
      stagger:.1,
      delay:.22,
      ease:"expo.out",
      scrollTrigger:{ trigger, start, end:end || "top 55%", scrub:scrub || false, once:!scrub }
    });
    gsap.fromTo(extras, { y:18, autoAlpha:0 }, {
      y:0,
      autoAlpha:1,
      duration:.55,
      stagger:.06,
      delay:.35,
      ease:"power2.out",
      scrollTrigger:{ trigger, start, once:true }
    });
  });

  const overviewWords = qsa(".overview-copy .word");
  if (overviewWords.length) {
    gsap.fromTo(overviewWords, { y:12, autoAlpha:.55, filter:"blur(.6px)" }, {
      y: 0,
      autoAlpha: 1,
      filter:"blur(0px)",
      duration:.5,
      stagger:.012,
      ease: "none",
      scrollTrigger:{ trigger:".overview-copy", start:"top 72%", end:"top 36%", scrub:.35 }
    });
  }

  gsap.fromTo(".service-card", { y:70, autoAlpha:0 }, {
    y: 0,
    autoAlpha: 1,
    stagger: .08,
    duration:.9,
    ease: "expo.out",
    scrollTrigger: { trigger: ".service-grid", start: "top 90%", once:true }
  });

  gsap.fromTo(".talk-orbit", { y: 70, scale: .82, autoAlpha: 0 }, {
    y: 0,
    scale: 1,
    autoAlpha: 1,
    ease: "none",
    scrollTrigger: { trigger: ".journey", start: "top 70%", end: "center 48%", scrub: .55 }
  });

  gsap.fromTo(".journey-line", { yPercent:115, autoAlpha:0, rotate:2, filter:"blur(7px)", clipPath:"inset(0 0 100% 0)" }, {
    yPercent:0, autoAlpha:1, rotate:0, filter:"blur(0px)", clipPath:"inset(0 0 0% 0)", stagger:.12, duration:1, ease:"none",
    scrollTrigger:{ trigger:".journey h2", start:"top 94%", end:"bottom 52%", scrub:.62 }
  });
  gsap.fromTo(".journey-inner > p", { y:35, autoAlpha:0 }, { y:0, autoAlpha:1, duration:.8, ease:"power3.out", scrollTrigger:{ trigger:".journey-inner > p", start:"top 90%", once:true } });

  gsap.fromTo(".quote-card", { yPercent:10, scale:.7, autoAlpha:0 }, {
    yPercent:0, scale:1, autoAlpha:1, stagger:.09, duration:1, ease:"expo.out",
    scrollTrigger:{ trigger:".testimonial-track", start:"top 88%", once:true }
  });

  gsap.fromTo(".contact-card,.contact-form", { y:30, autoAlpha:0 }, {
    y:0, autoAlpha:1, stagger:.055, duration:.65, ease:"power3.out",
    scrollTrigger:{ trigger:".faq-grid", start:"top 88%", once:true }
  });

  if (work && sidebar) {
    ScrollTrigger.create({
      trigger: work,
      start: "top 45%",
      end: "bottom 55%",
      onToggle: self => sidebar.classList.toggle("dark", self.isActive)
    });
  }

  const sections = qsa("main section[id], footer[id]");
  const navLinks = qsa(".side-nav a");
  let activeSectionId = null;
  sections.forEach(section => ScrollTrigger.create({
    trigger: section,
    start: "top 48%",
    end: "bottom 48%",
    onToggle: self => {
      if (!self.isActive) return;
      const id = section.id === "webflow_journey" ? "services" : section.id;
      navLinks.forEach(link => link.classList.toggle("active", link.dataset.section === id));
      if (id !== activeSectionId) {
        activeSectionId = id;
        rollNavigationLabel(navLinks.find(link => link.dataset.section === id));
      }
    }
  }));

  window.__motionDebug = { lenis, ScrollTrigger, refresh: () => ScrollTrigger.refresh() };
}

const menuButton = qs(".menu-button");
const mobileMenu = qs(".mobile-menu");
menuButton?.addEventListener("click", () => {
  const open = !mobileMenu.classList.contains("open");
  mobileMenu.classList.toggle("open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  menuButton.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
});
qsa(".mobile-menu a").forEach(link => link.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden", "true");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}));


const toast = qs(".toast");
qs(".email-copy")?.addEventListener("click", async event => {
  try {
    await navigator.clipboard.writeText(event.currentTarget.dataset.copy);
    toast.textContent = "Email copied";
  } catch {
    toast.textContent = "2008.varunreddy@gmail.com";
  }
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1600);
});

qsa(".read-more").forEach(button => button.addEventListener("click", () => {
  const card = button.closest(".timeline-card");
  const open = card.classList.toggle("open");
  button.textContent = open ? "Read less" : "Read more";
  setTimeout(() => ScrollTrigger?.refresh(), 480);
}));

const slider = qs(".testimonial-track");
const sliderProgress = qs(".slider-progress i");
let dragging = false;
let dragStart = 0;
let scrollStart = 0;
slider?.addEventListener("pointerdown", event => {
  dragging = true;
  slider.setPointerCapture(event.pointerId);
  dragStart = event.clientX;
  scrollStart = slider.scrollLeft;
});
slider?.addEventListener("pointermove", event => {
  if (dragging) slider.scrollLeft = scrollStart - (event.clientX - dragStart);
});
slider?.addEventListener("pointerup", () => dragging = false);
slider?.addEventListener("pointercancel", () => dragging = false);
slider?.addEventListener("scroll", () => {
  const range = slider.scrollWidth - slider.clientWidth;
  const progress = range > 0 ? slider.scrollLeft / range : 0;
  if (sliderProgress) sliderProgress.style.transform = `scaleX(${.15 + progress * .85})`;
}, { passive: true });

const cursor = qs(".cursor");
if (cursor && matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", event => {
    gsap.to(cursor, { left: event.clientX, top: event.clientY, duration: .18, overwrite: "auto", ease: "power2.out" });
  });

  if (matchMedia("(pointer:fine)").matches) {
    qsa(".timeline-card,.project-card,.art-card,.goal-card,.contact-card").forEach(card => {
      const layers = qsa(":scope > *", card).filter(layer => !layer.classList.contains("gallery-control"));
      card.addEventListener("pointermove", event => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        gsap.to(layers, { x:x * 9, y:y * 9, rotateX:-y * 3, rotateY:x * 3, transformPerspective:900, duration:.38, ease:"power2.out", overwrite:true });
      });
      card.addEventListener("pointerleave", () => gsap.to(layers, { x:0, y:0, rotateX:0, rotateY:0, duration:.65, ease:"expo.out", overwrite:true }));
    });
  }
  qsa(".cursor-target").forEach(item => {
    item.addEventListener("mouseenter", () => cursor.classList.add("is-view"));
    item.addEventListener("mouseleave", () => cursor.classList.remove("is-view"));
  });
}

qsa(".faq details").forEach(detail => detail.addEventListener("toggle", () => {
  if (!detail.open) return;
  qsa(".faq details").forEach(other => { if (other !== detail) other.open = false; });
}));

qs("#contact-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:2008.varunreddy@gmail.com?subject=${subject}&body=${body}`;
});

const begin = () => document.fonts.ready.then(playIntro);
if (document.readyState === "complete") begin();
else window.addEventListener("load", begin, { once: true });

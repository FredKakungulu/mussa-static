/**
 * MUSSA site config — replace social URLs when you have the live links.
 * Apex (mussaelections.com) = this static site; vote.* = OVS.
 */
const SITE = {
  votingBoothUrl: "https://vote.mussaelections.com/auth/voter-login/",
  social: {
    facebook: "#",
    instagram: "#",
    x: "#",
    linkedin: "#",
    whatsapp: "#",
    youtube: "#",
  },
};

const SOCIAL_LABELS = {
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X (Twitter)",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
  youtube: "YouTube",
};

function applyVotingBoothLinks() {
  document.querySelectorAll("[data-voting-booth]").forEach((el) => {
    if (el.tagName === "A") {
      el.setAttribute("href", SITE.votingBoothUrl);
      if (SITE.votingBoothUrl !== "#") {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    }
  });
}

function applySocialLinks() {
  document.querySelectorAll("[data-social]").forEach((el) => {
    const key = el.getAttribute("data-social");
    const url = SITE.social[key];
    if (!url || el.tagName !== "A") return;

    el.setAttribute("href", url);
    el.setAttribute("aria-label", SOCIAL_LABELS[key] || key);

    if (url !== "#") {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    } else {
      el.addEventListener("click", (event) => {
        event.preventDefault();
      });
    }
  });
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  const closeNav = () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 861px)").matches) closeNav();
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

function initCurrentNav() {
  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".site-nav a[href]").forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (href === path || (path === "" && href === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyVotingBoothLinks();
  applySocialLinks();
  initNav();
  initReveal();
  initCurrentNav();
});

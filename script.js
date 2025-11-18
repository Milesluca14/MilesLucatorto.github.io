// ======================================
// DARK / LIGHT MODE SYSTEM
// ======================================

// Ensure theme is restored before anything else
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  // Apply theme visually
  function applyTheme(mode) {
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  // Toggle handler
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-mode");
      const newMode = isDark ? "light" : "dark";
      applyTheme(newMode);
      localStorage.setItem("theme", newMode);
    });
  }
});


// ======================================
// GALLERY PREVIEW TOGGLE (Home Only)
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  const galleryToggle = document.getElementById("gallery-toggle");
  const galleryPreview = document.getElementById("gallery-preview");

  if (galleryToggle && galleryPreview) {
    let open = false;

    galleryToggle.addEventListener("click", () => {
      open = !open;

      galleryPreview.style.display = open ? "block" : "none";
      galleryToggle.textContent = open
        ? "Hide gallery preview"
        : "Show gallery preview";
    });
  }
});


// ======================================
// SCROLL REVEAL ANIMATIONS
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) return;

  const revealTargets = document.querySelectorAll(
    ".section, .block-card, .project-block, .two-column > div, .gallery-window, .section-inner"
  );

  revealTargets.forEach(el => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealTargets.forEach(el => observer.observe(el));
  } else {
    // Fallback: make all visible immediately
    revealTargets.forEach(el => el.classList.add("is-visible"));
  }
});


// ======================================
// FLOATING BOTTOM NAV — FOLLOW SCROLL DIRECTION
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  let lastY = window.pageYOffset;

  window.addEventListener("scroll", () => {
    const currentY = window.pageYOffset;

    if (currentY > lastY) {
      // scrolling down
      document.body.classList.add("scrolling-down");
      document.body.classList.remove("scrolling-up");
    } else {
      // scrolling up
      document.body.classList.add("scrolling-up");
      document.body.classList.remove("scrolling-down");
    }

    lastY = currentY;
  });
});

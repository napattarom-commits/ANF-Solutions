// ANF SOLUTIONS — Navigation logic
// Mobile hamburger + Products dropdown

(() => {
  // ============ MOBILE MENU ============
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (btn && menu) {
    const openMenu = () => {
      menu.classList.add("open");
      menu.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close menu");
      btn.textContent = "✕";
      document.body.style.overflow = "hidden";
    };
    const closeMenu = () => {
      menu.classList.remove("open");
      menu.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
      btn.textContent = "☰";
      document.body.style.overflow = "";
    };

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenu();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  // ============ PRODUCTS DROPDOWN ============
  document.querySelectorAll(".nav-dropdown").forEach((dd) => {
    const toggle = dd.querySelector(".nav-dropdown-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = dd.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  document.addEventListener("click", (e) => {
    document.querySelectorAll(".nav-dropdown.open").forEach((dd) => {
      if (!dd.contains(e.target)) {
        dd.classList.remove("open");
        dd.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".nav-dropdown.open").forEach((dd) => {
        dd.classList.remove("open");
        dd.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
      });
    }
  });
})();

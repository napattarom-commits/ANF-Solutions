// assets/js/menu.js
(() => {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  function openMenu() {
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
    btn.textContent = "×";
  }

  function closeMenu() {
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
    btn.textContent = "☰";
  }

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  // close when click any link
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeMenu();
  });

  // close on Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // close when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
})();

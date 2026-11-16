const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const onScroll = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

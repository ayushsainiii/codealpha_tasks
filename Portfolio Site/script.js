// Optional: Add animations on scroll or interactive effects here
window.addEventListener("scroll", () => {
  document.querySelectorAll("section").forEach(sec => {
    const secTop = sec.offsetTop;
    const scrollY = window.scrollY;
    if (scrollY + window.innerHeight - 100 > secTop) {
      sec.style.opacity = 1;
      sec.style.transform = "translateY(0)";
    }
  });
});

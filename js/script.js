document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal animations from the existing AOS approach.
  if (window.AOS) {
    AOS.init({ duration: 750, offset: 65, once: true, easing: "ease-out-cubic" });
  }

  // Sticky navigation: the navbar is sticky in CSS; add a scrolled visual state.
  const navbar = document.getElementById("navbar-top");
  const backToTop = document.getElementById("btn-back-to-top");
  const onScroll = () => {
    if (navbar) navbar.classList.toggle("is-scrolled", window.scrollY > 24);
    if (backToTop) backToTop.style.display = window.scrollY > 320 ? "grid" : "none";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Close mobile navigation after a section link is selected.
  document.querySelectorAll("#navbarNav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("navbarNav");
      if (nav && nav.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  // Highlight the navigation link for the visible section.
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("#navbarNav .nav-link[href^='#']");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => observer.observe(section));
  }

  // Demo enquiry form: prepares an email draft instead of silently pretending to submit.
  const form = document.getElementById("project-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent("Project enquiry — SPVV Innovations");
      const body = encodeURIComponent(
        `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\n\nProject details:\n${data.get("message")}`
      );
      // Replace this placeholder with your official business email or connect a form backend.
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
});

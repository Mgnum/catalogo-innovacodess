// Encabezado: sombra al hacer scroll
const header = document.getElementById("header");

function onScroll() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menú móvil
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Animación de aparición al hacer scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Resaltado del enlace del menú según la sección visible
const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const sections = document.querySelectorAll("main section[id]");

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      navLinks.forEach((link) =>
        link.classList.toggle("active", link.getAttribute("href") === id)
      );
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => spyObserver.observe(section));

// Formulario de contacto: abre WhatsApp con el mensaje listo
const WHATSAPP_NUMBER = "595991226410"; // 0991 226 410
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = contactForm.nombre.value.trim();
  const mensaje = contactForm.mensaje.value.trim();

  if (!nombre || !mensaje) {
    contactForm.reportValidity();
    return;
  }

  const texto = encodeURIComponent(
    `Hola INNOVACODESS, soy ${nombre}. ${mensaje}`
  );

  window.open(`${WHATSAPP_BASE_URL}${texto}`, "_blank", "noopener");
});

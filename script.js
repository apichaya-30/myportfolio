document.addEventListener("DOMContentLoaded", () => {

  /* ================= MENU ================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }


  /* ================= SMOOTH SCROLL ================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });


  /* ================= BACK TO TOP ================= */

  const backToTop = document.querySelector('a[href="#top"]');

  if (backToTop) {

    backToTop.addEventListener("click", function (event) {

      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* ================= REVEAL ANIMATION ================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.08
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("active");
    });

  }


  /* ================= IMAGE MODAL ================= */

  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalClose = document.querySelector(".modal-close");


  function openModal(image, title = "") {

    if (!modal || !modalImage) {
      return;
    }

    modalImage.src = image;
    modalImage.alt = title || "Portfolio image";

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }


  function closeModal() {

    if (!modal) {
      return;
    }

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (modalImage) {
      modalImage.src = "";
    }

  }


  /* Certificate */

  document.querySelectorAll(".certificate-card").forEach(card => {

    card.addEventListener("click", () => {

      const image = card.dataset.image;
      const title = card.dataset.title || "";

      if (image) {
        openModal(image, title);
      }

    });

  });


  /* Gallery */

  document.querySelectorAll(".gallery-item").forEach(item => {

    item.addEventListener("click", () => {

      const image = item.dataset.image;

      if (image) {
        openModal(image);
      }

    });

  });


  /* Close button */

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }


  /* Click outside image */

  if (modal) {

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        closeModal();
      }

    });

  }


  /* ESC to close */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeModal();
    }

  });


  /* ================= CURRENT YEAR ================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});

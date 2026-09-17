const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("active");
});


document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {
    navLinks?.classList.remove("active");
  });

});


/* กลับขึ้นด้านบน */

document
  .querySelector("#backToTop")
  ?.addEventListener("click", event => {

    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


/* MODAL */

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const closeModal = document.querySelector(".modal-close");


function openModal(image, title = "") {

  if (!modal || !modalImage || !modalTitle) {
    return;
  }

  modalImage.src = image;

  modalImage.alt =
    title || "Portfolio image";

  modalTitle.textContent = title;

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );
}


function hideModal() {

  if (!modal || !modalImage) {
    return;
  }

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  modalImage.src = "";

}


document
  .querySelectorAll("[data-image]")
  .forEach(item => {

    item.addEventListener("click", () => {

      openModal(
        item.dataset.image,
        item.dataset.title || ""
      );

    });

  });


closeModal?.addEventListener(
  "click",
  hideModal
);


modal?.addEventListener("click", event => {

  if (event.target === modal) {
    hideModal();
  }

});


document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    hideModal();
  }

});


/* SCROLL ANIMATION */

if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  document
    .querySelectorAll(".reveal")
    .forEach(el => {

      observer.observe(el);

    });


} else {

  document
    .querySelectorAll(".reveal")
    .forEach(el => {

      el.classList.add("show");

    });

}


/* ปีปัจจุบัน */

const year =
  document.getElementById("year");

if (year) {

  year.textContent =
    new Date().getFullYear();

}

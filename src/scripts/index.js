"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  const openModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);
    if (!modal) return;

    modal.classList.add("active");
    overlay.classList.add("active");
    body.classList.add("no-scroll");
  };

  const closeModal = () => {
    document.querySelectorAll(".modal.active").forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
  };

  document.querySelectorAll(".js-open-modal").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = btn.getAttribute("data-target");
      if (target) openModal(target);
    });
  });

  document.querySelectorAll(".js-modal-close").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  if (document.querySelector(".tabs")) {
    const handleTabs = (section, btnSelector, itemSelector, activeClass) => {
      const container = document.querySelector(section);
      const buttons = container.querySelectorAll(btnSelector);
      const items = container.querySelectorAll(itemSelector);

      buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          buttons.forEach((b) => b.classList.remove("active"));
          items.forEach((i) => i.classList.remove(activeClass));

          btn.classList.add("active");
          items[index].classList.add(activeClass);
        });
      });
    };

    handleTabs(".tabs", ".tabs__btn", ".tabs__item", "is-active");
  }

  const initAccordion = () => {
    document.querySelectorAll(".accordion__item").forEach((item) => {
      const header = item.querySelector(".accordion__header");

      header.addEventListener("click", () => {
        item.classList.toggle("active");

        document.querySelectorAll(".accordion__item").forEach((otherItem) => {
          if (otherItem !== item) otherItem.classList.remove("active");
        });
      });
    });
  };
  initAccordion();

  const toolsSlider = new Swiper(".tools__slider", {
    slidesPerView: 1,
    loop: false,
    pagination: {
      el: ".tools__pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}"></span>`;
      },
    },
    navigation: {
      nextEl: ".tools__nav-next",
      prevEl: ".tools__nav-prev",
    },
  });

  const outfitSlider = new Swiper(".outfit__slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    pagination: {
      el: ".outfit__pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}"></span>`;
      },
    },
    navigation: {
      nextEl: ".outfit__nav-next",
      prevEl: ".outfit__nav-prev",
    },
  });

  const gallerySlider = new Swiper(".gallery__slider", {
    loop: true,
    pagination: {
      el: ".gallery__pagination",
      clickable: true,
      renderBullet: (index, className) => `<span class="${className}"></span>`,
    },
    navigation: {
      nextEl: ".gallery__nav-next",
      prevEl: ".gallery__nav-prev",
    },
    breakpoints: {
      320: {
        spaceBetween: 16,
        slidesPerView: 1.5,
      },
      425: {
        spaceBetween: 16,
        slidesPerView: 2,
      },
      625: {
        spaceBetween: 16,
        slidesPerView: 2.5,
      },
      768: {
        spaceBetween: 24,
        slidesPerView: 3,
      },
      1171: {
        spaceBetween: 40,
      },
    },
  });

  const specialistsSlider = new Swiper(".specialists__slider", {
    navigation: {
      nextEl: ".specialists__nav-next",
      prevEl: ".specialists__nav-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1.4,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1170: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });

  const forms = document.querySelectorAll(".js-form");
  if (!forms.length) return;

  forms.forEach((form) => {
    const baseClass =
      Array.from(form.classList)
        .find((cls) => cls.endsWith("__form"))
        ?.replace("__form", "__field") || "form__field";

    const pristine = new Pristine(form, {
      classTo: baseClass,
      errorClass: "has-error",
      successClass: "has-success",
      errorTextParent: baseClass,
      errorTextTag: "div",
      errorTextClass: "pristine-error",
    });

    const phoneInput = form.querySelector('input[name="phone"]');
    if (phoneInput) {
      pristine.addValidator(
        phoneInput,
        (value) => value.replace(/\D/g, "").length === 11,
        "Введите корректный номер телефона",
      );
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const valid = pristine.validate();
      if (!valid) return;

      const formData = new FormData(form);

      fetch("/send.php", {
        method: "POST",
        body: formData,
      })
        .then((res) => (res.ok ? res.text() : Promise.reject(res)))
        .then((data) => {
          form.reset();
          pristine.reset();
        });
    });
  });
});

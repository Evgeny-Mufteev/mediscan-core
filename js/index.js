"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var overlay = document.querySelector(".overlay");
  var body = document.body;

  var openModal = function openModal(modalSelector) {
    var modal = document.querySelector(modalSelector);
    if (!modal) return;
    modal.classList.add("active");
    overlay.classList.add("active");
    body.classList.add("no-scroll");
  };

  var closeModal = function closeModal() {
    document.querySelectorAll(".modal.active").forEach(function (modal) {
      return modal.classList.remove("active");
    });
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
  };

  document.querySelectorAll(".js-open-modal").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var target = btn.getAttribute("data-target");
      if (target) openModal(target);
    });
  });
  document.querySelectorAll(".js-modal-close").forEach(function (btn) {
    btn.addEventListener("click", closeModal);
  });

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  if (document.querySelector(".tabs")) {
    var handleTabs = function handleTabs(section, btnSelector, itemSelector, activeClass) {
      var container = document.querySelector(section);
      var buttons = container.querySelectorAll(btnSelector);
      var items = container.querySelectorAll(itemSelector);
      buttons.forEach(function (btn, index) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) {
            return b.classList.remove("active");
          });
          items.forEach(function (i) {
            return i.classList.remove(activeClass);
          });
          btn.classList.add("active");
          items[index].classList.add(activeClass);
        });
      });
    };

    handleTabs(".tabs", ".tabs__btn", ".tabs__item", "is-active");
  }

  var initAccordion = function initAccordion() {
    document.querySelectorAll(".accordion__item").forEach(function (item) {
      var header = item.querySelector(".accordion__header");
      header.addEventListener("click", function () {
        item.classList.toggle("active");
        document.querySelectorAll(".accordion__item").forEach(function (otherItem) {
          if (otherItem !== item) otherItem.classList.remove("active");
        });
      });
    });
  };

  initAccordion();
  var toolsSlider = new Swiper(".tools__slider", {
    slidesPerView: 1,
    loop: false,
    pagination: {
      el: ".tools__pagination",
      clickable: true,
      renderBullet: function renderBullet(index, className) {
        return "<span class=\"".concat(className, "\"></span>");
      }
    },
    navigation: {
      nextEl: ".tools__nav-next",
      prevEl: ".tools__nav-prev"
    }
  });
  var outfitSlider = new Swiper(".outfit__slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    pagination: {
      el: ".outfit__pagination",
      clickable: true,
      renderBullet: function renderBullet(index, className) {
        return "<span class=\"".concat(className, "\"></span>");
      }
    },
    navigation: {
      nextEl: ".outfit__nav-next",
      prevEl: ".outfit__nav-prev"
    }
  });
  var gallerySlider = new Swiper(".gallery__slider", {
    loop: true,
    pagination: {
      el: ".gallery__pagination",
      clickable: true,
      renderBullet: function renderBullet(index, className) {
        return "<span class=\"".concat(className, "\"></span>");
      }
    },
    navigation: {
      nextEl: ".gallery__nav-next",
      prevEl: ".gallery__nav-prev"
    },
    breakpoints: {
      320: {
        spaceBetween: 16,
        slidesPerView: 1.5
      },
      425: {
        spaceBetween: 16,
        slidesPerView: 2
      },
      625: {
        spaceBetween: 16,
        slidesPerView: 2.5
      },
      768: {
        spaceBetween: 24,
        slidesPerView: 3
      },
      1171: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  });
  var specialistsSlider = new Swiper(".specialists__slider", {
    navigation: {
      nextEl: ".specialists__nav-next",
      prevEl: ".specialists__nav-prev"
    },
    breakpoints: {
      320: {
        slidesPerView: 1.4,
        spaceBetween: 16
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1170: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  });
  var forms = document.querySelectorAll(".js-form");
  if (!forms.length) return;
  forms.forEach(function (form) {
    var _Array$from$find;

    var baseClass = ((_Array$from$find = Array.from(form.classList).find(function (cls) {
      return cls.endsWith("__form");
    })) === null || _Array$from$find === void 0 ? void 0 : _Array$from$find.replace("__form", "__field")) || "form__field";
    var pristine = new Pristine(form, {
      classTo: baseClass,
      errorClass: "has-error",
      successClass: "has-success",
      errorTextParent: baseClass,
      errorTextTag: "div",
      errorTextClass: "pristine-error"
    });
    var phoneInput = form.querySelector('input[name="phone"]');

    if (phoneInput) {
      pristine.addValidator(phoneInput, function (value) {
        return value.replace(/\D/g, "").length === 11;
      }, "Введите корректный номер телефона");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = pristine.validate();
      if (!valid) return;
      var formData = new FormData(form);
      fetch("/send.php", {
        method: "POST",
        body: formData
      }).then(function (res) {
        return res.ok ? res.text() : Promise.reject(res);
      }).then(function (data) {
        form.reset();
        pristine.reset();
      });
    });
  });
});
//# sourceMappingURL=index.js.map

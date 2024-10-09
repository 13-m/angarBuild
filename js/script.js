document.addEventListener("DOMContentLoaded", function () {
  // Аккордеон
  document.querySelectorAll(".question__item-acc").forEach((item) => {
    item.addEventListener("click", function () {
      const openItem = document.querySelector(".question__item-acc.active");
      if (openItem && openItem !== this) {
        openItem.classList.remove("active");
        openItem.querySelector(".accordion-content").style.maxHeight = null;
      }

      if (this.classList.contains("active")) {
        this.classList.remove("active");
        this.querySelector(".accordion-content").style.maxHeight = null;
      } else {
        this.classList.add("active");
        const content = this.querySelector(".accordion-content");
        if (content) content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Закрытие бокового меню
  // const sideMenu = document.getElementById("sideMenu");
  const sideMenu = document.querySelector(".menu-list");
  const menuCloseBtn = document.getElementById("menuCloseBtn");

  if (sideMenu && menuCloseBtn) {
    menuCloseBtn.addEventListener("click", function () {
      sideMenu.classList.toggle("menu-opened");
      menuCloseBtn.classList.toggle("rotate");

      if (!sideMenu.classList.contains("menu-opened")) {
        setTimeout(() => {
          sideMenu.style.display = "flex";
        }, 300);
      }

      if (sideMenu.classList.contains("menu-opened")) {
        setTimeout(() => {
          sideMenu.style.display = "flex";
        }, 300);
      }
    });
  }

  // Бургер-меню
  const burger = document.querySelector(".burger");
  const burgerMenu = document.getElementById("burgerMenu");
  const isOpen = burger.classList.contains("active");

  if (burger && burgerMenu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      burgerMenu.classList.toggle("active");
      document.body.classList.toggle("lock-scroll");
    });

    burgerMenu.addEventListener("click", () => {
      document.body.classList.toggle("lock-scroll");
      burgerMenu.classList.toggle("active");
      burger.classList.toggle("active");
    });
  }

  // Модальные окна
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close-btn");
  const asideBtn = document.querySelector(".aside-btn");
  const checkBox = modal.querySelector(".agree");
  const formModal = modal.querySelector(".form");
  const modalButtons = document.querySelectorAll(".modal-btn"); // кнопки открытия модального окна

  // Закрытие модального окна
  function closeModal() {
    modal.classList.remove("visible");
    document.body.classList.remove("lock");
  }

  // Открытие модального окна
  modalButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // Предотвращаем стандартное действие
      console.log("Открытие модального окна");
      modal.classList.add("visible");
      document.body.classList.add("lock");
    });
  });

  // Обработка отправки формы
  formModal.addEventListener("submit", (e) => {
    e.preventDefault(); // Предотвращаем стандартную отправку формы

    // Проверяем, установлен ли чекбокс
    if (checkBox.checked) {
      console.log("Чекбокс установлен, отправляем форму");
      formModal.submit(); // Отправляем форму
      closeModal(); // Закрываем модальное окно
    } else {
      console.log("Чекбокс не установлен");
      // alert("Вы должны согласиться с условиями перед отправкой формы.");
    }
  });

  // Закрытие модального окна по кнопке закрытия
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      console.log("Закрытие модального окна");
      closeModal();
    });
  }

  // Закрытие модального окна при клике вне его
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      console.log("Клик по фону модального окна");
      closeModal();
    }
  });

  // Дополнительная кнопка для взаимодействия с aside (если она требуется)
  if (asideBtn) {
    asideBtn.addEventListener("click", () => {
      console.log("1");
      modal.classList.toggle("visible");
      document.body.classList.toggle("lock");
    });
  }

  // Слайдер - отличный вариант
  /* 
  const slides = document.querySelectorAll(".work__wrapp");
  const sliderContainer = document.querySelector(".slider");
  const sliderButtons = document.querySelectorAll(".work__inner-btn");

  let startX = 0; // Координата начала касания
  let isSwiping = false; // Флаг, что происходит свайп

  if (slides.length && sliderContainer && sliderButtons.length) {
    let currentSlide = 0;

    function updateSliderHeight() {
      const activeSlide = slides[currentSlide];
      const slideHeight = activeSlide.offsetHeight;
      sliderContainer.style.height = `${slideHeight + 1}px`;
    }

    function hideAllSlides() {
      slides.forEach((slide) => {
        slide.classList.remove(
          "active",
          "semi-transparent",
          "previous-left",
          "previous-right"
        );
        slide.style.display = "none";
      });
    }

    function showSlide(newSlideIndex) {
      hideAllSlides();

      // Активируем текущий слайд
      slides[newSlideIndex].classList.add("active");
      slides[newSlideIndex].style.display = "flex";

      // Обновляем активную кнопку
      sliderButtons.forEach((btn, index) => {
        if (index === newSlideIndex) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      // Предыдущий слайд, если он есть
      if (newSlideIndex > 0) {
        slides[newSlideIndex - 1].classList.add(
          "semi-transparent",
          "previous-left"
        );
        slides[newSlideIndex - 1].style.display = "flex";
      }

      // Следующий слайд, если он есть
      if (newSlideIndex < slides.length - 1) {
        slides[newSlideIndex + 1].classList.add(
          "semi-transparent",
          "previous-right"
        );
        slides[newSlideIndex + 1].style.display = "flex";
      }

      currentSlide = newSlideIndex;
      updateSliderHeight();
    }

    // Обработчики событий свайпа
    function handleTouchStart(event) {
      startX = event.touches[0].clientX; // Начало касания
      isSwiping = true;
    }

    function handleTouchMove(event) {
      if (!isSwiping) return;
      const moveX = event.touches[0].clientX;

      // Если свайп вправо
      if (startX - moveX > 50) {
        if (currentSlide < slides.length - 1) {
          showSlide(currentSlide + 1);
        }
        isSwiping = false;
      }

      // Если свайп влево
      if (moveX - startX > 50) {
        if (currentSlide > 0) {
          showSlide(currentSlide - 1);
        }
        isSwiping = false;
      }
    }

    function handleTouchEnd() {
      isSwiping = false;
    }

    // Добавляем обработчики на контейнер work__wrapp для свайпа
    slides.forEach((slide) => {
      slide.addEventListener("touchstart", handleTouchStart);
      slide.addEventListener("touchmove", handleTouchMove);
      slide.addEventListener("touchend", handleTouchEnd);
    });

    // Добавляем клик-события к кнопкам
    sliderButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const slideIndex = parseInt(btn.getAttribute("data-slide"), 10);
        showSlide(slideIndex);
      });
    });

    // Начальная настройка
    showSlide(currentSlide);
    updateSliderHeight();
  } */

  // Картинки в слайдере
  const imagesForSliders = [
    // [
    //   'url("./img/work-first-img-1.png")',
    //   'url("./img/work-first-img-2.png")',
    //   'url("./img/work-first-img-3.png")',
    //   'url("./img/work-first-img-4.png")',
    //   'url("./img/work-first-img-5.png")',
    //   'url("./img/work-first-img-6.png")',
    //   'url("./img/work-first-img-7.png")',
    //   'url("./img/work-first-img-8.png")',
    //   'url("./img/work-first-img-9.png")',
    //   'url("./img/work-first-img-10.png")',
    // ],
    // ['url("./img/about-img-3.jpg")', 'url("./img/about-img-4.jpg")'],
    // ['url("./img/about-img-5.jpg")', 'url("./img/form-img-1.jpg")'],
    ['url("./img/work-1-1-img.jpg")'],
    ['url("./img/work-2-1-img.jpg")'],
    ['url("./img/work-3-1-img.jpg")'],
    ['url("./img/work-4-1-img.jpg")'],
  ];

  function updateBackground(slider, images, index) {
    const container = slider.querySelector(".work__wrapp");
    container.style.backgroundImage = images[index];
  }

  const sliders = document.querySelectorAll(".work__wrapp-right");

  sliders.forEach((slider, i) => {
    const images = imagesForSliders[i];
    let currentIndex = 0;

    const leftBtn = slider.querySelector(".work__btn-galery.left");
    const rightBtn = slider.querySelector(".work__btn-galery.right");

    updateBackground(slider, images, currentIndex);

    leftBtn.addEventListener("click", () => {
      currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      updateBackground(slider, images, currentIndex);
    });

    rightBtn.addEventListener("click", () => {
      currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      updateBackground(slider, images, currentIndex);
    });
  });

  // Custom select
  const defaultOption = document.querySelector(".default_option");
  const selectWrap = document.querySelector(".select_wrap");
  const selectUl = document.querySelector(".select_ul");

  if (defaultOption && selectWrap && selectUl) {
    defaultOption.addEventListener("click", function () {
      selectWrap.classList.toggle("active");
    });

    selectUl.querySelectorAll("li").forEach(function (option) {
      option.addEventListener("click", function () {
        defaultOption.textContent = option.textContent;
        selectWrap.classList.remove("active");
      });
    });

    document.addEventListener("click", function (event) {
      if (!selectWrap.contains(event.target)) {
        selectWrap.classList.remove("active");
      }
    });
  }

  // new slider
  const imagesForContactPhotos = [
    [
      'url("./img/cont-fir-img-1.jpg")',
      'url("./img/cont-fir-img-2.jpg")',
      'url("./img/cont-fir-img-3.jpg")',
      'url("./img/cont-fir-img-4.jpg")',
    ],
    [
      'url("./img/cont-sec-img-1.jpeg")',
      'url("./img/cont-sec-img-2.jpeg")',
      'url("./img/cont-sec-img-3.jpeg")',
    ],
  ];

  // Функция для обновления фонового изображения активного блока
  function updateBackground(photoBlock, images, index) {
    photoBlock.style.backgroundImage = images[index];
  }

  // Находим все блоки contact__photo
  const contactPhotos = document.querySelectorAll(".contact__photo");

  contactPhotos.forEach((photoBlock, i) => {
    const images = imagesForContactPhotos[i];
    let currentIndex = 0; // Индекс изображения для каждого блока начинается с 0

    const leftBtn = photoBlock.querySelector(".contact__btn-galery.left");
    const rightBtn = photoBlock.querySelector(".contact__btn-galery.right");

    // Устанавливаем начальное изображение для каждого блока
    updateBackground(photoBlock, images, currentIndex);

    // Обработчик клика на левую кнопку
    leftBtn.addEventListener("click", () => {
      currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      updateBackground(photoBlock, images, currentIndex);
    });

    // Обработчик клика на правую кнопку
    rightBtn.addEventListener("click", () => {
      currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      updateBackground(photoBlock, images, currentIndex);
    });

    function disableScroll() {
      document.body.style.overflow = "hidden";
    }

    // Function to enable scroll on the body
    function enableScroll() {
      document.body.style.overflow = "";
    }

    // Apply event listeners only if the screen width is less than 520px
    if (window.innerWidth < 520) {
      contactPhotos.forEach((photoBlock) => {
        // Disable scroll on touchstart (when user touches the slider)
        photoBlock.addEventListener("touchstart", disableScroll);

        // Enable scroll on touchend (when user stops touching the slider)
        photoBlock.addEventListener("touchend", enableScroll);
      });
    }
    // end slider
    // Свайп
    let touchStartX = 0;
    let touchEndX = 0;

    photoBlock.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].screenX;
    });

    photoBlock.addEventListener("touchend", (event) => {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
    });

    const handleSwipe = () => {
      if (touchStartX - touchEndX > 50) {
        // Свайп влево
        currentIndex =
          currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        updateBackground(photoBlock, images, currentIndex);
      }

      if (touchEndX - touchStartX > 50) {
        // Свайп вправо
        currentIndex =
          currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        updateBackground(photoBlock, images, currentIndex);
      }
    };
  });

  // forms

  const forms = document.querySelectorAll(".form");

  forms.forEach((form) => {
    const checkbox = form.querySelector(".agree");
    const sendBtn = form.querySelector(".sendBtn");
    const checkboxSpan = form.querySelector(".tooltip-container");

    form.addEventListener("submit", (e) => {
      if (!checkbox.checked) {
        e.preventDefault();

        if (!form.querySelector(".tooltip")) {
          const tooltip = document.createElement("p");
          tooltip.classList.add("tooltip");
          tooltip.textContent = "Чтобы отправить заявку, заполните это поле";
          checkboxSpan.appendChild(tooltip);

          setTimeout(() => {
            tooltip.remove();
          }, 30000);
        }
      } else {
        console.log("Форма отправлена");
      }
    });
  });

  //  свайп
  let touchStartX = 0;
  let touchEndX = 0;

  function handleGesture() {
    if (touchEndX > touchStartX + 50) {
      // Проверяем, что свайп вправо достаточно длинный (50px)
      sideMenu.classList.remove("menu-opened"); // Скрываем меню
      menuCloseBtn.classList.toggle("rotate");
    }
  }
  //127.0.0.1:5500/index.html#calc
  // Отслеживаем начало касания
  http: sideMenu.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
  });

  // Отслеживаем движение пальца
  sideMenu.addEventListener("touchmove", function (event) {
    touchEndX = event.changedTouches[0].screenX;
  });

  // По завершении касания проверяем направление свайпа
  sideMenu.addEventListener("touchend", function () {
    handleGesture();
  });

  const elements = document.getElementById("select-social-js");
  const choices = new Choices(elements, {
    searchEnabled: false,
    itemSelectText: "",
    placeholder: true,
    placeholderValue: null,
  });
});

//  swiper
var stepsSwiper1 = new Swiper(".swiper-container", {
  spaceBetween: 10,
  // loop: true,
  grabCursor: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
});

// var stepsSwiper2 = new Swiper(".cont-swiper-container-1", {
//   spaceBetween: 10,
//   // loop: true,
//   grabCursor: false,
//   navigation: {
//     nextEl: ".slider-1-button-next",
//     prevEl: ".slider-1-button-prev",
//   },
//   slidesPerView: 1,
//   pagination: {
//     el: ".slider-1-pagination",
//     type: "bullets",
//   },
// });

// var stepsSwiper3 = new Swiper(".cont-swiper-container-2", {
//   spaceBetween: 10,
//   // loop: true,
//   grabCursor: false,
//   navigation: {
//     nextEl: ".slider-2-button-next",
//     prevEl: ".slider-2-button-prev",
//   },
//   slidesPerView: 1,
//   pagination: {
//     el: ".slider-2-pagination",
//     type: "bullets",
//   },
// });

// Получаем кнопку
const menuUpBtn = document.querySelector(".menu-up-btn");

function handleScroll() {
  if (window.scrollY >= 900) {
    menuUpBtn.classList.add("show");
  } else {
    menuUpBtn.classList.remove("show");
  }
}

window.addEventListener("scroll", handleScroll);

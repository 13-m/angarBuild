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
          sideMenu.style.display = "block";
        }, 300);
      }

      if (sideMenu.classList.contains("menu-opened")) {
        setTimeout(() => {
          sideMenu.style.display = "block";
        }, 300);
      }
    });
  }

  // Бургер-меню
  const burger = document.querySelector(".burger");
  const burgerMenu = document.getElementById("burgerMenu");

  if (burger && burgerMenu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      burgerMenu.classList.toggle("active");
      document.body.classList.toggle("lock-scroll");
    });

    burgerMenu.addEventListener("click", () => {
      document.body.classList.toggle("lock-scroll");
      burgerMenu.classList.toggle("active");
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
  const slides = document.querySelectorAll(".work__wrapp");
  const sliderContainer = document.querySelector(".slider");
  const nextButton = document.querySelector(".work__btn-slider.right");
  const prevButton = document.querySelector(".work__btn-slider.left");

  if (slides.length && sliderContainer && nextButton && prevButton) {
    let currentSlide = 0;
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

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

      // Set the current slide as active
      slides[newSlideIndex].classList.add("active");
      slides[newSlideIndex].style.display = "flex";

      // Set the previous slide (if exists) as semi-transparent
      if (newSlideIndex > 0) {
        slides[newSlideIndex - 1].classList.add(
          "semi-transparent",
          "previous-left"
        );
        slides[newSlideIndex - 1].style.display = "flex";
      }

      // Set the next slide (if exists) as semi-transparent
      if (newSlideIndex < slides.length - 1) {
        slides[newSlideIndex + 1].classList.add(
          "semi-transparent",
          "previous-right"
        );
        slides[newSlideIndex + 1].style.display = "flex";
      }

      currentSlide = newSlideIndex;
      updateButtonsState(); // Check button states after slide change
      updateSliderHeight();
    }

    function updateButtonsState() {
      // Disable the previous button if it's the first slide
      if (currentSlide === 0) {
        prevButton.classList.add("disabled");
      } else {
        prevButton.classList.remove("disabled");
      }

      // Disable the next button if it's the last slide
      if (currentSlide === slides.length - 1) {
        nextButton.classList.add("disabled");
      } else {
        nextButton.classList.remove("disabled");
      }
    }

    nextButton.addEventListener("click", () => {
      if (currentSlide < slides.length - 1) {
        const newSlideIndex = currentSlide + 1;
        showSlide(newSlideIndex);
      }
    });

    prevButton.addEventListener("click", () => {
      if (currentSlide > 0) {
        const newSlideIndex = currentSlide - 1;
        showSlide(newSlideIndex);
      }
    });

    // Add swipe functionality to each slide in .work__wrapp
    slides.forEach((slide) => {
      slide.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX; // Store the initial horizontal touch position
        startY = e.touches[0].clientY; // Store the initial vertical touch position
      });

      slide.addEventListener("touchmove", (e) => {
        endX = e.touches[0].clientX;
        endY = e.touches[0].clientY;

        const diffX = startX - endX;
        const diffY = startY - endY;

        // Check if the swipe is more horizontal than vertical
        if (Math.abs(diffX) > Math.abs(diffY)) {
          e.preventDefault(); // Prevent vertical scroll
        }
      });

      slide.addEventListener("touchend", () => {
        const diffX = startX - endX;

        // Check the swipe direction and threshold
        if (diffX > 50 && currentSlide < slides.length - 1) {
          // Swipe left (next slide)
          nextButton.click();
        } else if (diffX < -50 && currentSlide > 0) {
          // Swipe right (previous slide)
          prevButton.click();
        }
      });
    });

    // Initial setup
    showSlide(currentSlide);
    updateSliderHeight();
  }

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

  // Проходим по каждому блоку
  contactPhotos.forEach((photoBlock, i) => {
    // У каждого блока свой список изображений
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
          }, 3000);
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
});

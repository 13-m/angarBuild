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
  const sideMenu = document.getElementById("sideMenu");
  const menuCloseBtn = document.getElementById("menuCloseBtn");

  if (sideMenu && menuCloseBtn) {
    menuCloseBtn.addEventListener("click", function () {
      sideMenu.classList.remove("menu-opened");
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
  const buttons = document.querySelectorAll(".modal-btn");
  const closeBtn = document.querySelector(".close-btn");
  const asideBtn = document.querySelector(".aside-btn");

  if (modal && buttons.length && closeBtn && asideBtn) {
    asideBtn.addEventListener("click", () => {
      modal.classList.toggle("visible");
      sideMenu.classList.remove("menu-opened");
      document.body.classList.toggle("lock");
    });

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        modal.classList.toggle("visible");
        document.body.classList.toggle("lock");
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.toggle("visible");
      document.body.classList.toggle("lock");
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.toggle("visible");
        document.body.classList.toggle("lock");
      }
    });
  }

  // Слайдер
  const slides = document.querySelectorAll(".work__wrapp");
  const sliderContainer = document.querySelector(".slider");
  const nextButton = document.querySelector(".work__btn-slider.right");
  const prevButton = document.querySelector(".work__btn-slider.left");

  if (slides.length && sliderContainer && nextButton && prevButton) {
    let currentSlide = 0;

    function updateSliderHeight() {
      const activeSlide = slides[currentSlide];
      const slideHeight = activeSlide.offsetHeight;
      sliderContainer.style.height = `${slideHeight + 1}px `;
      console.log(slideHeight);
    }

    function showSlide(newSlideIndex, direction) {
      slides[currentSlide].classList.remove("active");

      if (direction === "next") {
        slides[currentSlide].classList.add("previous-left");
      } else if (direction === "prev") {
        slides[currentSlide].classList.add("previous-right");
      }

      currentSlide = newSlideIndex;

      slides[currentSlide].classList.remove("previous-left", "previous-right");
      slides[currentSlide].classList.add("active");

      updateSliderHeight();
    }

    nextButton.addEventListener("click", () => {
      const newSlideIndex = (currentSlide + 1) % slides.length;
      showSlide(newSlideIndex, "next");
    });

    prevButton.addEventListener("click", () => {
      const newSlideIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(newSlideIndex, "prev");
    });

    showSlide(currentSlide);
    updateSliderHeight();
  }

  // Картинки в слайдере
  const imagesForSliders = [
    ['url("../img/about-img-1.jpg")', 'url("../img/about-img-2.jpg")'],
    ['url("../img/about-img-3.jpg")', 'url("../img/about-img-4.jpg")'],
    ['url("../img/about-img-5.jpg")', 'url("../img/form-img-1.jpg")'],
  ];

  function updateBackground(slider, images, index) {
    const container = slider.querySelector(".work__wrapp-right");
    container.style.backgroundImage = images[index];
  }

  const sliders = document.querySelectorAll(".work__wrapp");

  sliders.forEach((slider, i) => {
    const images = imagesForSliders[i];
    let currentIndex = 0;

    const leftBtn = slider.querySelector(".work__btn-galery.left");
    const rightBtn = slider.querySelector(".work__btn-galery.right");

    updateBackground(slider, images, currentIndex);

    // Обработчик клика на левую кнопку
    leftBtn.addEventListener("click", () => {
      currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      updateBackground(slider, images, currentIndex);
    });

    // Обработчик клика на правую кнопку
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
});

// new slider
const imagesForContactPhotos = [
  ['url("../img/contact-img-1.jpg")', 'url("../img/contact-img-2.jpg")'],
  ['url("../img/contact-img-2.jpg")', 'url("../img/contact-img-1.jpg")'],
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

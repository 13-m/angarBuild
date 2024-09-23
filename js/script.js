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
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

const sideMenu = document.getElementById("sideMenu");
const menuCloseBtn = document.getElementById("menuCloseBtn");

// Закрытие меню
menuCloseBtn.addEventListener("click", function () {
  sideMenu.classList.remove("menu-opened");
});

const burger = document.querySelector(".burger");
const burgerMenu = document.getElementById("burgerMenu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  burgerMenu.classList.toggle("active");
  document.body.classList.toggle("lock-scroll");
});

burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("active");
});

// modal
const modal = document.getElementById("modal");
const buttons = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close-btn");
const asideBtn = document.querySelector(".aside-btn");

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

// слайды

const slides = document.querySelectorAll(".work__wrapp");
const sliderContainer = document.querySelector(".slider");
const nextButton = document.querySelector(".work__btn-slider.right");
const prevButton = document.querySelector(".work__btn-slider.left");
let currentSlide = 0;

function updateSliderHeight() {
  const activeSlide = slides[currentSlide];
  const slideHeight = activeSlide.offsetHeight;
  sliderContainer.style.height = `${slideHeight}px`;
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
  console.log("right");
});

prevButton.addEventListener("click", () => {
  const newSlideIndex = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(newSlideIndex, "prev");
  console.log("left");
});

showSlide(currentSlide);
updateSliderHeight();

// Картиночки в работах - слайдер

const images = [
  'url("../img/work-img-2.jpg")',
  'url("../img/about-img-2.jpg")',
  'url("../img/about-img-1.jpg")',
];

let currentIndex = 0;

const container = document.querySelector(".work__wrapp-right");
const leftBtn = document.querySelector(".work__btn-work__btn-galery.left");
const rightBtn = document.querySelector(".work__btn-work__btn-galery.right");

function updateBackground() {
  container.style.backgroundImage = images[currentIndex];
}

leftBtn.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  updateBackground();
});

rightBtn.addEventListener("click", () => {
  currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  updateBackground();
});

updateBackground();

// custom select
document.addEventListener("DOMContentLoaded", function () {
  const customSelect = document.getElementById("customSelect");
  const trigger = customSelect.querySelector(".select-trigger");
  const optionsContainer = customSelect.querySelector(".select-options");
  const options = optionsContainer.querySelectorAll(".option");

  trigger.addEventListener("click", function () {
    customSelect.classList.toggle("active");
  });

  options.forEach((option) => {
    option.addEventListener("click", function () {
      trigger.textContent = option.textContent;
      trigger.setAttribute("data-value", option.getAttribute("data-value"));
      customSelect.classList.remove("active");
    });
  });

  document.addEventListener("click", function (e) {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("active");
    }
  });
});

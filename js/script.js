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

const images = [
  'url("../img/work-img-2.jpg")',
  'url("../img/about-img-2.jpg")',
  'url("../img/about-img-1.jpg")',
];

// Текущий индекс изображения
let currentIndex = 0;

// Получаем контейнер и кнопки
const container = document.querySelector(".work__wrapp-right");
const leftBtn = document.querySelector(".work__btn-slider.left");
const rightBtn = document.querySelector(".work__btn-slider.right");

// Функция для обновления фона
function updateBackground() {
  container.style.backgroundImage = images[currentIndex];
}

// Обработчик для кнопки "влево"
leftBtn.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  updateBackground();
});

// Обработчик для кнопки "вправо"
rightBtn.addEventListener("click", () => {
  currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  updateBackground();
});

// Инициализируем первый фон
updateBackground();

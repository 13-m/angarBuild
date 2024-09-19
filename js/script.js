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

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

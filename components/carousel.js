class CarouselComponent extends HTMLElement {
  constructor() {
    super();
    this.currentIndex = 0;
  }

  connectedCallback() {
    this.render();
    this.attachNavigationHandlers();
    this.updateSlidePosition();
  }

  render() {
    const slides = this.querySelectorAll("carousel-slide");
    slides.forEach(slide => {
      slide.classList.add("carousel-slide");
    });

    const container = document.createElement("div");
    container.classList.add("carousel-container");

    const slidesWrapper = document.createElement("div");
    slidesWrapper.classList.add("carousel-slides");
    slidesWrapper.append(...slides);
    container.appendChild(slidesWrapper);

    const navButtons = document.createElement("div");
    navButtons.classList.add("carousel-navigation");

    const prevButton = document.createElement("button");
    prevButton.classList.add("carousel-prev");
    prevButton.textContent = "<";
    navButtons.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.classList.add("carousel-next");
    nextButton.textContent = ">";
    navButtons.appendChild(nextButton);

    container.appendChild(navButtons);

    this.innerHTML = "";
    this.appendChild(container);
  }

  attachNavigationHandlers() {
    const prevButton = this.querySelector(".carousel-prev");
    const nextButton = this.querySelector(".carousel-next");

    prevButton.addEventListener("click", () => this.showPreviousSlide());
    nextButton.addEventListener("click", () => this.showNextSlide());
  }

  showPreviousSlide() {
    const slides = this.querySelectorAll(".carousel-slide");
    this.currentIndex =
      (this.currentIndex - 1 + slides.length) % slides.length;
    this.updateSlidePosition();
  }

  showNextSlide() {
    const slides = this.querySelectorAll(".carousel-slide");
    this.currentIndex = (this.currentIndex + 1) % slides.length;
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    const slidesWrapper = this.querySelector(".carousel-slides");
    slidesWrapper.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }
}

customElements.define("carousel-component", CarouselComponent);

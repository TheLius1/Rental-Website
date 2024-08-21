"use strict";

// SELECTORS
const hamburgerMenu = document.querySelector(".hamburger__menu");
const removeMenu = document.querySelector(".x-bar");
const nav__links = document.querySelector(".nav__links");
const nav__link = document.querySelectorAll(".nav__link");
const header = document.querySelector(".header");
const button = document.querySelectorAll(".hero-btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const cancelModalBtn = document.querySelector(".btn--close-modal");
const submitBtn = document.querySelector(".submitBtn");
const inputType = document.querySelectorAll(".form");
const email = document.getElementById("email");
const text__error = document.querySelectorAll(".text__error");
const success__message = document.querySelector(".confirmation__message");
const imageTarget = document.querySelector(".lazy-img");
const nav = document.querySelector("nav");
const navHeight = nav.getBoundingClientRect().height;

// IMPLEMENTING THE HAMBURGER MENU
hamburgerMenu.addEventListener("click", () => {
  nav__links.classList.add("show");
  if (nav__links.classList.contains("show")) {
    hamburgerMenu.style.display = "none";
    removeMenu.style.display = "block";
  }
});
removeMenu.addEventListener("click", () => {
  nav__links.classList.remove("show");
  removeMenu.style.display = "";
  hamburgerMenu.style.display = "";
});

// MODAL WINDOW
const removeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
button.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
});
cancelModalBtn.addEventListener("click", removeModal);
overlay.addEventListener("click", removeModal);

// FORM VALIDATION AND CONFIRMATION MESSAGE

const wrongValidation = (curEle, i) => {
  text__error[i].classList.remove("form-hidden");
  curEle.style.border = "1px solid var(--red)";
};
const correctValidation = (curEle, i) => {
  text__error[i].classList.add("form-hidden");
  curEle.style.border = "";
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let isValid = true;
  let inputs = [];
  inputType.forEach((inputField, index) => {
    inputs.push(inputField);
    if (inputField.value === "") {
      wrongValidation(inputField, index);
      isValid = false;
    } else {
      correctValidation(inputField, index);
    }
  });

  // EMAIL VALIDATION
  const emailValue = email.value.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const emailIndex = Array.from(inputType).indexOf(email);

  if (!emailPattern.test(emailValue)) {
    wrongValidation(email, emailIndex);
    isValid = false;
  } else {
    correctValidation(email, emailIndex);
  }

  if (isValid) {
    removeModal();
    inputs.forEach((input) => (input.value = ""));
    setTimeout(() => {
      success__message.classList.remove("show");
    }, 2000);
    setTimeout(() => {
      success__message.classList.add("show");
    }, 6000);
  }
});

// LAZY LOADING IMAGES
const imageCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("lazy--img");
  entry.target.style.backgroundColor = "var(--image-color)";

  observer.unobserve(entry.target);
};
const image = new IntersectionObserver(imageCallback, {
  root: null,
  threshold: 0,
});

image.observe(imageTarget);

// ADDING BOX SHADOW TO NAV WHEN SCROLLED
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    nav.classList.add("box__shadow");
  } else {
    nav.classList.remove("box__shadow");
  }
});

// SWIPER
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,

  // Navigation arrows
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },

  // Breakpoint
  breakpoints: {
    768: {
      enabled: false,
    },
    0: {
      enabled: true,
    },
  },
});

// REVEAL SECTIONS
const sections = document.querySelectorAll(".section");

const sectionCallBack = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("reveal");
  observer.unobserve(entry.target);
};
const oberser = new IntersectionObserver(sectionCallBack, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  oberser.observe(section);
  section.classList.add("reveal");
});

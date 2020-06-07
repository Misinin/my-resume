"use-strict";

var navigation = document.querySelector(".nav");
var navToggle = document.querySelector(".nav__button");
var upButton = document.querySelector(".up-button");

navigation.classList.remove("nav--nojs");
navigation.classList.add("nav--closed");

navToggle.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (navigation.classList.contains("nav--closed")) {
    navigation.classList.remove("nav--closed");
    navigation.classList.add("nav--opened");
  } else {
    navigation.classList.add("nav--closed");
    navigation.classList.remove("nav--opened");
  }
});

window.onscroll = function () {
  if (window.pageYOffset > 200) {
    upButton.classList.add("up-button--shown");
  } else {
    upButton.classList.remove("up-button--shown");
  }
};

upButton.addEventListener("click", function () {
  window.scrollTo(0, 0);
});

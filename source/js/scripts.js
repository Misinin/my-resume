var navigation = document.querySelector(".nav");
var navToggle = document.querySelector(".nav__button");

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
})

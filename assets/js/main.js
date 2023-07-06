document.addEventListener("DOMContentLoaded", function () {
  const stickyTarget = document.querySelector(".sticky-target");
  const stickyWrapper = document.querySelector("header");

  const stickyWatch = (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        stickyWrapper.classList.add("stuck");
      } else {
        stickyWrapper.classList.remove("stuck");
      }
    });
  };
  const observer = new IntersectionObserver(stickyWatch);
  observer.observe(stickyTarget);

  // Script for Mobile toggle button
  if (document.querySelector(".navbar-toggle") !== null) {
    const navbarToggle = document.querySelector(".navbar-toggle");
    navbarToggle.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("body").classList.toggle("extra");
    });

    $(".overlay").on("click", function () {
      document.querySelector("body").classList.toggle("extra");
    });
  }

  // Script for BV select activation
  let language = new BVSelect({
    selector: "#language",
    width: "100%",
  });
  let languageM = new BVSelect({
    selector: "#language-m",
    width: "100%",
  });
});

const dataExpandToggle = document.querySelectorAll("[data-expand-toggle]");
dataExpandToggle.forEach((each) => {
  each.addEventListener("click", function (e) {
    e.preventDefault();
    const expandableElement = document.getElementById(
      each.dataset.expandToggle.split("#")[1]
    );
    if (each.dataset.state === "shirnked") {
      each.dataset.state = "expanded";
      expandableElement.classList.add("expanded");
      each.innerHTML = "Show less description";
    } else if (each.dataset.state === "expanded") {
      each.dataset.state = "shirnked";
      expandableElement.classList.remove("expanded");
      each.innerHTML = "Show full description";
    }
  });
});

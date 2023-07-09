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

  // Script for show/hide content in property info
  if (document.querySelectorAll("[data-expand-toggle]") !== null) {
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
  }

  if (document.querySelector("[data-phoneNumber]") !== null) {
    let phoneNumberElement = document.querySelector("[data-phoneNumber]");
    phoneNumberElement.addEventListener("click", function (e) {
      e.preventDefault();
      phoneNumberElement.innerHTML = phoneNumberElement.dataset.phonenumber;
    });
  }

  // Script for Payment breakdown graph
  function paymentBreakdownGraph(id) {
    if (document.querySelector(id) !== null) {
      const bar = document.querySelector(id);
      const amountDiv = bar.querySelector(".graph-rw-inner");
      const value = parseInt(bar.dataset.value);
      amountDiv.style.width = `${value}%`;
    }
  }

  paymentBreakdownGraph("#payment_breakdown_bar");

  // Script for circle graph
  function halfCircleGraph(id) {
    if (document.querySelector(id) !== null) {
      const halfCircle = document.querySelector(id);
      const amountDiv = halfCircle.querySelector(".parcentage");
      const dotHandle = halfCircle.querySelector(".dot_handle");
      const value = parseInt(halfCircle.dataset.value);
      dotHandle.style.transform = `rotate(${value * 1.8}deg)`;
      amountDiv.innerHTML = `${value}%`;
    }
  }

  halfCircleGraph("#half-cirle-graph");
}); // End line

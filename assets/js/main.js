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

  // Form Validation (Enquiry Form)

  class FormValidator {
    constructor(form) {
      this.form = form;
      this.inputs = Array.from(this.form.elements).filter(
        (element) => element.type !== "submit"
      );
      this.errors = {};
      this.setupEventListeners();
    }

    setupEventListeners() {
      this.inputs.forEach((input) => {
        input.addEventListener("input", () => {
          this.validateInput(input);
          this.displayErrors();
        });
      });

      this.form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (this.validate()) {
          this.form.submit();
        } else {
          this.displayErrors();
        }
      });
    }

    validateInput(input) {
      const { name, value } = input;
      const validationRule = this.getValidationRule(name);

      if (validationRule && !validationRule.regex.test(value)) {
        this.errors[name] = validationRule.warningText;
      } else {
        delete this.errors[name];
      }
    }

    validate() {
      this.errors = {};

      this.inputs.forEach((input) => {
        this.validateInput(input);
      });

      return Object.keys(this.errors).length === 0;
    }

    getValidationRule(fieldName) {
      const rules = {
        message: {
          regex: /\S/,
          warningText: "Oops! you forgot to write a message",
        },
        name: {
          regex: /^[a-zA-Z0-9_]{3,16}$/,
          warningText: "Oops! you forgot to fill in your name",
        },
        email: {
          regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          warningText: "Oops! you forgot to fill in your email.",
        },
        phone: {
          regex:
            /^\+\d{1,3}\s?(\(\d{1,3}\))?\s?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,9}$/,
          warningText: "Oops! you forgot to fill in your phone",
        },
      };

      return rules[fieldName];
    }

    displayErrors() {
      this.inputs.forEach((input) => {
        const { name } = input;
        const errorContainer = input.parentNode.querySelector(".error-message");

        if (this.errors[name]) {
          if (!errorContainer) {
            const errorElement = document.createElement("div");
            errorElement.classList.add("error-message");
            errorElement.innerText = this.errors[name];
            input.parentNode.insertBefore(errorElement, input.nextSibling);
            input.parentNode.classList.add("invalid");
          }
        } else {
          if (errorContainer) {
            errorContainer.remove();
            input.parentNode.classList.remove("invalid");
          }
        }
      });
    }
  }

  // Form validator object
  if (document.getElementById("enquiry_form") !== null) {
    const form = document.getElementById("enquiry_form");
    const enquiryForm = new FormValidator(form);
  }
}); // End line

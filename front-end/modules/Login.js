import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector("input[name=email]");
    const passwordInput = el.querySelector("input[name=password]");

    let error = false; //flag for error

    // Remove existing error messages
    el.querySelectorAll(".error").forEach((errorMsg) => {
      errorMsg.remove();
    });

    if (!validator.isEmail(emailInput.value)) {
      let p = document.createElement("p");
      let errorMsg = document.createTextNode("Invalid email address");
      p.appendChild(errorMsg);
      p.classList.add("mt-1", "alert-danger", "error");
      emailInput.after(p);
      error = true;
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      let p = document.createElement("p");
      let errorMsg = document.createTextNode(
        "Password must be between 3 and 50 characters long"
      );
      p.appendChild(errorMsg);
      p.classList.add("mt-1", "alert-danger", "error");
      passwordInput.after(p);
      error = true;
    }

    if (!error) {
      el.submit();
    }
  }
}

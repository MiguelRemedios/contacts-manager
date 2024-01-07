import validator from "validator";

export default class Contact {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
    console.log(this.form);
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
    const firstNameInput = el.querySelector("input[name=firstName]");
    const emailInput = el.querySelector("input[name=email]");
    const phoneNr = el.querySelector("input[name=phoneNr]");

    let error = false; //boolean error flag

    el.querySelectorAll(".error").forEach((errorMsg) => {
      errorMsg.remove(); //remove any existing error messages
    });

    if (!firstNameInput.value) {
      let p = document.createElement("p");
      let errorMsg = document.createTextNode("Please enter your first name");
      p.appendChild(errorMsg);
      p.classList.add(
        "mt-1",
        "alert-danger",
        "error",
        "rounded",
        "px-2",
        "d-inline-block"
      );
      firstNameInput.after(p);
      error = true;
    }

    if (!emailInput.value && !phoneNr.value) {
      let p = document.createElement("p");
      let errorMsg = document.createTextNode(
        "Email or phone number, one is required"
      );
      p.appendChild(errorMsg);
      p.classList.add(
        "mt-1",
        "alert-danger",
        "error",
        "rounded",
        "px-2",
        "d-inline-block"
      );
      const genErr = el.querySelector('span[class="genErr"]');
      genErr.after(p);
      error = true;
    }

    //Email checking if its valid
    if (emailInput.value && !validator.isEmail(emailInput.value)) {
      let p = document.createElement("p");
      let errorMsg = document.createTextNode("Invalid email address");
      p.appendChild(errorMsg);
      p.classList.add(
        "mt-1",
        "alert-danger",
        "error",
        "rounded",
        "px-2",
        "d-inline-block"
      );
      emailInput.after(p);
      error = true;
    }

    if (!error) {
      el.submit();
    }
  }
}

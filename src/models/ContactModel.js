const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  phoneNr: { type: String, required: false, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

//Constructor function
function Contact(body) {
  this.body = body;
  this.errors = [];
  this.contact = null;
}

Contact.searchId = async function (id) {
  if (typeof id !== "string") return;
  const user = await ContactModel.findById(id);
  return user;
};

Contact.prototype.register = async function () {
  this.validate();

  if (this.errors.length > 0) return;

  this.contact = await ContactModel.create(this.body);
};

Contact.prototype.validate = function () {
  this.cleanUp();

  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push("Invalid email address");

  if (!this.body.firstName) this.errors.push("First name field is required");
  if (!this.body.email && !this.body.phoneNr)
    this.errors.push("Email or phone number, one of the fields is required");
};

Contact.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  this.body = {
    firstName: this.body.firstName,
    lastName: this.body.lastName,
    email: this.body.email,
    phoneNr: this.body.phoneNr,
  };
};

Contact.prototype.edit = async function (id) {
  if (typeof id !== "string") return;
  this.validate();
  if (this.errors.length > 0) return;
  //Find the id in db and update the contact
  this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {
    new: true,
  });
};

module.exports = Contact;

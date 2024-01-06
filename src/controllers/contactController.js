const Contact = require("../models/ContactModel");

module.exports.index = (req, res) => {
  res.render("contact");
};

module.exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => res.redirect("/contact/index"));
      return;
    }

    req.flash("success", "Successfully saved!");
    req.session.save(() =>
      res.redirect(`/contact/index/${contact.contact._id}`)
    );
    return;
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

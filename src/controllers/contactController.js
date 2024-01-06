const Contact = require("../models/ContactModel");

module.exports.index = (req, res) => {
  res.render("contact", { contact: {} });
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

module.exports.editIndex = async (req, res) => {
  if (!req.params.id) res.render("404");
  const contact = await Contact.searchId(req.params.id);
  console.log(contact);

  if (!contact) res.render("404");
  res.render("contact", { contact });
};

module.exports.edit = async (req, res) => {
  try {
    if (!req.params.id) res.render("404");
    const contact = new Contact(req.body);
    await contact.edit(req.params.id);

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() =>
        res.redirect("/contact/index/${contact.contact._id}")
      );
      return;
    }

    req.flash("success", "Successfully edited !");
    req.session.save(() =>
      res.redirect(`/contact/index/${contact.contact._id}`)
    );
    return;
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

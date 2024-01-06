const Contact = require("../models/ContactModel");

module.exports.index = async (req, res) => {
  const contacts = await Contact.searchContacts();
  res.render("index", { contacts }); //injecting contacts in the view index
};

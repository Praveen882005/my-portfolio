const Contact = require("../models/Contact");

exports.sendMessage = async (req, res) => {
  const contact = await Contact.create(req.body);

  res.json(contact);
};

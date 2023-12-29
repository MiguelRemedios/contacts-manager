module.exports.homepage = (req, res) => {
  res.render("index");
  return;
};

module.exports.postForm = (req, res) => {
  console.log(req.body);
  res.send(`Your POST result is: ${req.body.name}`);
  return;
};

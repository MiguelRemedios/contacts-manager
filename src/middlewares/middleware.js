module.exports.middleware = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
  next();
};

module.exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }
};

module.exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

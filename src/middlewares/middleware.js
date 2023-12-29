module.exports.middleware = (req, res, next) => {
  // console.log("MIDDLEWARE GLOBAL");
  next();
};

module.exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }
};

module.exports.csrfMiddleware = (req, res, next) => {
  // console.log(req);
  res.locals.csrfToken = req.csrfToken();
  next();
};

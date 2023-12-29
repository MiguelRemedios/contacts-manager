require("dotenv").config();

const express = require("express");
const app = express();
const helmet = require("helmet");
const crsf = require("csurf");
const path = require("path");
const port = 3000;
const routes = require("./routes");

//MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    app.emit("mongoConnection");
  })
  .catch((err) => console.log("Eror in the connection!", err));

//Session Cookie
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const sessionOptions = session({
  secret: "texto q ninguem vai saber",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, //tempo q vai durar o cookie (7dias)
    httpOnly: true,
  },
  store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
});

const {
  middleware,
  checkCsrfError,
  csrfMiddleware,
} = require("./src/middlewares/middleware");

app.use(helmet());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(crsf());
app.use(middleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on("mongoConnection", () => {
  app.listen(port, () => {
    console.log("Server listening on port: " + port);
  });
});

const express = require("express");
const app = express();
const config = require("config");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(
  config.get("app.prefixApiVersion"),
  require(`${__dirname}/../routers/web`)
);

app.use(
  session({
    secret: config.app.session_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

module.exports = app;

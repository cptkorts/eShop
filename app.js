require("dotenv").config({ path: ".env.local" });

const path = require("path");
const fs = require("fs");
const https = require("https");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.goiipf1.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const csrfProtection = csrf();

const fileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "shop-products",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const accessLogStream =
  process.env.NODE_ENV === "production"
    ? process.stdout
    : fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "https://res.cloudinary.com"],
        "script-src": ["'self'"],
      },
    },
  })
);
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(multer({ storage: fileStorage }).single("image"));

app.use(express.static(path.join(__dirname, "public")));
if (process.env.NODE_ENV !== "production") {
  app.use("/images", express.static(path.join(__dirname, "images")));
}
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  // res.render(error.httpStatusCode).render(...);
  // res.redirect("/500");
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
    csrfToken: "",
  });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));

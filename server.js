const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const helment = require("helmet"); // for security
const bodyPraser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");

const UserModel = require("./model/User");

require("dotenv").config();

//const routes = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

//db setup
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

// some logs to check
mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});

// middlewares setup
app.use(
  cors({
    credentials: true
  })
);
app.use(express.json());
app.use(bodyPraser.urlencoded({ extended: false }));
app.use(helment());

// express session setup
app.use(
  session({ secret: "project_mhc", saveUninitialized: false, resave: false })
);

// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy((username, password, done) => {
    UserModel.User.findOne({ username: username })
      .exec()
      .then(user => {
        if (!user) return done(null, false, { message: "incorrect username" });
        if (user.password !== password)
          return done(null, false, { message: "incorrect password" });
        return done(null, user);
      })
      .catch(err => {
        return done(err);
      });
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.User.findById(id, (err, user) => {
    done(err, user);
  });
});

// frontend path
app.use(express.static(path.join(__dirname, "client/build")));

// setup routings
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
//Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(port, () => {
  console.log(`server started ${port}`);
});

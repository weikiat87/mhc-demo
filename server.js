const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require('./routes');
const helment = require('helmet');    // for security
const session = require('express-session');

require("dotenv").config();

//const routes = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

//db setup
mongoose
  .connect(process.env.DBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })

// some logs to check
mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});

// middlewares setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helment());


// for testing only
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`server started ${port}`);
});

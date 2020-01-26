const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require('./routes');
require("dotenv").config();

//const routes = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

//db setup
mongoose
  .connect(process.env.DBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
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


// for testing only
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`server started ${port}`);
});

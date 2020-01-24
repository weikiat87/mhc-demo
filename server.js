const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors);
app.use(express.json());

app.listen(port, () => {
  console.log(`server listening on :${port}`);
});

app.get("/", (req, res) => { res.send('hello world')});

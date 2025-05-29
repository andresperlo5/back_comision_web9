//require("dotenv").config();
require("./src/db/config.db");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api", require("./src/routes/index.routes"));

app.listen(process.env.PORT, () => {
  console.log("Servidor andando en el puerto", process.env.PORT);
});

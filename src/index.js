//require("dotenv").config();
require("./db/config.db");
const express = require("express");
const morgan = require("morgan");
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api", require("./routes/index.routes"));

app.listen(process.env.PORT, () => {
  console.log("Servidor andando en el puerto", process.env.PORT);
});

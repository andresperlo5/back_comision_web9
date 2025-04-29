const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_ACCESS)
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

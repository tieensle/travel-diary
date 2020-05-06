const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const middlerwares = require("./middlewares");
const logs = require("./api/logs");
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/logs", logs);

// NOT FOUND HANDLER MIDDLEWARE
app.use(middlerwares.notFound);
// eslint-disable-next-line no-unsaved-vars
//HANDLER EVERYTHING ERORR
app.use(middlerwares.errorHandler);

app.listen(PORT, () => {
  console.log(`Listening at port: http://localhost:${PORT}`);
});

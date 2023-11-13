import express from "express";
import router from "./router.js";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import configDatabase from "./API/Database/Config.js";
import Middlware from "./API/Middleware/Middleware.js";

const app = express();
configDotenv();

const hostname = process.env.NODE_HOST;
const port = process.env.NODE_PORT;

// configuration database
configDatabase;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    messgae: "test success",
  });
});

app.use("/api/v1", router);

app.use(Middlware.notFound404);

app.listen(port, hostname, () => {
  if (hostname == "127.0.0.1" || hostname == "localhost") {
    console.log(`Server started on http://${hostname}:${port}`);
  } else {
    console.log(`Server started on https://${hostname}`);
  }
});

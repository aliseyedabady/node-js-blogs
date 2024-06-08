import express from "express";
import bodyParser from "body-parser";
import { api } from "./routes/api";
import * as dotenv from "dotenv";
import knex from "./lib/db";
import i18n from "i18n";
import cors from "cors";
import upload from "./lib/upload";

dotenv.config();

const app = express();

const port = process.env.PORT;

i18n.configure({
  locales: ["en", "fa"],
  directory: __dirname + "/translations",
  defaultLocale: "en",
  queryParameter: "lang",
  header: "accept-language",
  autoReload: true,
  updateFiles: false,
});

app.use(i18n.init);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/test", upload.single("image"), (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

knex.queryBuilder();

app.use(api);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;

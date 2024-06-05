import express from "express";
import bodyParser from "body-parser";
import { api } from "./routes/api";
import * as dotenv from "dotenv";
import knex from "./lib/db";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

knex.queryBuilder();

app.use(api);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;

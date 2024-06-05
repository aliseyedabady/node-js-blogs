import express from "express";
import bodyParser from "body-parser";
import { api } from "./routes/api";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
console.log(process.env);
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(api);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;

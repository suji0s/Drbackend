import express from "express";
import cors from "cors";
import mongoose from "./db/db.js";
import routes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const app = express();
// to connect middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
//for file uploading folder created as public
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("App is running @ http://localhost :4001/");
});

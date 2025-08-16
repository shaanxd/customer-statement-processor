import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { statementRoutes } from "./routes";

const app = express();

/** Enabled all origins for now */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));

/** Health API endpoint */
app.get("/api/health", async (_req, res) => {
  res.status(200).json({ message: "API Health sehr gut...." });
});

app.use("/api/statement", statementRoutes);

/** Initial listener to test out. */
app.listen(3000, () => {
  console.log("App is running!");
});

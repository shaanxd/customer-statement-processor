import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import TransactionRoutes from "./routes/transaction";
import AppRoutes from "./routes/app";
import StorageRoutes from "./routes/storage";

const app = express();

/** Enabled all origins for now */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));

const router = express.Router();

router.use("/statement", TransactionRoutes);
router.use("/storage", StorageRoutes);
router.use(AppRoutes);

app.use("/api", router);

/** Initial listener to test out. */
app.listen(3000, () => {
  console.log("App is running!");
});

import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import TransactionRoutes from "./routes/transaction";
import AppRoutes from "./routes/app";
import StorageRoutes from "./routes/storage";
import APIError from "./exceptions";

const app = express();

/** Enabled all origins for now */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));

const router = express.Router();

router.use("/transactions", TransactionRoutes);
router.use("/storage", StorageRoutes);
router.use(AppRoutes);

app.use("/api", router);

/**
 * Default response handler for exceptions
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status((err as APIError).status || 500).json({
    message: err.message || "Internal server error",
  });
});

/** Initial listener to test out. */
app.listen(3000, () => {
  console.log("App is running!");
});

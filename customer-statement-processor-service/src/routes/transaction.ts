import express from "express";

import TransactionController from "../controllers/transaction";
import upload from "../utilities/upload";
import exceptionHandler from "../exceptions/handler";

const router = express.Router();

router.post(
  "/validate",
  upload.single("file"),
  exceptionHandler(TransactionController.postValidateTransactions)
);

export default router;

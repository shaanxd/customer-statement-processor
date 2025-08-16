import express from "express";

import StatementController from "../controllers/statement";
import upload from "../utilities/upload";

const router = express.Router();

router.post(
  "/validate",
  upload.single("file"),
  StatementController.validateStatement
);

export default router;

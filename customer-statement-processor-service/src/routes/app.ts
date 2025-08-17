import express from "express";

import AppController from "../controllers/app";

const router = express.Router();

router.get("/health", AppController.getAPIHealth);

export default router;

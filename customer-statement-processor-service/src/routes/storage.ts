import express from "express";

const router = express.Router();

/**
 * Based on the assumption that there is a separate auth service. TODO: Introduce
 * an authwall with a token middleware */
router.use("/reports", express.static("storage/reports"));

export default router;

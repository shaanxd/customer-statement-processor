import { Request, Response } from "express";
import fs from "fs";
import { parse as parseCSV } from "csv-parse/sync";
import { XMLParser } from "fast-xml-parser";
import { isMatchingExtension } from "../utilities/file";
import {
  getTransactionsFromCSV,
  getTransactionsFromXML,
} from "../utilities/statement";
import { Transaction } from "../types";

const validateStatement = async (request: Request, response: Response) => {
  /** We can assume that the file buffer is populated due to the multer validation
   * in the previous callback */
  const file = request.file!;
  /** Check if the file is a CSV file. */
  const isCSV = isMatchingExtension(request.file!, /csv/);

  let transactions: Transaction[];

  if (isCSV) {
    transactions = getTransactionsFromCSV(file);
  } else {
    transactions = getTransactionsFromXML(file);
  }

  response.status(200).json({ message: transactions });
};

export default { validateStatement };

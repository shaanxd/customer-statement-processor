import { Request, Response } from "express";

import { isMatchingExtension } from "../utilities/file";
import {
  getValidatedTransactions,
  getTransactionsFromCSV,
  getTransactionsFromXML,
  writeTransactionsToPdf,
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

  /** Get invalid transactions from the above read transactions. */
  const { valid, invalid } = getValidatedTransactions(transactions);

  await writeTransactionsToPdf(file.filename.split(".")[0]!, invalid);

  response.status(200).json({ message: { valid, invalid } });
};

export default { validateStatement };

import { Request, Response } from "express";

import { isMatchingExtension } from "../utilities/file";
import {
  getValidatedTransactions,
  getTransactionsFromCSV,
  getTransactionsFromXML,
  writeTransactionsToPdf,
} from "../utilities/transaction";

const postValidateTransactions = async (
  request: Request,
  response: Response
) => {
  /** We can assume that the file buffer is due to the multer
   * validation in the previous callback */
  const file = request.file!;
  /**
   * Get file name without extension since we know that the
   * filename would be a uuid here.
   */
  const fileName = file.filename.split(".")[0] || "";

  /** Check if the file is a CSV file. */
  const isCSV = isMatchingExtension(request.file!, /csv/);

  /**
   * If not CSV we parse it as an XML. No need to validate
   * here due to the multer filterFile. */
  const parsingFunc = isCSV ? getTransactionsFromCSV : getTransactionsFromXML;
  const transactions = parsingFunc(file);

  /** Get invalid transactions from the above read transactions. */
  const { valid, invalid } = getValidatedTransactions(transactions);

  /** Write transactions to PDF */
  await writeTransactionsToPdf(fileName, invalid);

  response.status(200).json({ valid, invalid });
};

export default { postValidateTransactions };

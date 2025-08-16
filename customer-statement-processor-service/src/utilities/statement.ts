import fs from "fs";
import { parse } from "csv-parse/sync";
import { XMLParser } from "fast-xml-parser";
import { Transaction } from "../types";

export const getTransactionsFromCSV = (file: Express.Multer.File) => {
  try {
    /** Read the file content to a buffer */
    const data = fs.readFileSync(file.path);

    const parsedCSVData = parse(data, { delimiter: ",", from_line: 2 });

    const transactions: Transaction[] = [];

    for (const transaction of parsedCSVData) {
      const [
        reference = "",
        accountNumber = "",
        description = "",
        startBalance = "",
        mutation = "",
        endBalance = "",
      ] = transaction;

      transactions.push({
        reference,
        accountNumber,
        description,
        startBalance: Number(startBalance),
        mutation: Number(mutation),
        endBalance: Number(endBalance),
      });
    }

    return transactions;
  } catch (error) {
    throw new Error("Error occurred while parsing XML data. Please try again.");
  }
};

export const getTransactionsFromXML = (file: Express.Multer.File) => {
  try {
    /** Read the file content to a buffer */
    const data = fs.readFileSync(file.path);

    const {
      records: { record },
    } = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    }).parse(data);

    return record as Transaction[];
  } catch (error) {
    throw new Error("Error occurred while parsing XML data. Please try again.");
  }
};

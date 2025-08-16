import fs from "fs";
import { parse } from "csv-parse/sync";
import { XMLParser } from "fast-xml-parser";
import PDFDocument from "pdfkit";

import { Transaction, FailedTransaction } from "../types";

export const getTransactionsFromCSV = (file: Express.Multer.File) => {
  try {
    /** Read the file content to a buffer */
    const data = fs.readFileSync(file.path);
    /** Need to ignore first line since we know what the data is already */
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

      /** TODO: Add yup validation to make sure that the transaction fits the schema */
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
      /** Set ignore attributes to false because reference is an attr of record. */
      ignoreAttributes: false,
      /** Replace the default @_ prefix with empty string */
      attributeNamePrefix: "",
    }).parse(data);

    /** TODO: Add yup validation to make sure that the transaction fits the schema */
    return record as Transaction[];
  } catch (error) {
    throw new Error("Error occurred while parsing XML data. Please try again.");
  }
};

export const isTransactionBalanceValid = ({
  startBalance,
  mutation,
  endBalance,
}: Transaction) =>
  /** Based on assumption that the calculation will always fixed to the nearest second decimal. */

  Math.round((startBalance + mutation) * 100) / 100 === endBalance;

export const getValidatedTransactions = (transactions: Transaction[]) => {
  try {
    const uniqueRefs: Record<string, number> = {};
    const valid: Transaction[] = [];
    const invalid: FailedTransaction[] = [];

    for (const transaction of transactions) {
      const issues = [];

      const isUniqueReference = uniqueRefs[transaction.reference];
      const isBalanceValid = isTransactionBalanceValid(transaction);

      if (isUniqueReference) {
        issues.push("Duplicate reference value.");
      } else {
        uniqueRefs[transaction.reference] = 1;
      }

      if (!isBalanceValid) {
        issues.push("Math ain't mathing.");
      }

      if (issues.length !== 0) {
        invalid.push({ ...transaction, issues });
      } else {
        valid.push(transaction);
      }
    }

    return { valid, invalid };
  } catch (error) {
    throw new Error(
      "Error occurred while validating transaction data. Please try again."
    );
  }
};

export const writeTransactionsToPdf = (
  filename: string,
  transactions: FailedTransaction[]
) =>
  new Promise((resolve, reject) => {
    const doc = new PDFDocument({ layout: "landscape" });
    const date = new Date();

    const stream = fs.createWriteStream(`storage/reports/${filename}.pdf`);
    doc.pipe(stream);

    /** Increase font size and write the title for the document. */
    doc.fontSize(24);
    doc.text(`Invalid transactions report.`);

    /** Write a small description on when the report was generated and based on which file. */
    doc.fontSize(11);
    doc.text(
      `Report generated based on file ${filename} on ${date.toDateString()} at ${date.toTimeString()}`
    );
    doc.moveDown();

    /** Write the table data. */
    doc.fontSize(10);
    doc.table({
      data: [
        [
          "Reference",
          "Account Number",
          "Description",
          "Start Balance",
          "Mutation",
          "End Balance",
          "Issues",
        ],
        ...transactions.map(
          ({
            reference,
            accountNumber,
            description,
            startBalance,
            mutation,
            endBalance,
            issues,
          }) => [
            reference,
            accountNumber,
            description,
            startBalance.toString(),
            mutation.toString(),
            endBalance.toString(),
            issues.join("\n"),
          ]
        ),
      ],
    });
    doc.end();

    stream.on("finish", () => {
      resolve(true);
    });
    stream.on("error", () => {
      reject();
    });
  });

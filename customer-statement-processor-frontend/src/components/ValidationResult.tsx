import type { FC } from "react";

import type { ValidateTransactionResponse } from "../api/types";
import Table from "./Table";

type ValidationResultProps = {
  data: ValidateTransactionResponse;
  onClear: () => void;
};

const ValidationResult: FC<ValidationResultProps> = ({ data, onClear }) => {
  const { invalid } = data;

  return (
    <div
      data-testid="statement-validation-result"
      className="w-full flex flex-col flex-1 gap-4"
    >
      {invalid.length !== 0 ? (
        <span>
          Found{" "}
          <span className="text-error">
            {invalid.length} invalid transaction
            {invalid.length === 1 ? "" : "s"}.
          </span>{" "}
          Please find the references an their issues listed below. A PDF has
          been generated with the below information which you can find{" "}
          <a
            className="text-primary"
            href={`${import.meta.env.VITE_API_URL}${data.filePath}`}
            target="_blank"
          >
            here
          </a>
          .
        </span>
      ) : (
        <span className="text-success text-center">
          No issues with the transaction statement. No report has been generated
          for this validation.
        </span>
      )}
      {invalid.length !== 0 && (
        <Table headers={["Reference", "Description", "Issues"]}>
          {invalid.map((transaction, idx) => {
            return (
              <tr
                key={`${transaction.reference}-${idx}`}
                className="font-bold [&>*]:p-2"
              >
                <td>{transaction.reference}</td>
                <td>{transaction.description}</td>
                <td className="whitespace-pre-line">
                  {transaction.issues?.join("\n")}
                </td>
              </tr>
            );
          })}
        </Table>
      )}
      <button className="btn btn-primary" onClick={onClear}>
        Vaidate New Statement
      </button>
    </div>
  );
};

export default ValidationResult;

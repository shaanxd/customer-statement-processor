import type { FC } from "react";
import { usePostValidateTransactionsMutation } from "../api";
import ValidationForm from "./ValidationForm";
import ValidationResult from "./ValidationResult";
import toast from "react-hot-toast";

const TransactionProcessor: FC = () => {
  const [postValidateTransaction, { isLoading, data, reset }] =
    usePostValidateTransactionsMutation();

  const handleOnValidationSubmit = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return postValidateTransaction(formData).unwrap();
  };

  const handleOnValidation = (file: File) => {
    toast.promise(handleOnValidationSubmit(file), {
      loading: "Validating Transaction Statement...",
      success: "File validated successfully!",
      error: (err) => err.data.message,
    });
  };

  const handleOnResultClear = () => {
    reset();
  };

  return (
    <div className="flex flex-col w-full max-w-[800px] card p-[32px] bg-base-300 text-base-content">
      <h1 className="text-center">Customer Transaction Processor</h1>
      {data ? (
        <ValidationResult data={data} onClear={handleOnResultClear} />
      ) : (
        <ValidationForm isLoading={isLoading} onSubmit={handleOnValidation} />
      )}
    </div>
  );
};

export default TransactionProcessor;

import type { FC } from "react";
import { useForm } from "react-hook-form";

type ValidationFormProps = {
  isLoading: boolean;
  onSubmit: (file: File) => void;
};

type FormContentType = {
  file: File[];
};

const ValidationForm: FC<ValidationFormProps> = ({ isLoading, onSubmit }) => {
  const { register, handleSubmit } = useForm<FormContentType>();

  const handleFormSubmit = async ({ file }: FormContentType) => {
    onSubmit(file[0]);
  };

  return (
    <form
      data-testid="statement-validation-form"
      className="flex flex-col flex-1 w-full shadow-sm gap-4"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <span>
        Welcome to the Rabobank customer transaction processor! Please select a
        file from the input below to validate a transaction statement. Only{" "}
        <span className="text-primary">CSV or XML</span> formats are supported
        at the moment.
      </span>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Pick a file</legend>
        <input
          disabled={isLoading}
          type="file"
          accept=".csv,text/csv,application/xml,text/xml,.xml"
          multiple={false}
          className="file-input file-input-primary w-full"
          {...register("file", {
            required: true,
            validate: (files) => {
              if (/csv|xml/.test(files[0]?.type)) {
                return true;
              }
              return "Only CSV or XML files are allowed.";
            },
          })}
        />
      </fieldset>
      <button disabled={isLoading} className="btn btn-primary" type="submit">
        Submit!
      </button>
    </form>
  );
};

export default ValidationForm;

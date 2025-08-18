export type Transaction = {
  reference: string;
  accountNumber: string;
  description: string;
  startBalance: number;
  mutation: number;
  endBalance: number;
  issues?: string[];
};

export type ValidateTransactionResponse = {
  valid: Transaction[];
  invalid: Transaction[];
  filePath: string;
};

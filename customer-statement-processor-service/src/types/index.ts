export type Transaction = {
  reference: string;
  accountNumber: string;
  description: string;
  startBalance: number;
  mutation: number;
  endBalance: number;
};

export type FailedTransaction = Transaction & { issues: string[] };

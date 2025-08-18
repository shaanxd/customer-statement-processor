import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { ValidateTransactionResponse } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (build) => ({
    /** transactions endpoints */
    postValidateTransactions: build.mutation<
      ValidateTransactionResponse,
      FormData
    >({
      query: (body) => ({
        url: "transactions/validate",
        method: "POST",
        body,
        formData: true,
      }),
    }),
  }),
});

export const { usePostValidateTransactionsMutation } = api;

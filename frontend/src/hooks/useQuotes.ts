import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

// This type is used to represent a quote
export type Quote = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

// This type is used to create a new quote
export type NewQuote = {
  author: string;
  text: string;
};

// This type is used to delete a quote
export type deleteQuote = {
  id: string;
};

// Fetch quotes
export const useQuotes = () => {
  return useQuery<Quote[]>({
    queryKey: ["quotes"],
    queryFn: async () => {
      const res = await api.get("/quotes");
      return res.data;
    },
  });
};

// Create quote
export const useCreateQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newQuote: NewQuote) => {
      await api.post("/quotes", newQuote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
};

// Delete quote
export const useDeleteQuote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (quoteId: string) => {
      await api.delete(`/quotes/${quoteId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
};

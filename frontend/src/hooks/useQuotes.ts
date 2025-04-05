import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

export type Quote = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

export type NewQuote = {
  author: string;
  text: string;
};

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

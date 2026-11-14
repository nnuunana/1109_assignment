
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todo";

export const useTodosData = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 5000,
    refetchInterval: 10000,
  });
};

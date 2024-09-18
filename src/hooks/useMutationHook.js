import { useMutation } from "@tanstack/react-query";

export const useMutationHooks = (fnCallback) => {
  // Mutations
  const mutation =  useMutation({ mutationFn: fnCallback });
  return mutation;
};

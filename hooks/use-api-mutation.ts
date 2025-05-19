import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = <T>(mutationFn: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFn);

  const mutate = async (payload: T) => {
    setPending(true);
    try {
      let res: any;
      res = await apiMutation(payload);

      return res;
    } catch (err) {
      throw err;
    } finally {
      setPending(false);
    }
  };

  return { mutate, pending };
};

import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

/**
 * Hook that execute a function when a query parameter changes
 * @param func
 */
export const useQueryChanged = (func: () => void) => {
  const query = useRef<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const queryString = JSON.stringify(router.query);
      if (query.current != null && queryString != query.current) {
        func();
      }
      query.current = queryString;
    }
  }, [router.query]);
};

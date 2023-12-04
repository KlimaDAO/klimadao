import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

/**
 * Counts the number of times the url query changed
 * @param func
 */
export const useQueryChanges = () => {
  const changes = useRef<number>(0);
  const query = useRef<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const queryString = JSON.stringify(router.query);
      if (query.current != null && queryString != query.current) {
        changes.current++;
      }
      query.current = queryString;
    }
  }, [router.query]);
  return changes.current;
};

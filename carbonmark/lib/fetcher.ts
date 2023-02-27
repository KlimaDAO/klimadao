type FetchArgs = [input: RequestInfo | URL, init?: RequestInit];

/** A generic fetch function to deconstruct fetch responses. Used primarily for SWR  */
export const fetcher = async <T>(...args: FetchArgs): Promise<T> => {
  const res = await fetch(...args);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    throw new Error((await res.json()).message);
  }

  return res.json();
};

export const DEFAULT_NONCE = "33";
export const generateNonce = (): string =>
  Math.floor(Math.random() * 1_000_000_000).toString();

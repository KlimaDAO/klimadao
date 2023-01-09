// Secrets should never be exposed on the client
export const FIREBASE_ADMIN_CERT = process.env.FIREBASE_ADMIN_CERT;
export const INFURA_ID = process.env.INFURA_ID as string;
export const LIVE_OFFSET_WALLET_MNEMONIC =
  process.env.LIVE_OFFSET_WALLET_MNEMONIC;
export const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

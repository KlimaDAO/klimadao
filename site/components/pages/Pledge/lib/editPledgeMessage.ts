export const editPledgeMessage = (nonce: string): string =>
  `Sign to authenticate ownership and edit your Klima Infinity pledge 💚\n\nSignature nonce: ${nonce}`;

export const approveSecondaryWallet = (nonce: string): string =>
  `Sign to authenticate ownership and pin your wallet to this pledge 💚\n\nSignature nonce: ${nonce}`;

export const removeSecondaryWallet = (nonce: string): string =>
  `Sign to authenticate ownership and remove your wallet from this pledge 💚\n\nSignature nonce: ${nonce}`;

// This function generates a random nonce (number used once) by creating a random number,
// adding 1 to it, converting it to a base-36 string, and then removing the first two characters.
// The resulting string can be used as a unique identifier for a single-use purpose.
export const generateNounce = () =>
  (Math.random() + 1).toString(36).substring(2);

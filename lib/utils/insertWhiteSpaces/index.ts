/**
 * Inserts a zero width white space after the given character in the given text
 */
export const insertWhiteSpaces = (params: {
  text: string;
  after: string;
}): string => {
  return params.text.replaceAll(params.after, `${params.after}\u200B`);
};

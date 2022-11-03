/** Remove protocol (http/https), www prefixes and trailing slashes from a given url*/
export const prettifyUrl = (url: string) =>
  url
    .replace(/http(s)?(:\/\/)/, "")
    .replace(/(www.)?/, "")
    .replace(/\/$/, "");

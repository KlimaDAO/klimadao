export const convertCountryCodeToName = (code: string) => {
  if (!code) return;
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const country = regionNames.of(code);
  return country;
};

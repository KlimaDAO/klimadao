export const convertIcrCountryCodeToName = (code: string) => {
  if (!code) return;
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const country = regionNames.of(code);
  return country;
};

export const createICRProjectID = (serialization: string) => {
  const elements = serialization.split("-");
  const registry = elements[0];
  const num = elements[3];
  return `${registry}-${num}`;
};

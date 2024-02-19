import { isArray } from "lodash";
import fetch from "node-fetch";
import { NetworkParam } from "src/models/NetworkParam.model";
import { ICR_API } from "../../../src/app.constants";

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

export const fetchIcrFilters = async (network: NetworkParam) => {
  const { ICR_API_URL, ICR_API_KEY } = ICR_API(network);

  const url = `${ICR_API_URL}/public/projects/filters`;
  const IcrResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ICR_API_KEY}`,
    },
  });

  const { vintages: IcrVintages, countryCodes: IcrCountryCodes } =
    await IcrResponse.json();

  if (!isArray(IcrCountryCodes) || !isArray(IcrVintages)) {
    throw new Error("Response from server did not match schema definition");
  }

  const countryNames = await Promise.all(
    IcrCountryCodes.map((countryCode: string) =>
      convertIcrCountryCodeToName(countryCode)
    )
  );

  return { IcrVintages, countryNames };
};

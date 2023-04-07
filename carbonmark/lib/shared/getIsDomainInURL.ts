import { isENSDomain, isKNSDomain } from "@klimadao/lib/utils";

export const getIsDomainInURL = (domain: string) =>
  isKNSDomain(domain) || isENSDomain(domain);

import { includes } from "lodash";
import { notNil } from "./functional.utils";

const standards = ["VCS", "PURO", "ICR", "GS"] as const;

/** Known supported standards on-chain */
export type Standard = (typeof standards)[number];
/** Project id number as it appears in the registry, stringified to preserve leading zeros @example "191" */
export type RegistryProjectId = string;
/** Credit vintage @example 2008 */
export type Vintage = string;
/** @example "VCS-191" */
export type ProjectIdentifier = `${Standard}-${RegistryProjectId}`;
/** Full credit id, converted to uppercase @example "VCS-191-2008" */
export type CreditIdentifier = `${ProjectIdentifier}-${Vintage}`;

type UntypedParams = {
  standard: string;
  vintage: string;
  registryProjectId: string;
};

/**
 * Utility class for more safety and consistency when dealing with Project and credit Ids.
 *
 * Convenient accessors for standard, registryProjectId, vintage, projectId
 * Convenient utility methods for validating or splitting an id
 * Converts to uppercase
 */
export class CreditId {
  standard: Standard;
  registryProjectId: RegistryProjectId;
  vintage: Vintage;
  projectId: ProjectIdentifier;
  creditId: CreditIdentifier;

  public static ValidCreditIdRegex =
    /^(VCS|PURO|ICR|GS)-\d+-(19\d{2}|20\d{2})$/i;
  public static ValidProjectIdRegex = /^(VCS|PURO|ICR|GS)-\d+$/i; // case insensitive

  constructor(params: UntypedParams);
  constructor(params: string);
  constructor(params: string | UntypedParams) {
    if (CreditId.ValidCreditIdRegex.test(String(params))) {
      const [standard, registryProjectId, vintage] = CreditId.splitCreditId(
        String(params)
      );
      this.standard = standard;
      this.registryProjectId = registryProjectId;
      this.vintage = vintage;
      this.projectId = `${standard}-${registryProjectId}`;
      this.creditId = `${this.projectId}-${vintage}`;
    } else if (CreditId.isValidParams(params)) {
      const [standard, registryProjectId, vintage] = CreditId.splitCreditId(
        `${params.standard}-${params.registryProjectId}-${params.vintage}` // type guard & capitalize
      );
      this.standard = standard;
      this.registryProjectId = registryProjectId;
      this.vintage = vintage;
      this.projectId = `${standard}-${registryProjectId}`;
      this.creditId = `${this.projectId}-${vintage}`;
    } else {
      throw new Error(`Failed to parse CreditId: ${params}`);
    }
  }

  toString(): string {
    return this.creditId;
  }

  /** Case insensitive type-guard @example isValidCreditId("Vcs-191-2008") // true */
  static isValidCreditId = (
    id: unknown
  ): id is `${string}-${string}-${string}` =>
    CreditId.ValidCreditIdRegex.test(String(id));

  /** Case insensitive type-guard @example isValidProjectId("vcs-191") // true */
  static isValidProjectId = (id: unknown): id is `${string}-${string}` =>
    CreditId.ValidProjectIdRegex.test(String(id));

  /* eslint-disable @typescript-eslint/consistent-type-assertions -- type guards */
  /** Validates, splits and capitalizes a CreditIdentifier string */
  static splitCreditId(
    creditId: string
  ): [Standard, RegistryProjectId, Vintage] {
    if (!this.isValidCreditId(creditId)) throw new Error("Invalid CreditId");
    const [standard, registryProjectId, vintage] = creditId.split("-");
    return [standard.toUpperCase() as Standard, registryProjectId, vintage];
  }

  /** Validates, splits and capitalizes a ProjectIdentifier string */
  static splitProjectId(projectId: string): [Standard, RegistryProjectId] {
    if (!this.isValidProjectId(projectId)) throw new Error("Invalid ProjectId");
    const [standard, registryProjectId] = projectId.split("-");
    return [standard.toUpperCase() as Standard, registryProjectId];
  }

  //
  // << Private Methods >>
  //

  private static isValidParams(params: unknown): params is UntypedParams {
    if (!params || typeof params !== "object") return false;
    const typedParams = params as Partial<UntypedParams>;
    return (
      includes(standards, typedParams.standard?.toUpperCase()) &&
      notNil(Number(typedParams.registryProjectId)) &&
      notNil(Number(typedParams.vintage))
    );
  }
}

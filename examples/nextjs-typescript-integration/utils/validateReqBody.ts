import { isAddress } from "ethers";

export interface ValidParams {
  quantity: number;
  retirementMessage: string;
  beneficiaryName: string;
  projectTokenAddress: string;
  pool: "bct" | "nct" | "ubo" | "nbo";
}

export const DEFAULT_QUANTITY = 0.001;

export const validateReqBody = (body: any | ValidParams): ValidParams => {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body");
  }
  if (body.quantity !== DEFAULT_QUANTITY) {
    throw new Error(
      "This demo app only supports a retirement quantity of 0.001 tonnes"
    );
  }
  if (!body.retirementMessage || typeof body.retirementMessage !== "string") {
    throw new Error("Invalid retirement message");
  }
  if (!body.beneficiaryName || typeof body.beneficiaryName !== "string") {
    throw new Error("Invalid beneficiary name");
  }
  if (!body.projectTokenAddress || !isAddress(body.projectTokenAddress)) {
    throw new Error("Invalid project address");
  }
  if (
    typeof body.pool !== "string" ||
    !["bct", "nct", "ubo", "nbo"].includes(body.pool.toLowerCase())
  ) {
    throw new Error("Invalid pool");
  }
  return body as ValidParams;
};

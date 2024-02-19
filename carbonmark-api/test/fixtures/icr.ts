import { ExPostHolder } from "src/.generated/types/icr.types";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

type PartialExPostHolder = DeepPartial<ExPostHolder>;

export const mockICRHolderResponse: PartialExPostHolder = {
  holder: {
    id: "0x1234abcd5678ef9012345678abcd9012ef345678",
    exPostAmounts: [
      {
        id: "0x1234abcd5678ef9012345678abcd9012ef3456789abcdef1234567890abcdef1234abcd5678ef90",
        amount: "100",
        updatedAt: "1702675170",
        retiredAmount: "60",
        exPost: {
          tokenId: "10",
          vintage: "2020",
          serialization: "ICR-XYZ-123-45678-90-Q-0-2020",
          project: {
            id: "0x9abcdef1234567890abcdef1234567890abcdef12",
            projectName: "Green Energy Initiative",
            blockNumber: "52604627",
            blockTimestamp: "1629820800",
          },
        },
      },
    ],
  },
};

// ICR REST API result

export const COUNTRY_CODES = ["CN", "ES", "GB", "IS", "UA", "VN"];

export const VINTAGES = ["2020", "2021", "2022", "2023"];

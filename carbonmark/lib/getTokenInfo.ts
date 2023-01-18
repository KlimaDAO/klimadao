import { StaticImageData } from "next/legacy/image";
import USDC from "public/icons/USDC.png";

export type MarketplaceToken = "usdc"; // what are the others?

type MarketplaceTokenMap = {
  [key in MarketplaceToken]: {
    key: string;
    icon: StaticImageData;
    label: Uppercase<MarketplaceToken>;
  };
};

export const marketplaceTokenInfoMap: MarketplaceTokenMap = {
  usdc: { key: "usdc", icon: USDC, label: "USDC" },
};

import { DEFAULT_NONCE } from "components/pages/Pledge/lib";
import { Pledge } from "components/pages/Pledge/types";

/** A mock pledge for testing purposes */
export const MockPledge = (resolvedAddress: string): Pledge => ({
  id: "Some Id",
  ownerAddress: resolvedAddress,
  name: "Senkusha",
  nonce: DEFAULT_NONCE,
  profileImageUrl: "https://i.pravatar.cc/300",
  profileWebsiteUrl: "https://www.klimadao.finance/",
  description:
    "“The team over at Senkusha loves the initiative behind Klima! We can’t wait to be a part of this journey for years to come.”",
  methodology:
    "Senkusha calculated its carbon footprint by considering the expected emissions for the year. This takes into consideration of average consumption of the office based in Auckland, the travel demand, material waste and the average minting/transferring cost of our NFT projects. At the end of the year, when new projects are released and published, Senkusha will add them to our carbon footprint according to their conditions.",
  footprint: [
    {
      timestamp: Date.now(),
      total: 140.48,
      categories: [
        { name: "Material Waste", quantity: 0.38 },
        { name: "Travel", quantity: 2.9 },
        { name: "Energy Consumption", quantity: 3.4 },
        { name: "NFT Project", quantity: 133.8 },
      ],
    },
  ],
});

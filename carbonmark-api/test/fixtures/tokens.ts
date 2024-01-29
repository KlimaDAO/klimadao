import { GetPoolPricesQuery } from "src/.generated/types/tokens.types";

/** marketplace.getPoolPrices() */
const prices: GetPoolPricesQuery["prices"] = [
  {
    address: "0x1e67124681b402064cd0abe8ed1b5c79d2e02f64",
    price: "0.2662139137900762593798471167457771",
  },
  {
    address: "0x251ca6a70cbd93ccd7039b6b708d4cb9683c266c",
    price: "0.6629395152476118617131798673901249",
  },
  {
    address: "0x5400a05b8b45eaf9105315b4f2e31f806ab706de",
    price: "0.5056609695991379072725005356605488",
  },
  {
    address: "0x5786b267d35f9d011c4750e0b0ba584e1fdbead1",
    price: "0.8404063680016549864546222474278495",
  },
  {
    address: "0x64a3b8ca5a7e406a78e660ae10c7563d9153a739",
    price: "0.8731274136348536363072045575891244",
  },
  {
    address: "0x9803c7ae526049210a1725f7487af26fe2c24614",
    price: "0.2679990486815185888444633857356913",
  },
  {
    address: "0xdb995f975f1bfc3b2157495c47e4efb31196b2ca",
    price: "1.150502694811154768607786283750761",
  },
];

export const token = {
  symbol: "TCO2-VCS-1764-2020",
  id: "1",
};

/** Fixtures for the tokens subgraph */
const fixtures = {
  prices,
  token,
};

export default fixtures;

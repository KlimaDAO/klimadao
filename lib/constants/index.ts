const mainnet = {
  bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
  mco2: "0xaa7dbd1598251f856c12f63557a4c4397c253cea",
  treasury: "0x7Dd4f0B986F032A44F913BF92c9e8b7c17D77aD7",
  distributor: "0x4cC7584C3f8FAABf734374ef129dF17c3517e9cB",
  klima: "0x4e78011ce80ee02d2c3e649fb657e45898257815",
  aklima: "0xeb935614447185eeea0abc756ff2ddc99fbb9047",
  aklima_migrate: "0x49722300Ab1932e5A1ef11EfdE25885685C7eeD5",
  alklima: "0xd50EC6360f560a59926216Eafb98395AC430C9fD",
  alklima_migrate: "0x4dA274126193B36A972267AeEB02B983d88e64E3",
  pklima: "0x0af5dee6678869201924930d924a435f6e4839c9",
  pklima_exercise: "0xE607d9604AA75D45A866831fc3E87eCAA8A654e7",
  sklima: "0xb0C22d8D350C67420f06F48936654f567C73E8C8",
  wsklima: "0x6f370dba99E32A3cAD959b341120DB3C9E280bA6",
  bctUsdcLp: "0x1e67124681b402064cd0abe8ed1b5c79d2e02f64",
  klimaUsdcLp: "0x5786b267d35F9D011c4750e0B0bA584E1fDbeAD1",
  klimaBctLp: "0x9803c7ae526049210a1725f7487af26fe2c24614",
  klimaMco2Lp: "0x64a3b8cA5A7e406A78e660AE10c7563D9153a739",
  mco2UsdcLp: "0x68ab4656736d48bb1de8661b9a323713104e24cf",
  bond_klimaBctLp: "0x1E0Dd93C81aC7Af2974cdB326c85B87Dd879389B",
  bond_klimaUsdcLp: "0xb5aF101742EcAe095944F60C384d09453006bFde",
  bond_klimaMco2Lp: "0xf9c3FC299dE5f86d9CD6a724e6B44933720f5e6D",
  bond_bct: "0x7De627C56D26529145a5f9D85948ecBeAF9a4b34",
  bond_bctUsdcLp: "0xBF2A35efcd85e790f02458Db4A3e2f29818521c5",
  bond_mco2: "0x27217c3F5bEc4c12Fa506A101bC4bd15417AEAa8",
  bond_calc: "0x0b8d6D6611Ed7cCe01BbcC57826548C6107B0478",
  bond_calc_klimaUsdc: "0x8a92CC36cCC275374380460026ef365A4E01778C",
  staking: "0x25d28a24Ceb6F81015bB0b2007D795ACAc411b4d",
  staking_helper: "0x4D70a031Fc76DA6a9bC0C922101A05FA95c3A227",
};

const testnet: typeof mainnet = {
  bct: "0x8f8b7D5d12c1fC37f20a89Bf4Dfe1E787Da529B5",
  mco2: "",
  treasury: "",
  distributor: "0xd49869652B3F194F73eC29a6954bC5DE6baeA8b8",
  klima: "0x6b4499909fD8947A3bdEa5d524Fb3697018fC750",
  aklima: "0xaab5e18d2af8c7cd2a86b9617fe2c08c5278f3db",
  aklima_migrate: "0x275b0d3aee3e55d00ecf2e0eb9cf832cdeb910c2",
  alklima: "0x988c92bf1f78ca3ae40b541d6dd50d95c1bced04",
  alklima_migrate: "",
  pklima: "0x97731c2c6de011cbb47af7a9ceff50dea853d690",
  pklima_exercise: "0xBCE4486256bb306BF49e43DfdaFBc0A6660e95F9",
  sklima: "0xDe0cD0D51b9981BaB50DB974a1877c1C01b86e91",
  wsklima: "",
  bctUsdcLp: "0x1c08a37dfFc0f482B61E802781f2c29eD9316ba6",
  klimaUsdcLp: "",
  klimaBctLp: "0xb7225519550ED89C9B36c88d57d6059F698AaE97",
  klimaMco2Lp: "0x64a3b8cA5A7e406A78e660AE10c7563D9153a739",
  mco2UsdcLp: "",
  bond_klimaBctLp: "0x285A6054DdC2980C62E716086B065E1e770fffb3",
  bond_klimaUsdcLp: "",
  bond_klimaMco2Lp: "0xf9c3FC299dE5f86d9CD6a724e6B44933720f5e6D",
  bond_bct: "0x3204AF4b290b8f4f0fdf91284818ebB53b90459c",
  bond_bctUsdcLp: "0x9d9bC94A340B8B1cE8219c09E4CfadB9582BfAe1",
  bond_mco2: "",
  bond_calc: "0x7087D55D9Cd826dE4F0EAb4625698FF641Bd342a",
  bond_calc_klimaUsdc: "",
  staking: "0x2960DCE5aE04eF503b36f8581EA5Ac5238632092",
  staking_helper: "0x4D70a031Fc76DA6a9bC0C922101A05FA95c3A227",
};

export const addresses = {
  mainnet,
  testnet,
};

export const urls = {
  home: "https://www.klimadao.finance/",
  epaSource:
    "https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references",
  blog: "https://klimadao.medium.com/",
  emailSignUp:
    "https://docs.google.com/forms/d/e/1FAIpQLSeJ4-dPoSBS50kT1hSBzQGiA8lMnL5DYKjptQoMBKmgFokJmg/viewform",
  discordInvite: "https://discord.gg/kx4pahaFw8",
  gitbook: "https://klima-dao.gitbook.io/klima-dao/",
  app: "https://dapp.klimadao.finance",
  polygonMainnetRpc: "https://polygon-rpc.com/",
  sushiUSDCBCT: `https://app.sushi.com/swap?inputCurrency=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&outputCurrency=${addresses["mainnet"].bct}`,
  sushiKLIMABCT: `https://app.sushi.com/swap?inputCurrency=${addresses["mainnet"].klima}&outputCurrency=${addresses["mainnet"].bct}`,
  communityHub: "https://klimadao.notion.site/",
  tutorial:
    "https://klimadao.notion.site/I-m-new-to-Klima-How-do-I-participate-c28426c5100244788f791f62e375ffcc",
  officialDocs: "https://docs.klimadao.finance/",
  twitter: "https://twitter.com/KlimaDAO",
  github: "https://github.com/KlimaDAO",
};

export const INFURA_ID = "0f83eb63faea409abc1f440c9f077646";

export const polygonNetworks = {
  testnet: {
    chainName: "Polygon Testnet Mumbai",
    hexChainId: "0x13881",
    chainId: 80001,
    rpcUrls: [`https://polygon-mumbai.infura.io/v3/${INFURA_ID}`],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  mainnet: {
    chainName: "Polygon Mainnet",
    hexChainId: "0x89",
    chainId: 137,
    rpcUrls: [urls.polygonMainnetRpc],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
};

export const bonds = [
  "bct_usdc_lp",
  "klima_bct_lp",
  "klima_usdc_lp",
  "klima_mco2_lp",
  "bct",
  "mco2",
] as const;
export type Bond = typeof bonds[number];

export const EPOCH_INTERVAL = 11520;
// NOTE could get this from an outside source since it changes slightly over time
export const BLOCK_RATE_SECONDS = 2.5;

export const ESTIMATED_DAILY_REBASES = 3.28;

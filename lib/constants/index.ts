const mainnet = {
  daoMultiSig: "0x65A5076C0BA74e5f3e069995dc3DAB9D197d995c",
  bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
  mco2: "0xaa7dbd1598251f856c12f63557a4c4397c253cea",
  nct: "0xD838290e877E0188a4A44700463419ED96c16107",
  ubo: "0x2B3eCb0991AF0498ECE9135bcD04013d7993110c",
  nbo: "0x6BCa3B77C1909Ce1a4Ba1A20d1103bDe8d222E48",
  treasury: "0x7Dd4f0B986F032A44F913BF92c9e8b7c17D77aD7",
  distributor: "0x4cC7584C3f8FAABf734374ef129dF17c3517e9cB",
  klima: "0x4e78011ce80ee02d2c3e649fb657e45898257815",
  pklima: "0x0af5dee6678869201924930d924a435f6e4839c9",
  pklima_exercise: "0xE607d9604AA75D45A866831fc3E87eCAA8A654e7",
  sklima: "0xb0C22d8D350C67420f06F48936654f567C73E8C8",
  wsklima: "0x6f370dba99E32A3cAD959b341120DB3C9E280bA6",
  usdc: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  klimaUsdcLp: "0x5786b267d35F9D011c4750e0B0bA584E1fDbeAD1",
  klimaBctLp: "0x9803c7ae526049210a1725f7487af26fe2c24614",
  klimaMco2Lp: "0x64a3b8cA5A7e406A78e660AE10c7563D9153a739",
  klimaUboLp: "0x5400A05B8B45EaF9105315B4F2e31F806AB706dE",
  klimaNboLp: "0x251cA6A70cbd93Ccd7039B6b708D4cb9683c266C",
  klimaNameService: "0xe8b97542A433e7eCc7bB791872af04DF02A1a6E4",
  klimaProV2: "0xcf37f6B4754b34eA32a49cF5def3095a17732C1b",
  bond_klimaBctLp: "0x1E0Dd93C81aC7Af2974cdB326c85B87Dd879389B",
  bond_klimaUsdcLp: "0xb5aF101742EcAe095944F60C384d09453006bFde",
  bond_klimaMco2Lp: "0x18c3713d523f91fBd26E65C8BaBAB63A0f31B9a6",
  bond_bct: "0x7De627C56D26529145a5f9D85948ecBeAF9a4b34",
  bond_nbo: "0x285A6054DdC2980C62E716086B065E1e770fffb3",
  bond_ubo: "0x08eE531979B730Dbb63469BC56E1d6cD9F43b8d4",
  bond_mco2: "0x00da51bc22edf9c5a643da7e232e5a811d10b8a3",
  bond_calc: "0x0b8d6D6611Ed7cCe01BbcC57826548C6107B0478",
  bond_calc_klimaUsdc: "0x8a92CC36cCC275374380460026ef365A4E01778C",
  staking: "0x25d28a24Ceb6F81015bB0b2007D795ACAc411b4d",
  staking_helper: "0x4D70a031Fc76DA6a9bC0C922101A05FA95c3A227",
  retirementStorage: "0xac298CD34559B9AcfaedeA8344a977eceff1C0Fd",
  retirementAggregatorV2: "0x8cE54d9625371fb2a068986d32C85De8E6e995f8",
  liveOffsetWallet: "0xa17b52d5e17254b03dfdf7b4dff2fc0c6108faac",
  liveOffsetContract: "0xB99fAbB350bbb48b8d586835d001085c8F188BA0",
  marketplace: "0x694Ccc69525aecC522393e1e3623B937771ED1Af", // This is mumbai testnet
};

const testnet: typeof mainnet = {
  daoMultiSig: "",
  bct: "0x8f8b7D5d12c1fC37f20a89Bf4Dfe1E787Da529B5",
  mco2: "",
  nct: "",
  ubo: "0x1C08ED3fF245dE937a6414C2C39E372f2640f5f8",
  nbo: "0x28D5158d45EC651133Fac4c858BeD65252Ed5b7b",
  treasury: "",
  distributor: "0xd49869652B3F194F73eC29a6954bC5DE6baeA8b8",
  klima: "0x6b4499909fD8947A3bdEa5d524Fb3697018fC750",
  pklima: "0x97731c2c6de011cbb47af7a9ceff50dea853d690",
  pklima_exercise: "0xBCE4486256bb306BF49e43DfdaFBc0A6660e95F9",
  sklima: "0xDe0cD0D51b9981BaB50DB974a1877c1C01b86e91",
  wsklima: "",
  usdc: "",
  klimaUsdcLp: "",
  klimaBctLp: "0xb7225519550ED89C9B36c88d57d6059F698AaE97",
  klimaMco2Lp: "0x64a3b8cA5A7e406A78e660AE10c7563D9153a739",
  klimaUboLp: "",
  klimaNboLp: "",
  klimaNameService: "",
  klimaProV2: "",
  bond_klimaBctLp: "0x285A6054DdC2980C62E716086B065E1e770fffb3",
  bond_klimaUsdcLp: "",
  bond_klimaMco2Lp: "0xf9c3FC299dE5f86d9CD6a724e6B44933720f5e6D",
  bond_bct: "0x3204AF4b290b8f4f0fdf91284818ebB53b90459c",
  bond_nbo: "0x285A6054DdC2980C62E716086B065E1e770fffb3",
  bond_ubo: "0x08eE531979B730Dbb63469BC56E1d6cD9F43b8d4",
  bond_mco2: "",
  bond_calc: "0x7087D55D9Cd826dE4F0EAb4625698FF641Bd342a",
  bond_calc_klimaUsdc: "",
  staking: "0x2960DCE5aE04eF503b36f8581EA5Ac5238632092",
  staking_helper: "0x4D70a031Fc76DA6a9bC0C922101A05FA95c3A227",
  retirementStorage: "",
  retirementAggregatorV2: "",
  liveOffsetWallet: "",
  liveOffsetContract: "",
  marketplace: "0x694Ccc69525aecC522393e1e3623B937771ED1Af", // Diamond
};

export const addresses = {
  mainnet,
  testnet,
};

export const urls = {
  home: "https://www.klimadao.finance",
  epaSource:
    "https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references",
  blog: "https://klimadao.medium.com",
  emailSignUp:
    "https://docs.google.com/forms/d/e/1FAIpQLScw_YKuWZJePkM8lh6VVOwtpYToi1FpfgYgxLeBuIMa2ewyuA/viewform",
  discordInvite: "https://discord.com/invite/klimadao",
  discordContributorsInvite: "https://discord.gg/uWvjTuZ65v",
  gitbook: "https://klima-dao.gitbook.io/klima-dao",
  app: "https://app.klimadao.finance",
  stake: "https://app.klimadao.finance/#/stake",
  wrap: "https://app.klimadao.finance/#/wrap",
  bonds: "https://app.klimadao.finance/#/bonds",
  offset: "https://app.klimadao.finance/#/offset",
  pledges: "https://www.klimadao.finance/pledge",
  info: "https://app.klimadao.finance/info",
  redeem: "https://app.klimadao.finance/#/redeem",
  resources: "https://www.klimadao.finance/resources",
  siteBlog: "https://www.klimadao.finance/blog",
  retirements: "https://www.klimadao.finance/retirements",
  contact: "https://www.klimadao.finance/contact",
  community: "https://www.klimadao.finance/community",
  buy: "https://www.klimadao.finance/buy",
  infinity: "https://www.klimadao.finance/infinity",
  carbonDashboard: "https://carbon.klimadao.finance",
  forum: "https://forum.klimadao.finance",
  snapshot: "https://snapshot.org/#/klimadao.eth",
  polygonMainnetRpc: "https://polygon-rpc.com",
  polygonTestnetRpc: "https://rpc-mumbai.maticvigil.com",
  defaultEthRpc: "https://cloudflare-eth.com",
  infuraPolygonRpc: "https://polygon-mainnet.infura.io/v3",
  infuraPolygonRpcClient:
    "https://polygon-mainnet.infura.io/v3/02ff0dd9c13d42bebbb163ed25205e55",
  infuraEthRpc: "https://mainnet.infura.io/v3",
  infuraMumbaiRpc: "https://polygon-mumbai.infura.io/v3",
  communityHub: "https://klimadao.notion.site",
  tutorial:
    "https://klimadao.notion.site/I-m-new-to-Klima-How-do-I-participate-c28426c5100244788f791f62e375ffcc",
  officialDocs: "https://docs.klimadao.finance",
  github: "https://github.com/KlimaDAO",
  linkedIn: "https://www.linkedin.com/company/klimadao/",
  reddit: "https://www.reddit.com/r/Klima",
  podcast: "https://rss.com/podcasts/potk",
  telegram: "https://t.me/joinchat/Zb06f_mnMosyYTYy",
  twitter: "https://twitter.com/KlimaDAO",
  youtube: "https://www.youtube.com/c/klimadaofinance",
  mediaRequestForm:
    "https://share-eu1.hsforms.com/1ILV2ALyPSqqUAeLdstfZZgfhhlr",
  partnerShipsContactForm:
    "https://share-eu1.hsforms.com/1fEb0LUdcRlKGTzNCVYz6igfhhlr",
  klimaInfinityContactForm:
    "https://share-eu1.hsforms.com/1g2uooleDQ06MaRpylL5irwfhhlr",
  pressEmail: "mailto:press@klimadao.finance",
  loveletter: "https://loveletter.klimadao.finance",
  mediaImage: "https://www.klimadao.finance/og-media.png",
  lifiStake:
    "https://transferto.xyz/showcase/etherspot-klima?fromChain=eth&toChain=pol&toToken=0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  lifiOffset:
    "https://transferto.xyz/showcase/carbon-offset?fromChain=eth&toChain=pol&toToken=0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  polyscanGasStation: "https://gasstation-mainnet.matic.network/v2",
  polygonscan: "https://polygonscan.com",
  polygonBridge: "https://wallet.polygon.technology/polygon/bridge/deposit",
  polygonTor: "https://polygon.tor.us/",
  creolIndividualCalculator: "https://klima.creol.io/#/footprint",
  creolBusinessCalculator: "https://klima.creol.io/#/office",
  cryptoOffsetCalculator: "https://carbon.fyi/",
  sushiSwap: "https://www.sushi.com/swap",
  coinbase: "https://www.coinbase.com/",
  moonpayMatic: "https://www.moonpay.com/buy/matic",
  transakMatic:
    "https://global.transak.com/?fiatCurrency=EUR&network=polygon&cryptoCurrencyCode=MATIC",
};

export const polygonNetworks = {
  testnet: {
    chainName: "Polygon Testnet Mumbai",
    hexChainId: "0x13881",
    chainId: 80001,
    rpcUrls: [urls.polygonTestnetRpc],
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
  "inverse_usdc",
  "ubo",
  "nbo",
  "klima_bct_lp",
  "klima_usdc_lp",
  "klima_mco2_lp",
  "bct",
  "mco2",
] as const;
export type Bond = (typeof bonds)[number];

// Spender with their Allowances tokens
export const allowancesContracts = {
  retirementAggregatorV2: [
    "ubo",
    "nbo",
    "bct",
    "nct",
    "usdc",
    "klima",
    "mco2",
    "sklima",
    "wsklima",
  ],
  staking_helper: ["klima"],
  staking: ["sklima"],
  wsklima: ["sklima"],
  pklima_exercise: ["bct", "pklima"],
  bond_klimaMco2Lp: ["klimaMco2Lp"],
  bond_klimaBctLp: ["klimaBctLp"],
  bond_klimaUsdcLp: ["klimaUsdcLp"],
  bond_bct: ["bct"],
  bond_mco2: ["mco2"],
  bond_nbo: ["nbo"],
  bond_ubo: ["ubo"],
  klimaProV2: ["klima"],
} as const;

export const EPOCH_INTERVAL = 11520;
export const FALLBACK_BLOCK_RATE = 2.3;

export const API_BASE_URL = "https://www.klimadao.finance/api";

/** CMS stuff  */
export const SANITY_STUDIO_API_PROJECT_ID = "dk34t4vc";
export const SANITY_STUDIO_API_DATASET = "production";

/** Tokens accepted as input for the offset aggregator /#/offset */
export type OffsetInputToken =
  (typeof allowancesContracts)["retirementAggregatorV2"][number];
export const offsetInputTokens = allowancesContracts[
  "retirementAggregatorV2"
] as unknown as OffsetInputToken[];

export type OffsetPaymentMethod = OffsetInputToken | "fiat";

/** Retireable tokens for the offset aggregator /#/offset */
export const retirementTokens = ["ubo", "nbo", "bct", "nct", "mco2"] as const;
/** Known carbon pools */
export const poolTokens = ["ubo", "nbo", "bct", "nct", "mco2"] as const;
/** Known carbon tokens */
export const projectTokens = ["tco2", "c3t"] as const;

// TODO rename to pool token
export type RetirementToken = (typeof retirementTokens)[number];
export type PoolToken = (typeof poolTokens)[number];
export type ProjectToken = (typeof projectTokens)[number];
export type CarbonToken = PoolToken | ProjectToken;

type CompatMap = { [token in OffsetPaymentMethod]: RetirementToken[] };
export const offsetCompatibility: CompatMap = {
  ubo: ["ubo"],
  nbo: ["nbo"],
  bct: ["bct"],
  nct: ["nct"],
  mco2: ["mco2"],
  usdc: ["bct", "nct", "mco2", "ubo", "nbo"],
  klima: ["bct", "nct", "mco2", "ubo", "nbo"],
  sklima: ["bct", "nct", "mco2", "ubo", "nbo"],
  wsklima: ["bct", "nct", "mco2", "ubo", "nbo"],
  fiat: ["bct", "nct", "mco2", "ubo", "nbo"],
};

const SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/klimadao";
export const subgraphs = {
  polygonBridgedCarbon: `${SUBGRAPH_URL}/polygon-bridged-carbon`,
  userCarbon: `${SUBGRAPH_URL}/klimadao-user-carbon`,
  cujoRefiHoldings:
    "https://api.thegraph.com/subgraphs/name/cujowolf/klima-refi-current-holdings",
  marketplace: "https://api.thegraph.com/subgraphs/name/najada/marketplace-new", // TODO: ensure when switching drom testnet to mainnet that this is still correct!
};

const VERRA_REGISTRY = "https://registry.verra.org";
const VERRA_REGISTRY_API = `${VERRA_REGISTRY}/uiapi`;
export const verra = {
  projectSearch: `${VERRA_REGISTRY_API}/resource/resource/search?maxResults=2000&$count=true&$skip=0&$top=50`,
  projectDetailPage: `${VERRA_REGISTRY}/app/projectDetail/VCS`, // add ID after VCS like /191
};
const GOLD_STANDARD_REGISTRY = "https://registry.goldstandard.org";
export const goldStandard = {
  projectDetailPage: `${GOLD_STANDARD_REGISTRY}/projects/details`,
};

const MARKETPLACE = "https://marketplace-api-najada.vercel.app";
const MARKETPLACE_API = `${MARKETPLACE}/api`;
export const marketplace = {
  projects: `${MARKETPLACE_API}/projects`,
  users: `${MARKETPLACE_API}/users`,
  purchases: `${MARKETPLACE_API}/purchases`,
};

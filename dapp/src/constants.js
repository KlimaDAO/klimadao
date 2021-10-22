export const INFURA_ID = "0f83eb63faea409abc1f440c9f077646";
export const MAINNET_RPC_URL = `https://polygon-rpc.com/` // formerly https://polygon-mainnet.infura.io/v3/${INFURA_ID}
export const EPOCH_INTERVAL = 11520;

// NOTE could get this from an outside source since it changes slightly over time
export const BLOCK_RATE_SECONDS = 2.5;

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
    rpcUrls: [MAINNET_RPC_URL],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
};

export const addresses = {
  80001: {
    DAI_ADDRESS: "0x8f8b7D5d12c1fC37f20a89Bf4Dfe1E787Da529B5", // testnet VCU20 address
    OHM_ADDRESS: "0x6b4499909fD8947A3bdEa5d524Fb3697018fC750", // in truffle KLIMA
    STAKING_ADDRESS: "0x2960DCE5aE04eF503b36f8581EA5Ac5238632092", // in truffle
    SOHM_ADDRESS: "0xDe0cD0D51b9981BaB50DB974a1877c1C01b86e91", // in truffle sKLIMA
    // PRESALE_ADDRESS: '0xcBb60264fe0AC96B0EFa0145A9709A825afa17D8',
    // AOHM_ADDRESS: '0x4c36e2C3962BbbBBc9670DB855018a52e2d6bD8F',
    AKLIMA_ADDRESS: '0xaab5e18d2af8c7cd2a86b9617fe2c08c5278f3db',
    ALKLIMA_ADDRESS: '0x988c92bf1f78ca3ae40b541d6dd50d95c1bced04',
    AMIGRATE_ADDRESS: '0x275b0d3aee3e55d00ecf2e0eb9cf832cdeb910c2',
    ALMIGRATE_ADDRESS: '0x275b0d3aee3e55d00ecf2e0eb9cf832cdeb910c2',
    PKLIMA_ADDRESS: '0x97731c2c6de011cbb47af7a9ceff50dea853d690',
    PEXERCISE_ADDRESS: '0xBCE4486256bb306BF49e43DfdaFBc0A6660e95F9',
    LP_ADDRESS: "0xb7225519550ED89C9B36c88d57d6059F698AaE97", // SLP SUHSISWAP ADDRESS
    DISTRIBUTOR_ADDRESS: "0xd49869652B3F194F73eC29a6954bC5DE6baeA8b8", // in truffle
    // BOND_ADDRESS: '0xd27001d1aAEd5f002C722Ad729de88a91239fF29',
    BOND_ADDRESS: "0x285A6054DdC2980C62E716086B065E1e770fffb3", // in truffle BONDDEPO.sol --> SLP BONDS
    BONDINGCALC_ADDRESS: "0x7087D55D9Cd826dE4F0EAb4625698FF641Bd342a", // in truffle
    DAI_BOND_ADDRESS: "0x3204AF4b290b8f4f0fdf91284818ebB53b90459c", // KlimAvcu20DEPOSITORY (DAI ONLY BONDS)
    CIRCULATING_SUPPLY_ADDRESS: "0x0F92565e9BA96918B2db48537616DD9D0b09502B",
    STAKING_HELPER_ADDRESS: "0x4D70a031Fc76DA6a9bC0C922101A05FA95c3A227", //THIS IS MAINNET ONLY// in truffle

    // This is V1.1. Some are copied from above.
    RESERVES: {
      DAI: "0x8f8b7D5d12c1fC37f20a89Bf4Dfe1E787Da529B5", // VCU20  (BCT)
      OHM_DAI: "0xb7225519550ED89C9B36c88d57d6059F698AaE97", // KLIMA-VCU20 LP
      BCT_USDC: "0x1c08a37dfFc0f482B61E802781f2c29eD9316ba6" // BCT USDC LP
    },

    BONDS: {
      OHM_DAI_CALC: "0x7087D55D9Cd826dE4F0EAb4625698FF641Bd342a",
      OHM_DAI: "0x285A6054DdC2980C62E716086B065E1e770fffb3", // SLP BOND ADDRESS  --> NOT DEPLOYED
      DAI: "0x3204AF4b290b8f4f0fdf91284818ebB53b90459c", // VCU20 BOND
      BCT_USDC: "0x9d9bC94A340B8B1cE8219c09E4CfadB9582BfAe1"
    },
  },

  137: {
    DAI_ADDRESS: "0x2f800db0fdb5223b3c3f354886d907a671414a7f", // done // testnet VCU20 address
    OHM_ADDRESS: "0x4e78011ce80ee02d2c3e649fb657e45898257815", // // done ///in truffle KLIMA
    STAKING_ADDRESS: "0x25d28a24Ceb6F81015bB0b2007D795ACAc411b4d", // done in truffle
    SOHM_ADDRESS: "0xb0C22d8D350C67420f06F48936654f567C73E8C8", // done // in truffle sKLIMA
    // PRESALE_ADDRESS: '0xcBb60264fe0AC96B0EFa0145A9709A825afa17D8',
    // AOHM_ADDRESS: '0x4c36e2C3962BbbBBc9670DB855018a52e2d6bD8F',
    AKLIMA_ADDRESS: '0xeb935614447185eeea0abc756ff2ddc99fbb9047', // done
    ALKLIMA_ADDRESS: '0xd50EC6360f560a59926216Eafb98395AC430C9fD', // done
    AMIGRATE_ADDRESS: '0x49722300Ab1932e5A1ef11EfdE25885685C7eeD5', // done
    ALMIGRATE_ADDRESS: '0x4dA274126193B36A972267AeEB02B983d88e64E3', // done
    PKLIMA_ADDRESS: '0x0af5dee6678869201924930d924a435f6e4839c9', // done
    PEXERCISE_ADDRESS: '0x241164A02597295fFB69476BA88689cb5E6eeFF6', // done
    LP_ADDRESS: "0x9803c7ae526049210a1725f7487af26fe2c24614", //  SLP SUHSISWAP ADDRESS
    DISTRIBUTOR_ADDRESS: "0x4cC7584C3f8FAABf734374ef129dF17c3517e9cB", //done // in truffle
    // BOND_ADDRESS: '0xd27001d1aAEd5f002C722Ad729de88a91239fF29',
    BOND_ADDRESS: "0x1E0Dd93C81aC7Af2974cdB326c85B87Dd879389B", // in truffle BONDDEPO.sol --> SLP BONDS
    BONDINGCALC_ADDRESS: "0x0b8d6D6611Ed7cCe01BbcC57826548C6107B0478", // done // in truffle
    DAI_BOND_ADDRESS: "0x7De627C56D26529145a5f9D85948ecBeAF9a4b34", // KlimAvcu20DEPOSITORY (DAI ONLY BONDS)
    CIRCULATING_SUPPLY_ADDRESS: "0x96f752C58ED3C858C0a7ee05aB508B87A2b3561A", // done in truffle
    STAKING_HELPER_ADDRESS: "0x4D70a031Fc76DA6a9bC0C922101A05FA95c3A227",
    TREASURY: "0x7Dd4f0B986F032A44F913BF92c9e8b7c17D77aD7",
    // This is V1.1. Some are copied from above.
    RESERVES: {
      DAI: "0x2f800db0fdb5223b3c3f354886d907a671414a7f", // VCU20  (BCT)
      OHM_DAI: "0x9803c7ae526049210a1725f7487af26fe2c24614",
      BCT_USDC: "0x1e67124681b402064cd0abe8ed1b5c79d2e02f64" // KLIMA-VCU20 LP
    },

    BONDS: {
      OHM_DAI_CALC: "0x0b8d6D6611Ed7cCe01BbcC57826548C6107B0478",
      OHM_DAI: "0x1E0Dd93C81aC7Af2974cdB326c85B87Dd879389B", // SLP BOND ADDRESS  --> NOT DEPLOYED
      DAI: "0x7De627C56D26529145a5f9D85948ecBeAF9a4b34", // VCU20 BOND
      BCT_USDC: "0xBF2A35efcd85e790f02458Db4A3e2f29818521c5"
    },
  },



  4: {
   /* DAI_ADDRESS: "0xda68f3C5F31A289a4d90927aE54d6b4Ae0b7F1F9",
    OHM_ADDRESS: "0x2CF9A1bCfbf78b7CeE14A91008157BeDbBd00A9f",
    STAKING_ADDRESS: "0x84c8cBAFbeFD329F3e55f7cbFFD1D422d77b7c27",
    SOHM_ADDRESS: "0x4D2AbC161Af2aeED1da1CAf768F4475b25e4C1Db",
    PRESALE_ADDRESS: "0x90d1dd1fa2fddd5076850f342f31717a0556fdf7",
    AOHM_ADDRESS: "0x410D96DF0F9e778d0E3a7B93547e40f06e823618",
    MIGRATE_ADDRESS: "0x3BA7C6346b93DA485e97ba55aec28E8eDd3e33E2",
    LP_ADDRESS: "0x366c22dbb3a69025bc2c6216305f047ed5db9192",
    // BOND_ADDRESS: '0xdc1b5DF37369B2D370f141E48d65a28032Be1c58',
    BOND_ADDRESS: "0x50a9dd1f9a13737376395056e9991d4f51a6e958",
    BONDINGCALC_ADDRESS: "0x6d5de2E6f3437b29f8Ffdb9b3f2BADb81B881dBc",
    DAI_BOND_ADDRESS: "0xf0dc88996d55b89ce7c1701ef906527855664f96",
    CIRCULATING_SUPPLY_ADDRESS: "0x5b0AA7903FD2EaA16F1462879B71c3cE2cFfE868",*/
  },
  1: {
    /*
    DAI_ADDRESS: "0x6b175474e89094c44da98b954eedeac495271d0f",
    OHM_ADDRESS: "0x383518188c0c6d7730d91b2c03a03c837814a899",
    STAKING_ADDRESS: "0x0822F3C03dcc24d200AFF33493Dc08d0e1f274A2",
    SOHM_ADDRESS: "0x31932E6e45012476ba3A3A4953cbA62AeE77Fbbe",
    PRESALE_ADDRESS: "0xcBb60264fe0AC96B0EFa0145A9709A825afa17D8",
    AOHM_ADDRESS: "0x24ecfd535675f36ba1ab9c5d39b50dc097b0792e",
    MIGRATE_ADDRESS: "0xC7f56EC779cB9e60afA116d73F3708761197dB3d",
    LP_ADDRESS: "0x34d7d7Aaf50AD4944B70B320aCB24C95fa2def7c",
    DISTRIBUTOR_ADDRESS: "0xbe731507810C8747C3E01E62c676b1cA6F93242f",
    // BOND_ADDRESS: '0xd27001d1aAEd5f002C722Ad729de88a91239fF29',
    BOND_ADDRESS: "0x13E8484a86327f5882d1340ed0D7643a29548536",
    BONDINGCALC_ADDRESS: "0x6a617Fe9163C1499b9D2773fb2d0105a2368Bedc",
    LP_BONDINGCALC_ADDRESS: "0xe2CABE86071f6Ae31e1b4634BAa06522b838a148",
    DAI_BOND_ADDRESS: "0xa64ED1b66Cb2838Ef2A198D8345c0ce6967A2A3c",
    CIRCULATING_SUPPLY_ADDRESS: "0x0efff9199aa1ac3c3e34e957567c1be8bf295034",
*/

    // This is V1.1. Some are copied from above.
   /* RESERVES: {
      DAI: "0x8f8b7D5d12c1fC37f20a89Bf4Dfe1E787Da529B5", // VCU20  (BCT)
      OHM_DAI: "0xb7225519550ED89C9B36c88d57d6059F698AaE97", // KLIMA-VCU20 LP
    },

    BONDS: {
      OHM_DAI_CALC: "0x5AE59224894954F76616c30F1876B80Ca2063fb9",
      OHM_DAI: "0x9e9573f158D61fBeE0754F7969cE4097793BA6fc", // SLP BOND ADDRESS  --> NOT DEPLOYED
      DAI: "0x9212bA820985Bf2210d01C7BA926685465E5efBD", // VCU20 BOND
    },*/
  },
};

export const BONDS = {
  ohm_dai: "klima_bct_lp",
  dai: "bct",
  bct_usdc: "bct_usdc_lp"
};

export const Actions = {
  FETCH_ACCOUNT_SUCCESS: "account/FETCH_ACCOUNT_SUCCESS",
  FETCH_APP_SUCCESS: "app/FETCH_APP_SUCCESS",
  FETCH_STAKE_SUCCESS: "stake/FETCH_STAKE_SUCCESS",
  FETCH_BOND_SUCCESS: "bond/FETCH_BOND_SUCCESS",
  FETCH_MIGRATE_SUCCESS: "migrate/FETCH_MIGRATE_SUCCESS",
  FETCH_EXERCISE_SUCCESS: "exercise/FETCH_EXERCISE_SUCCESS",
};

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = "PSW8C433Q667DVEX5BCRMGNAH9FSGFZ7Q8";

// BLOCKNATIVE ID FOR Notify.js:
export const BLOCKNATIVE_DAPPID = "0b58206a-f3c0-4701-a62f-73c7243e8c77";

// EXTERNAL CONTRACTS

export const DAI_ADDRESS = "0x2f800db0fdb5223b3c3f354886d907a671414a7f";

export const DAI_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "chainId_", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "src", type: "address" },
      { indexed: true, internalType: "address", name: "guy", type: "address" },
      { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: true,
    inputs: [
      { indexed: true, internalType: "bytes4", name: "sig", type: "bytes4" },
      { indexed: true, internalType: "address", name: "usr", type: "address" },
      { indexed: true, internalType: "bytes32", name: "arg1", type: "bytes32" },
      { indexed: true, internalType: "bytes32", name: "arg2", type: "bytes32" },
      { indexed: false, internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "LogNote",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "src", type: "address" },
      { indexed: true, internalType: "address", name: "dst", type: "address" },
      { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "usr", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "usr", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "guy", type: "address" }],
    name: "deny",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "usr", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "src", type: "address" },
      { internalType: "address", name: "dst", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "move",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "holder", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "bool", name: "allowed", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "usr", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "pull",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "usr", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "push",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "guy", type: "address" }],
    name: "rely",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "dst", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "src", type: "address" },
      { internalType: "address", name: "dst", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "version",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "wards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export const NETWORKS = {
  localhost: {
    name: "localhost",
    color: "#666666",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: "http://" + window.location.hostname + ":8545",
  },
  mainnet: {
    name: "mainnet",
    color: "#ff8b9e",
    chainId: 1,
    rpcUrl: MAINNET_RPC_URL,
    blockExplorer: "https://etherscan.io/",
  },
  kovan: {
    name: "kovan",
    color: "#7003DD",
    chainId: 42,
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://kovan.etherscan.io/",
    faucet: "https://gitter.im/kovan-testnet/faucet", // https://faucet.kovan.network/
  },
  rinkeby: {
    name: "rinkeby",
    color: "#e0d068",
    chainId: 4,
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    faucet: "https://faucet.rinkeby.io/",
    blockExplorer: "https://rinkeby.etherscan.io/",
  },
  ropsten: {
    name: "ropsten",
    color: "#F60D09",
    chainId: 3,
    faucet: "https://faucet.ropsten.be/",
    blockExplorer: "https://ropsten.etherscan.io/",
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  },
  goerli: {
    name: "goerli",
    color: "#0975F6",
    chainId: 5,
    faucet: "https://goerli-faucet.slock.it/",
    blockExplorer: "https://goerli.etherscan.io/",
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
  },
  xdai: {
    name: "xdai",
    color: "#48a9a6",
    chainId: 100,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://dai.poa.network",
    faucet: "https://xdai-faucet.top/",
    blockExplorer: "https://blockscout.com/poa/xdai/",
  },
  matic: {
    name: "matic",
    color: "#2bbdf7",
    chainId: 137,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://rpc-mainnet.maticvigil.com",
    faucet: "https://faucet.matic.network/",
    blockExplorer: "https://explorer-mainnet.maticvigil.com//",
  },
  mumbai: {
    name: "mumbai",
    color: "#92D9FA",
    chainId: 80001,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    faucet: "https://faucet.matic.network/",
    blockExplorer: "https://mumbai-explorer.matic.today/",
  },
};

export const NETWORK = chainId => {
  for (const n in NETWORKS) {
    if (NETWORKS[n].chainId === chainId) {
      return NETWORKS[n];
    }
  }
};

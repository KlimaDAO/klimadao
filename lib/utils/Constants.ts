// Tokens definition

import { Address, BigInt, BigDecimal } from '@graphprotocol/graph-ts'

// ERC20
export const BCT_TOKEN: string = 'BCT'
export const MCO2_TOKEN: string = 'MCO2'
export const UBO_TOKEN: string = 'UBO'
export const NBO_TOKEN: string = 'NBO'
export const NCT_TOKEN: string = 'NCT'
export const CCO2_TOKEN: string = 'CCO2'
export const KLIMA_TOKEN: string = 'KLIMA'
export const SKLIMA_TOKEN: string = 'sKLIMA'
export const WSKLIMA_TOKEN: string = 'wsKLIMA'
// LP Bonds
export const KLIMABCT_LPBOND_TOKEN: string = 'KLIMA-BCT'
export const BCTUSDC_LPBOND_TOKEN: string = 'BCT-USDC'
export const KLIMAMCO2_LPBOND_TOKEN: string = 'KLIMA-MCO2'
export const KLIMAUBO_LPBOND_TOKEN: string = 'KLIMA-UBO'
export const KLIMANBO_LPBOND_TOKEN: string = 'KLIMA-NBO'
export const KLIMAUSDC_LPBOND_TOKEN: string = 'KLIMA-USDC'
// Reserve Bonds
export const BCT_BOND_TOKEN: string = 'BCT'
export const MCO2_BOND_TOKEN: string = 'MCO2'
export const UBO_BOND_TOKEN: string = 'UBO'
export const NBO_BOND_TOKEN: string = 'NBO'

export const USDC_INVERSE_BOND: string = 'USDC-INVERSE'

// LP Pair Addresses and Blocks
export const KLIMA_BCT_PAIR = Address.fromString('0x9803c7aE526049210a1725F7487AF26fE2c24614')
export const KLIMA_BCT_PAIR_BLOCK = BigInt.fromString('20294501')
export const BCT_USDC_PAIR = Address.fromString('0x1E67124681b402064CD0ABE8ed1B5c79D2e02f64')
export const BCT_USDC_PAIR_BLOCK = BigInt.fromString('20294523')
export const BCT_USDC_PAIR_REMOVE_LIQUIDITY_BLOCK = BigInt.fromString('29479227')
export const NCT_USDC_PAIR = Address.fromString('0xDb995F975F1Bfc3B2157495c47E4efB31196B2CA')
export const NCT_USDC_PAIR_BLOCK = BigInt.fromString('24782864')
export const NCT_USDC_PAIR_REMOVE_LIQUIDITY_BLOCK = BigInt.fromString('51305262')
export const KLIMA_MCO2_PAIR = Address.fromString('0x64a3b8ca5a7e406a78e660ae10c7563d9153a739')
export const KLIMA_MCO2_PAIR_BLOCK = BigInt.fromString('23688190')
export const KLIMA_USDC_PAIR = Address.fromString('0x5786b267d35f9d011c4750e0b0ba584e1fdbead1')
export const KLIMA_USDC_PAIR_BLOCK = BigInt.fromString('20358666')
export const KLIMA_USDC_PAIR_BOLSTER_LIQUIDITY_BLOCK = BigInt.fromString('25979319')
export const KLIMA_UBO_PAIR = Address.fromString('0x5400A05B8B45EaF9105315B4F2e31F806AB706dE')
export const KLIMA_UBO_PAIR_BLOCK = BigInt.fromString('26470811')
export const KLIMA_NBO_PAIR = Address.fromString('0x251cA6A70cbd93Ccd7039B6b708D4cb9683c266C')
export const KLIMA_NBO_PAIR_BLOCK = BigInt.fromString('26470990')
export const KLIMA_NCT_PAIR = Address.fromString('0xb2D0D5C86d933b0aceFE9B95bEC160d514d152E1')
export const KLIMA_NCT_PAIR_BLOCK = BigInt.fromString('32607148')
export const KLIMA_CCO2_PAIR = Address.fromString('0x4D2263FF85e334C1f1d04C6262F6c2580335a93C')
export const KLIMA_CCO2_PAIR_BLOCK = BigInt.fromString('51938524')
export const MCO2_USDC_PAIR = Address.fromString('0x68aB4656736d48bb1DE8661b9A323713104e24cF')
export const TREASURY_ADDRESS = Address.fromString('0x7Dd4f0B986F032A44F913BF92c9e8b7c17D77aD7')

// Bond Contract Addresses and Blocks
export const BCTBOND_V1 = Address.fromString('0x7De627C56D26529145a5f9D85948ecBeAF9a4b34')
export const BCTBOND_V1_BLOCK = BigInt.fromString('20474645')
export const BCT_USDC_BOND_V1 = Address.fromString('0xBF2A35efcd85e790f02458Db4A3e2f29818521c5')
export const BCT_USDC_BOND_V1_BLOCK = BigInt.fromString('20400980')
export const KLIMA_BCT_BOND_V1 = Address.fromString('0x1E0Dd93C81aC7Af2974cdB326c85B87Dd879389B')
export const KLIMA_BCT_BOND_V1_BLOCK = BigInt.fromString('20400975')
export const MCO2BOND_V1 = Address.fromString('0x27217c3F5bEc4c12Fa506A101bC4bd15417AEAa8')
export const MCO2BOND_V1_BLOCK = BigInt.fromString('23300000')
export const MCO2BOND_V1_2 = Address.fromString('0x00Da51bC22edF9c5A643da7E232e5a811D10B8A3')
export const MCO2BOND_V1_2_BLOCK = BigInt.fromString('26055400')
export const KLIMA_MCO2_BOND_V1 = Address.fromString('0xf9c3FC299dE5f86d9CD6a724e6B44933720f5e6D')
export const KLIMA_MCO2_BOND_V1_BLOCK = BigInt.fromString('24000000')
export const KLIMA_MCO2_BOND_V1_2 = Address.fromString('0x18c3713d523f91fBd26E65C8BaBAB63A0f31B9a6')
export const KLIMA_MCO2_BOND_V1_2_BLOCK = BigInt.fromString('26055500')
export const KLIMA_USDC_BOND_V1 = Address.fromString('0xb5aF101742EcAe095944F60C384d09453006bFde')
export const KLIMA_USDC_BOND_V1_BLOCK = BigInt.fromString('23920000')
export const UBOBOND_V1 = Address.fromString('0x08eE531979B730Dbb63469BC56E1d6cD9F43b8d4')
export const UBOBOND_V1_BLOCK = BigInt.fromString('27329320')
// export const KLIMA_UBO_BOND_V1 = '';
// export const KLIMA_UBO_BOND_V1_BLOCK = '';
export const NBOBOND_V1 = Address.fromString('0x285A6054DdC2980C62E716086B065E1e770fffb3')
export const NBOBOND_V1_BLOCK = BigInt.fromString('27329359')
// export const KLIMA_NBO_BOND_V1 = '';
// export const KLIMA_NBO_BOND_V1_BLOCK = '';
export const PRO_KLIMA_V2 = Address.fromString('0xcf37f6B4754b34eA32a49cF5def3095a17732C1b')
export const PRO_KLIMA_V2_BLOCK = BigInt.fromString('28719259')
export const BOND_VERSION_V1 = 'BOND_V1'
export const BOND_VERSION_V2 = 'BOND_V2'

export const CCO2_TRANSFER_BLOCK = BigInt.fromString('48389143')

// Token Addresses
export const KLIMA_ERC20_V1_CONTRACT = Address.fromString('0x4e78011ce80ee02d2c3e649fb657e45898257815')
export const SKLIMA_ERC20_V1_CONTRACT = Address.fromString('0xb0C22d8D350C67420f06F48936654f567C73E8C8')
export const BCT_ERC20_CONTRACT = Address.fromString('0x2f800db0fdb5223b3c3f354886d907a671414a7f')
export const NCT_ERC20_CONTRACT = Address.fromString('0xD838290e877E0188a4A44700463419ED96c16107')
export const MCO2_ERC20_CONTRACT = Address.fromString('0xaa7dbd1598251f856c12f63557a4c4397c253cea')
export const CCO2_ERC20_CONTRACT = Address.fromString('0x82B37070e43C1BA0EA9e2283285b674eF7f1D4E2')
export const UBO_ERC20_CONTRACT = Address.fromString('0x2B3eCb0991AF0498ECE9135bcD04013d7993110c')
export const NBO_ERC20_CONTRACT = Address.fromString('0x6BCa3B77C1909Ce1a4Ba1A20d1103bDe8d222E48')
export const USDC_ERC20_CONTRACT = Address.fromString('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174')

// Protocol Functional Addresses
export const DAO_MULTISIG = Address.fromString('0x65a5076c0ba74e5f3e069995dc3dab9d197d995c')
export const STAKING_CONTRACT_V1 = Address.fromString('0x25d28a24Ceb6F81015bB0b2007D795ACAc411b4d')
export const BONDING_CALCULATOR = Address.fromString('0x0b8d6D6611Ed7cCe01BbcC57826548C6107B0478')

//Vesting constants
export const C3_PLATFORM = 'C3'
export const C3_WSKLIMA_CONTRACT = Address.fromString('0xe02efadA566Af74c92b6659d03BAaCb4c06Cc856')
export const C3_WSKLIMA_INIT_TIMESTAMP = BigInt.fromString('1651449600') //Date Timestamp of contract creation

export const NFT_CO2COMPOUND_PLATFORM = 'NFT_CO2_COMPOUND'
export const NFT_CO2COMPOUND_CONTRACT = Address.fromString('0x08e253270240509E57B9543c0453F0bAc839d0a1')
export const NFT_CO2COMPOUND_INIT_TIMESTAMP = BigInt.fromString('1638486000') //Date Timestamp of contract creation

export const ZERO_ADDRESS = Address.fromString('0x0000000000000000000000000000000000000000')

// Klima Infinity Addresses
export const KLIMA_CARBON_RETIREMENTS_CONTRACT = Address.fromString('0xac298CD34559B9AcfaedeA8344a977eceff1C0Fd') // polygon
export const AMOY_KLIMA_CARBON_RETIREMENTS_CONTRACT = Address.fromString('0x5505a7b6ced40a41882a38fc11e2f8bcab2b46f7') //amoy
export const KLIMA_INFINITY_DIAMOND = Address.fromString('0x8cE54d9625371fb2a068986d32C85De8E6e995f8') //mumbai

// Other ecosystem addresses
export const TOUCAN_CONTRACT_REGISTRY_ADDRESS = Address.fromString('0x263fA1c180889b3a3f46330F32a4a23287E99FC9')
export const C3_VERIFIED_CARBON_UNITS_OFFSET = Address.fromString('0x7b364DFc0e085468aFDe869DF20036D80b8868e7') 
export const TOUCAN_CARBON_OFFSETS_ESCROW_ADDRESS = Address.fromString('0x2D2B8A154EFE0E5dd9e8E923eAd9abb7e5D770C3')
export const TOUCAN_REGEN_BRIDGE = Address.fromString('0xdC1Dfa22824Af4e423a558bbb6C53a31c3c11DCC')
export const TOUCAN_CROSS_CHAIN_MESSENGER = Address.fromString('0xABaC3D6b281Bbe0Fc0F67b26247cB27994eaAcaf')
export const ICR_MIGRATION_BLOCK = BigInt.fromI32(55149940)
export const PURO_ID_MIGRATION_BLOCK = BigInt.fromI32(57616136)
export const ICR_MIGRATION_HASHES = [
  '0x96b7391245efd9522b0b15ea31bd435ce835bc475212445bddabff66f19f78e7',
  '0x1477310f45932c35a305b0627ee5c11987554c5d1c994856a8fc12968b6bf6c4',
  '0x5830c576555b4c199d4a5a8f49371a9164b28bb989f1533a33cef88e0533227a',
  '0xb846f9dccc9d7e72eb6f28b5cd795bcd1eb5b623477e1381e38b767884d2ea80',
  '0x57ac96e048a97831f7e069861636cf797a8c8b9cde086a6ec1807aa73ae10f9c',
  '0x025fbd3fbd372bb91c3080dfabd5f022d8abcbeabea5b44d0fb52175fb8326e8',
  '0x9f342e9d1580de379ef68b09e6b15fbb8f8bf554e3885ba6e68c94e1f9d6ae55',
  '0xb1555aa1feca65e23e43ecc23f35b87e702cc2eb21c59d0c8c2c6610d6c3c5ec',
  '0x3e01b071ce912359b6605c87f4e80d297f2dc7dba53562aff6e11b955e024cf2',
]

// Global constants
export const KGS_PER_TONNE = BigDecimal.fromString('1000')

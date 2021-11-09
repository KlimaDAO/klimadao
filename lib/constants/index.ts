const mainnet = {
  bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
  treasury: "0x7Dd4f0B986F032A44F913BF92c9e8b7c17D77aD7",
  distributor: "0x4cC7584C3f8FAABf734374ef129dF17c3517e9cB",
  sklima: "0xb0C22d8D350C67420f06F48936654f567C73E8C8",
  bctUsdcLp: "0x1e67124681b402064cd0abe8ed1b5c79d2e02f64",
  klimaBctLp: "0x9803c7ae526049210a1725f7487af26fe2c24614",
};

const testnet: typeof mainnet = {
  bct: "",
  treasury: "",
  distributor: "",
  sklima: "",
  bctUsdcLp: "",
  klimaBctLp: "",
};

export const addresses = {
  mainnet,
  testnet,
};

export const urls = {
  epaSource:
    "https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references",
  blog: "https://klimadao.medium.com/",
  emailSignUp:
    "https://docs.google.com/forms/d/e/1FAIpQLSeJ4-dPoSBS50kT1hSBzQGiA8lMnL5DYKjptQoMBKmgFokJmg/viewform",
  discordInvite: "https://discord.gg/kx4pahaFw8",
  gitbook: "https://klima-dao.gitbook.io/klima-dao/",
  app: "https://dapp.klimadao.finance",
};

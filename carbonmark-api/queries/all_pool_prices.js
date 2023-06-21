const { gql } = require("@apollo/client");

const ALL_POOL_PRICES = gql`
  query pairs {
    prices: pairs {
      address: id
      price: currentprice
    }
  }
`;

module.exports.ALL_POOL_PRICES = ALL_POOL_PRICES;

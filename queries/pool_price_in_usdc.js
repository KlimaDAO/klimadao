const { gql } = require('@apollo/client');


const POOL_PRICE = gql`
      query tokenPairsQuery($id: String!, $skip: Int, $block: Block_height) {
        pairs0: pairs(
          first: 1000
          skip: $skip
          orderBy: reserveUSD
          orderDirection: desc
          token0: $id
          block: $block
          orderBy: reserveUSD
          orderDirection: desc
        ) {
          ...pairFields
        }
        pairs1: pairs(
          first: 1000
          skip: $skip
          orderBy: reserveUSD
          orderDirection: desc
          token1: $id
          block: $block
          orderBy: reserveUSD
          orderDirection: desc
        ) {
          ...pairFields
        }
      }
      fragment pairFields on Pair {
        id
        reserveUSD
        reserveETH
        volumeUSD
        untrackedVolumeUSD
        trackedReserveETH
        token0 {
          ...PairToken
        }
        token1 {
          ...PairToken
        }
        reserve0
        reserve1
        token0Price
        token1Price
        totalSupply
        txCount
        timestamp
      }
      fragment PairToken on Token {
        id
        name
        symbol
        totalSupply
        derivedETH
      }
    `;


module.exports.POOL_PRICE = POOL_PRICE;

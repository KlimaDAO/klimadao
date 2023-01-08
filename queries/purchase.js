const { gql } = require('@apollo/client');

const GET_PURCHASE_BY_ID = gql`
    query purchases ($id: Bytes){
        purchases(first: 1, where: {id: $id}) {
                id
                amount
                listing {
                  id
                  totalAmountToSell
                  leftToSell
                  tokenAddress
                  active
                  deleted
                  batches
                  batchPrices
                  singleUnitPrice
                  createdAt
                  updatedAt
                  seller {
                    id
                  }
                }
                price
                timeStamp
                user{
                id
              }
        }
    }
    `
module.exports.GET_PURCHASE_BY_ID = GET_PURCHASE_BY_ID;

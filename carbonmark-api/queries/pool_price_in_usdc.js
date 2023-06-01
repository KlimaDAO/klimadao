const { gql } = require('@apollo/client');


const POOL_PRICE = gql`
      query pairs($id: String) {
        pair(id: $id) {
              currentprice
        }
      }
    `;


module.exports.POOL_PRICE = POOL_PRICE;

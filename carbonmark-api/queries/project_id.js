const { gql } = require("@apollo/client");

const GET_PROJECT_BY_ID = gql`
  query projects($key: String, $vintageStr: String) {
    projects(where: { key: $key, vintage: $vintageStr }) {
      id
      key
      projectID
      name
      vintage
      projectAddress
      registry
      country {
        id
      }
      listings {
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
      activities(orderBy: timeStamp, orderDirection: desc, first: 10) {
        id
        amount
        previousAmount
        price
        previousPrice
        timeStamp
        activityType
        seller {
          id
        }
        buyer {
          id
        }
      }
    }
  }
`;
module.exports.GET_PROJECT_BY_ID = GET_PROJECT_BY_ID;

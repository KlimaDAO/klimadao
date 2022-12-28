const { gql } = require('@apollo/client');


const GET_USER_LISTING = gql`
query users($wallet: Bytes!){
    users( where: {
        id: $wallet
        }
    )
    {
        listings {
            id,
            totalAmountToSell
            leftToSell
            tokenAddress
            active
            deleted
            batches
            batchPrices
            singleUnitPrice
            project {
                name
                category
            }
        }
        activities {
            id
            amount
            previousAmount
            price 
            previousPrice
            timeStamp
            activityType
            project {
                key
            }
            seller {
                id
            }
            buyer {
                id
            }
        }
        purchases {
            id
        }
    }
}
`
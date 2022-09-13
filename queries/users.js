const { gql } = require('@apollo/client');

const GET_USER_DATA = gql`
            query users($wallet: Bytes!){
                users( where: {
                    id: $wallet
                    }
                )
                {
                    listings {
                        id,
                        seller,
                        totalAmountToSell,
                        tokenAddress,
                        active,
                        deleted,
                        batches,
                        batchPrices,
                        singleUnitPrice,
                        projectId,
                    }
                    activities {
                        id,
                        previousData,
                        currentData,
                        activityType,
                        timeStamp,
                    }
                }
            }
            `

module.exports.GET_USER_DATA = GET_USER_DATA;

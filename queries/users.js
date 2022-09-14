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

module.exports.GET_USER_DATA = GET_USER_DATA;

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
                        project {
                            name
                            category {
                                id
                            }
                            id
                            key
                            projectID
                            methodology
                            vintage
                            projectAddress
                            registry
                        }
                        seller {
                            id
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
                            name
                            category {
                                id
                            }
                            id
                            key
                            projectID
                            methodology
                            vintage
                            projectAddress
                            registry
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

const { gql } = require('@apollo/client');

const GET_PROJECT_BY_ID = gql`
            query projects($key: String, $vintageStr: String){
                projects(where: {
                    key: $key
                    vintage: $vintageStr
                    }
                    )
                {
                    id
                    key
                    projectID
                    name
                    methodology
                    vintage
                    projectAddress
                    registry
                    category {
                        id
                    }
                    country{
                        id
                    }
                    listings {
                        id
                        seller
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
                    activities {
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
                        project {
                            id
                            key
                            projectID
                            name
                            methodology
                            vintage
                            projectAddress
                            registry
                            category {
                                id
                            }
                            country{
                                id
                            }
                            updatedAt
                            }
                        }
                }
            }
            `
module.exports.GET_PROJECT_BY_ID = GET_PROJECT_BY_ID;

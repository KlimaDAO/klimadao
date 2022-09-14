const { gql } = require('@apollo/client');

const GET_PROJECTS = gql`
            query projects{
                projects
                {
                    id
                    key
                    projectID
                    name
                    methodology
                    vintage
                    projectAddress
                    registry
                    
                }
            }
            `
const GET_PROJECT_BY_ID = gql`
            query projects($id: BigInt!){
                projects(where: {
                    id: $id
                    })
                {
                    id
                    key
                    projectID
                    name
                    methodology
                    vintage
                    projectAddress
                    registry
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
                }
            }
            `
module.exports.GET_PROJECTS = GET_PROJECTS;
module.exports.GET_PROJECT_BY_ID = GET_PROJECT_BY_ID;

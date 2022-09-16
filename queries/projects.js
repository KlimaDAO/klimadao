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
            query projects($projectID: String!, $vintage: BigInt!, $country: String!, $category: String!, $search: String!){
                projects(where: {
                    projectID: $projectID
                    vintage: $vintage
                    },
                    filter: {
                        name_contains: $search
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
                    category(filter: {
                        id: $category
                    }) {
                        id
                    }
                    country(filter: {
                        id: $country
                    }) {
                        id
                    }
                    listings {
                        id
                        seller
                        totalAmountToSell
                        tokenAddress
                        active
                        deleted
                        batches
                        batchPrices
                        singleUnitPrice
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

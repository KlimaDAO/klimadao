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
                    listings {
                        singleUnitPrice
                    }
                    category {
                        id
                    }
                    country{
                        id
                    }
                    updatedAt
                    
                }
            }
            `

module.exports.GET_PROJECTS = GET_PROJECTS;

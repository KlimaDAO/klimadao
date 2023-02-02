const { gql } = require('@apollo/client');

const POOLED_PROJECTS = gql`
            query carbonOffsets{
                carbonOffsets
                {
                    id
                    name
                    tokenAddress
                    vintage
                    vintageYear
                    bridge
                    projectID
                    methodology
                    methodologyCategory
                    country
                    category
                    name
                    registry
                    totalBridged
                    totalRetired
                    storageMethod
                    lastUpdate
                }
            }
            `

module.exports.POOLED_PROJECTS = POOLED_PROJECTS;

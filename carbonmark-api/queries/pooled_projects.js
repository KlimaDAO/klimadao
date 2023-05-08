const { gql } = require('@apollo/client');

const POOLED_PROJECTS = gql`
            query carbonOffsets($country: [String], $category: [String], $search: String, $vintage: [String]){
                carbonOffsets
                (first:1000,
                    where: {
                    methodologyCategory_in:  $category,
                    country_in:  $country ,
                    name_contains_nocase: $search,
                    vintageYear_in: $vintage
                })
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
                    balanceUBO
                    balanceNBO
                    balanceNCT
                    balanceBCT
                }
            }
            `

module.exports.POOLED_PROJECTS = POOLED_PROJECTS;

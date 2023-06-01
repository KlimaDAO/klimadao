const { gql } = require('@apollo/client');


const POOL_PROJECTS = gql`
    query carbonOffsets ($key: String!, $vintageStr: BigInt!){
        carbonOffsets(where: {projectID: $key, vintageYear: $vintageStr}) {
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
            currentSupply
            storageMethod
            balanceUBO
            balanceNBO
            balanceNCT
            balanceBCT
        }
    }
    `

module.exports.POOL_PROJECTS = POOL_PROJECTS;

const { gql } = require('@apollo/client');

const CARBON_OFFSETS = gql`
    query carbonOffsets ($projectID: String!, $vintage: BigInt!){
        carbonOffsets(first: 5, where: {projectID: $projectID, vintage: $vintage}) {
            id
            name
            tokenAddress
            bridge
            vintage
            projectID
            balanceBCT
            balanceNCT
            balanceUBO
            balanceNBO
        }
    }
    `


const POOLED_PROJECTS = gql`
    query pooledProjects {
            carbonOffsets {
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
        }
    }
    `
module.exports.CARBON_OFFSETS = CARBON_OFFSETS;
module.exports.POOLED_PROJECTS = POOLED_PROJECTS;


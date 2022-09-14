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
module.exports.CARBON_OFFSETS = CARBON_OFFSETS;

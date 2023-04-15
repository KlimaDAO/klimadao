const { gql } = require('@apollo/client');

const GET_CATEGORIES = gql`
            query categories{
                categories {
                    id
                }
            }
            `

const GET_POOLED_PROJECT_COUNTRY = gql`
            query carbonOffsets{
                carbonOffsets {
                    country
                }
            }
            `


const GET_POOLED_PROJECT_CAT = gql`
            query carbonOffsets{
                carbonOffsets {
                    methodologyCategory
                }
            }
            `
const GET_POOLED_PROJECT_VINTAGE = gql`
query carbonOffsets{
    carbonOffsets {
        vintageYear
    }
}
`
module.exports = {
    GET_CATEGORIES,
    GET_POOLED_PROJECT_CAT,
    GET_POOLED_PROJECT_VINTAGE,
    GET_POOLED_PROJECT_COUNTRY
};

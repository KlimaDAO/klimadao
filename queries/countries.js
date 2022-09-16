const { gql } = require('@apollo/client');

const GET_COUNTRIES = gql`
            query countries{
                countries{
                    id
                }
            }
            `

module.exports.GET_COUNTRIES = GET_COUNTRIES;

const { gql } = require('@apollo/client');

const GET_VINTAGES = gql`
            query projects{
                projects
                {
                    vintage
                }
            }
            `

module.exports.GET_VINTAGES = GET_VINTAGES;

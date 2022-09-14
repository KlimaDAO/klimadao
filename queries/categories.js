const { gql } = require('@apollo/client');

const GET_CATEGORIES = gql`
            query categories{
                categories(
                    id
                )
                
            }
            `

module.exports.GET_CATEGORIES = GET_CATEGORIES;

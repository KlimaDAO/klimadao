const { gql } = require('@apollo/client');

const GET_USER_DATA = gql`
            query users($wallet: Bytes!){
                users( where: {
                    id: $wallet
                    }
                )
                {
                    listings
                    activities
                }
            }
            `

module.exports.GET_USER_DATA = GET_USER_DATA;

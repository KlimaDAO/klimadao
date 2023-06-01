const { gql } = require('@apollo/client');

const GET_TOKEN_ADDRESS = gql`
            query tokens ($symbol: String){
                tokens(where:{
                symbol:  $symbol
                }) {
                    id
                }
            }
            `

module.exports.GET_TOKEN_ADDRESS = GET_TOKEN_ADDRESS;

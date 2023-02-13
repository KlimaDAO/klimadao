const { gql } = require('@apollo/client');

const GET_USER_ASSETS = gql`
            query assets($wallet: Bytes){
                accounts( where: {
                    id: $wallet
                    }
                )
                {
                    holdings {
                        id
                        token {
                            name
                            symbol
                            decimals
                        }
                        tokenAmount
                        updatedAt
                    }
                }
            }
            `
module.exports.GET_USER_ASSETS = GET_USER_ASSETS;

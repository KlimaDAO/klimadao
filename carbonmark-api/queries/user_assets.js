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
                            id 
                            name
                            symbol
                            decimals   
                        }
                        amount
                    }
                }
            }
            `
module.exports.GET_USER_ASSETS = GET_USER_ASSETS;

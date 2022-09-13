const { gql } = require('@apollo/client');

const GET_USER_LISTINGS = gql`
            query listings($wallet: Bytes!){
                listings( where: {
                    seller: $wallet
                    }
                )
                {
                    id
                    seller
                    totalAmountToSell
                    tokenAddress
                }
            }
            `

module.exports.GET_USER_LISTINGS = GET_USER_LISTINGS;

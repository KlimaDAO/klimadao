import { BigInt } from '@graphprotocol/graph-ts'
import { Market } from '../../generated/schema'

export function loadMarket(marketId: BigInt): Market {
    const market = Market.load(marketId.toString())
    if(market == null) {
        throw new Error("Market not found - Market ID: "+ marketId.toString());
    }
    
    return market as Market
}
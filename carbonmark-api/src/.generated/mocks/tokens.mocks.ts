//@ts-nocheck
import casual from 'casual';
import { BlockChangedFilter, Block_Height, Pair, Pair_Filter, Query, Subscription, Swap, Swap_Filter, Token, Token_Filter, _Block_, _Meta_, OrderDirection, Pair_OrderBy, Swap_OrderBy, Token_OrderBy, _SubgraphErrorPolicy_ } from '../types/tokens.types';

casual.seed(0);

export const aBlockChangedFilter = (overrides?: Partial<BlockChangedFilter>, _relationshipsToOmit: Set<string> = new Set()): BlockChangedFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('BlockChangedFilter');
    return {
        number_gte: overrides && overrides.hasOwnProperty('number_gte') ? overrides.number_gte! : casual.integer(0, 9999),
    };
};

export const aBlock_Height = (overrides?: Partial<Block_Height>, _relationshipsToOmit: Set<string> = new Set()): Block_Height => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Block_Height');
    return {
        hash: overrides && overrides.hasOwnProperty('hash') ? overrides.hash! : casual.word,
        number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : casual.integer(0, 9999),
        number_gte: overrides && overrides.hasOwnProperty('number_gte') ? overrides.number_gte! : casual.integer(0, 9999),
    };
};

export const aPair = (overrides?: Partial<Pair>, _relationshipsToOmit: Set<string> = new Set()): Pair => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Pair');
    return {
        currentprice: overrides && overrides.hasOwnProperty('currentprice') ? overrides.currentprice! : casual.word,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : casual['string'],
        lastupdate: overrides && overrides.hasOwnProperty('lastupdate') ? overrides.lastupdate! : casual.word,
        swaps: overrides && overrides.hasOwnProperty('swaps') ? overrides.swaps! : [relationshipsToOmit.has('Swap') ? {} as Swap : aSwap({}, relationshipsToOmit)],
        token0: overrides && overrides.hasOwnProperty('token0') ? overrides.token0! : relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit),
        token1: overrides && overrides.hasOwnProperty('token1') ? overrides.token1! : relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit),
        totalklimaearnedfees: overrides && overrides.hasOwnProperty('totalklimaearnedfees') ? overrides.totalklimaearnedfees! : casual.word,
        totalvolume: overrides && overrides.hasOwnProperty('totalvolume') ? overrides.totalvolume! : casual.word,
    };
};

export const aPair_Filter = (overrides?: Partial<Pair_Filter>, _relationshipsToOmit: Set<string> = new Set()): Pair_Filter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Pair_Filter');
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : relationshipsToOmit.has('BlockChangedFilter') ? {} as BlockChangedFilter : aBlockChangedFilter({}, relationshipsToOmit),
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [relationshipsToOmit.has('Pair_Filter') ? {} as Pair_Filter : aPair_Filter({}, relationshipsToOmit)],
        currentprice: overrides && overrides.hasOwnProperty('currentprice') ? overrides.currentprice! : casual.word,
        currentprice_gt: overrides && overrides.hasOwnProperty('currentprice_gt') ? overrides.currentprice_gt! : casual.word,
        currentprice_gte: overrides && overrides.hasOwnProperty('currentprice_gte') ? overrides.currentprice_gte! : casual.word,
        currentprice_in: overrides && overrides.hasOwnProperty('currentprice_in') ? overrides.currentprice_in! : [casual.word],
        currentprice_lt: overrides && overrides.hasOwnProperty('currentprice_lt') ? overrides.currentprice_lt! : casual.word,
        currentprice_lte: overrides && overrides.hasOwnProperty('currentprice_lte') ? overrides.currentprice_lte! : casual.word,
        currentprice_not: overrides && overrides.hasOwnProperty('currentprice_not') ? overrides.currentprice_not! : casual.word,
        currentprice_not_in: overrides && overrides.hasOwnProperty('currentprice_not_in') ? overrides.currentprice_not_in! : [casual.word],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : casual['string'],
        id_gt: overrides && overrides.hasOwnProperty('id_gt') ? overrides.id_gt! : casual['string'],
        id_gte: overrides && overrides.hasOwnProperty('id_gte') ? overrides.id_gte! : casual['string'],
        id_in: overrides && overrides.hasOwnProperty('id_in') ? overrides.id_in! : [casual['string']],
        id_lt: overrides && overrides.hasOwnProperty('id_lt') ? overrides.id_lt! : casual['string'],
        id_lte: overrides && overrides.hasOwnProperty('id_lte') ? overrides.id_lte! : casual['string'],
        id_not: overrides && overrides.hasOwnProperty('id_not') ? overrides.id_not! : casual['string'],
        id_not_in: overrides && overrides.hasOwnProperty('id_not_in') ? overrides.id_not_in! : [casual['string']],
        lastupdate: overrides && overrides.hasOwnProperty('lastupdate') ? overrides.lastupdate! : casual.word,
        lastupdate_contains: overrides && overrides.hasOwnProperty('lastupdate_contains') ? overrides.lastupdate_contains! : casual.word,
        lastupdate_contains_nocase: overrides && overrides.hasOwnProperty('lastupdate_contains_nocase') ? overrides.lastupdate_contains_nocase! : casual.word,
        lastupdate_ends_with: overrides && overrides.hasOwnProperty('lastupdate_ends_with') ? overrides.lastupdate_ends_with! : casual.word,
        lastupdate_ends_with_nocase: overrides && overrides.hasOwnProperty('lastupdate_ends_with_nocase') ? overrides.lastupdate_ends_with_nocase! : casual.word,
        lastupdate_gt: overrides && overrides.hasOwnProperty('lastupdate_gt') ? overrides.lastupdate_gt! : casual.word,
        lastupdate_gte: overrides && overrides.hasOwnProperty('lastupdate_gte') ? overrides.lastupdate_gte! : casual.word,
        lastupdate_in: overrides && overrides.hasOwnProperty('lastupdate_in') ? overrides.lastupdate_in! : [casual.word],
        lastupdate_lt: overrides && overrides.hasOwnProperty('lastupdate_lt') ? overrides.lastupdate_lt! : casual.word,
        lastupdate_lte: overrides && overrides.hasOwnProperty('lastupdate_lte') ? overrides.lastupdate_lte! : casual.word,
        lastupdate_not: overrides && overrides.hasOwnProperty('lastupdate_not') ? overrides.lastupdate_not! : casual.word,
        lastupdate_not_contains: overrides && overrides.hasOwnProperty('lastupdate_not_contains') ? overrides.lastupdate_not_contains! : casual.word,
        lastupdate_not_contains_nocase: overrides && overrides.hasOwnProperty('lastupdate_not_contains_nocase') ? overrides.lastupdate_not_contains_nocase! : casual.word,
        lastupdate_not_ends_with: overrides && overrides.hasOwnProperty('lastupdate_not_ends_with') ? overrides.lastupdate_not_ends_with! : casual.word,
        lastupdate_not_ends_with_nocase: overrides && overrides.hasOwnProperty('lastupdate_not_ends_with_nocase') ? overrides.lastupdate_not_ends_with_nocase! : casual.word,
        lastupdate_not_in: overrides && overrides.hasOwnProperty('lastupdate_not_in') ? overrides.lastupdate_not_in! : [casual.word],
        lastupdate_not_starts_with: overrides && overrides.hasOwnProperty('lastupdate_not_starts_with') ? overrides.lastupdate_not_starts_with! : casual.word,
        lastupdate_not_starts_with_nocase: overrides && overrides.hasOwnProperty('lastupdate_not_starts_with_nocase') ? overrides.lastupdate_not_starts_with_nocase! : casual.word,
        lastupdate_starts_with: overrides && overrides.hasOwnProperty('lastupdate_starts_with') ? overrides.lastupdate_starts_with! : casual.word,
        lastupdate_starts_with_nocase: overrides && overrides.hasOwnProperty('lastupdate_starts_with_nocase') ? overrides.lastupdate_starts_with_nocase! : casual.word,
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [relationshipsToOmit.has('Pair_Filter') ? {} as Pair_Filter : aPair_Filter({}, relationshipsToOmit)],
        swaps_: overrides && overrides.hasOwnProperty('swaps_') ? overrides.swaps_! : relationshipsToOmit.has('Swap_Filter') ? {} as Swap_Filter : aSwap_Filter({}, relationshipsToOmit),
        token0: overrides && overrides.hasOwnProperty('token0') ? overrides.token0! : casual.word,
        token0_: overrides && overrides.hasOwnProperty('token0_') ? overrides.token0_! : relationshipsToOmit.has('Token_Filter') ? {} as Token_Filter : aToken_Filter({}, relationshipsToOmit),
        token0_contains: overrides && overrides.hasOwnProperty('token0_contains') ? overrides.token0_contains! : casual.word,
        token0_contains_nocase: overrides && overrides.hasOwnProperty('token0_contains_nocase') ? overrides.token0_contains_nocase! : casual.word,
        token0_ends_with: overrides && overrides.hasOwnProperty('token0_ends_with') ? overrides.token0_ends_with! : casual.word,
        token0_ends_with_nocase: overrides && overrides.hasOwnProperty('token0_ends_with_nocase') ? overrides.token0_ends_with_nocase! : casual.word,
        token0_gt: overrides && overrides.hasOwnProperty('token0_gt') ? overrides.token0_gt! : casual.word,
        token0_gte: overrides && overrides.hasOwnProperty('token0_gte') ? overrides.token0_gte! : casual.word,
        token0_in: overrides && overrides.hasOwnProperty('token0_in') ? overrides.token0_in! : [casual.word],
        token0_lt: overrides && overrides.hasOwnProperty('token0_lt') ? overrides.token0_lt! : casual.word,
        token0_lte: overrides && overrides.hasOwnProperty('token0_lte') ? overrides.token0_lte! : casual.word,
        token0_not: overrides && overrides.hasOwnProperty('token0_not') ? overrides.token0_not! : casual.word,
        token0_not_contains: overrides && overrides.hasOwnProperty('token0_not_contains') ? overrides.token0_not_contains! : casual.word,
        token0_not_contains_nocase: overrides && overrides.hasOwnProperty('token0_not_contains_nocase') ? overrides.token0_not_contains_nocase! : casual.word,
        token0_not_ends_with: overrides && overrides.hasOwnProperty('token0_not_ends_with') ? overrides.token0_not_ends_with! : casual.word,
        token0_not_ends_with_nocase: overrides && overrides.hasOwnProperty('token0_not_ends_with_nocase') ? overrides.token0_not_ends_with_nocase! : casual.word,
        token0_not_in: overrides && overrides.hasOwnProperty('token0_not_in') ? overrides.token0_not_in! : [casual.word],
        token0_not_starts_with: overrides && overrides.hasOwnProperty('token0_not_starts_with') ? overrides.token0_not_starts_with! : casual.word,
        token0_not_starts_with_nocase: overrides && overrides.hasOwnProperty('token0_not_starts_with_nocase') ? overrides.token0_not_starts_with_nocase! : casual.word,
        token0_starts_with: overrides && overrides.hasOwnProperty('token0_starts_with') ? overrides.token0_starts_with! : casual.word,
        token0_starts_with_nocase: overrides && overrides.hasOwnProperty('token0_starts_with_nocase') ? overrides.token0_starts_with_nocase! : casual.word,
        token1: overrides && overrides.hasOwnProperty('token1') ? overrides.token1! : casual.word,
        token1_: overrides && overrides.hasOwnProperty('token1_') ? overrides.token1_! : relationshipsToOmit.has('Token_Filter') ? {} as Token_Filter : aToken_Filter({}, relationshipsToOmit),
        token1_contains: overrides && overrides.hasOwnProperty('token1_contains') ? overrides.token1_contains! : casual.word,
        token1_contains_nocase: overrides && overrides.hasOwnProperty('token1_contains_nocase') ? overrides.token1_contains_nocase! : casual.word,
        token1_ends_with: overrides && overrides.hasOwnProperty('token1_ends_with') ? overrides.token1_ends_with! : casual.word,
        token1_ends_with_nocase: overrides && overrides.hasOwnProperty('token1_ends_with_nocase') ? overrides.token1_ends_with_nocase! : casual.word,
        token1_gt: overrides && overrides.hasOwnProperty('token1_gt') ? overrides.token1_gt! : casual.word,
        token1_gte: overrides && overrides.hasOwnProperty('token1_gte') ? overrides.token1_gte! : casual.word,
        token1_in: overrides && overrides.hasOwnProperty('token1_in') ? overrides.token1_in! : [casual.word],
        token1_lt: overrides && overrides.hasOwnProperty('token1_lt') ? overrides.token1_lt! : casual.word,
        token1_lte: overrides && overrides.hasOwnProperty('token1_lte') ? overrides.token1_lte! : casual.word,
        token1_not: overrides && overrides.hasOwnProperty('token1_not') ? overrides.token1_not! : casual.word,
        token1_not_contains: overrides && overrides.hasOwnProperty('token1_not_contains') ? overrides.token1_not_contains! : casual.word,
        token1_not_contains_nocase: overrides && overrides.hasOwnProperty('token1_not_contains_nocase') ? overrides.token1_not_contains_nocase! : casual.word,
        token1_not_ends_with: overrides && overrides.hasOwnProperty('token1_not_ends_with') ? overrides.token1_not_ends_with! : casual.word,
        token1_not_ends_with_nocase: overrides && overrides.hasOwnProperty('token1_not_ends_with_nocase') ? overrides.token1_not_ends_with_nocase! : casual.word,
        token1_not_in: overrides && overrides.hasOwnProperty('token1_not_in') ? overrides.token1_not_in! : [casual.word],
        token1_not_starts_with: overrides && overrides.hasOwnProperty('token1_not_starts_with') ? overrides.token1_not_starts_with! : casual.word,
        token1_not_starts_with_nocase: overrides && overrides.hasOwnProperty('token1_not_starts_with_nocase') ? overrides.token1_not_starts_with_nocase! : casual.word,
        token1_starts_with: overrides && overrides.hasOwnProperty('token1_starts_with') ? overrides.token1_starts_with! : casual.word,
        token1_starts_with_nocase: overrides && overrides.hasOwnProperty('token1_starts_with_nocase') ? overrides.token1_starts_with_nocase! : casual.word,
        totalklimaearnedfees: overrides && overrides.hasOwnProperty('totalklimaearnedfees') ? overrides.totalklimaearnedfees! : casual.word,
        totalklimaearnedfees_gt: overrides && overrides.hasOwnProperty('totalklimaearnedfees_gt') ? overrides.totalklimaearnedfees_gt! : casual.word,
        totalklimaearnedfees_gte: overrides && overrides.hasOwnProperty('totalklimaearnedfees_gte') ? overrides.totalklimaearnedfees_gte! : casual.word,
        totalklimaearnedfees_in: overrides && overrides.hasOwnProperty('totalklimaearnedfees_in') ? overrides.totalklimaearnedfees_in! : [casual.word],
        totalklimaearnedfees_lt: overrides && overrides.hasOwnProperty('totalklimaearnedfees_lt') ? overrides.totalklimaearnedfees_lt! : casual.word,
        totalklimaearnedfees_lte: overrides && overrides.hasOwnProperty('totalklimaearnedfees_lte') ? overrides.totalklimaearnedfees_lte! : casual.word,
        totalklimaearnedfees_not: overrides && overrides.hasOwnProperty('totalklimaearnedfees_not') ? overrides.totalklimaearnedfees_not! : casual.word,
        totalklimaearnedfees_not_in: overrides && overrides.hasOwnProperty('totalklimaearnedfees_not_in') ? overrides.totalklimaearnedfees_not_in! : [casual.word],
        totalvolume: overrides && overrides.hasOwnProperty('totalvolume') ? overrides.totalvolume! : casual.word,
        totalvolume_gt: overrides && overrides.hasOwnProperty('totalvolume_gt') ? overrides.totalvolume_gt! : casual.word,
        totalvolume_gte: overrides && overrides.hasOwnProperty('totalvolume_gte') ? overrides.totalvolume_gte! : casual.word,
        totalvolume_in: overrides && overrides.hasOwnProperty('totalvolume_in') ? overrides.totalvolume_in! : [casual.word],
        totalvolume_lt: overrides && overrides.hasOwnProperty('totalvolume_lt') ? overrides.totalvolume_lt! : casual.word,
        totalvolume_lte: overrides && overrides.hasOwnProperty('totalvolume_lte') ? overrides.totalvolume_lte! : casual.word,
        totalvolume_not: overrides && overrides.hasOwnProperty('totalvolume_not') ? overrides.totalvolume_not! : casual.word,
        totalvolume_not_in: overrides && overrides.hasOwnProperty('totalvolume_not_in') ? overrides.totalvolume_not_in! : [casual.word],
    };
};

export const aQuery = (overrides?: Partial<Query>, _relationshipsToOmit: Set<string> = new Set()): Query => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Query');
    return {
        _meta: overrides && overrides.hasOwnProperty('_meta') ? overrides._meta! : relationshipsToOmit.has('_Meta_') ? {} as _Meta_ : a_Meta_({}, relationshipsToOmit),
        pair: overrides && overrides.hasOwnProperty('pair') ? overrides.pair! : relationshipsToOmit.has('Pair') ? {} as Pair : aPair({}, relationshipsToOmit),
        pairs: overrides && overrides.hasOwnProperty('pairs') ? overrides.pairs! : [relationshipsToOmit.has('Pair') ? {} as Pair : aPair({}, relationshipsToOmit)],
        swap: overrides && overrides.hasOwnProperty('swap') ? overrides.swap! : relationshipsToOmit.has('Swap') ? {} as Swap : aSwap({}, relationshipsToOmit),
        swaps: overrides && overrides.hasOwnProperty('swaps') ? overrides.swaps! : [relationshipsToOmit.has('Swap') ? {} as Swap : aSwap({}, relationshipsToOmit)],
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit),
        tokens: overrides && overrides.hasOwnProperty('tokens') ? overrides.tokens! : [relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit)],
    };
};

export const aSubscription = (overrides?: Partial<Subscription>, _relationshipsToOmit: Set<string> = new Set()): Subscription => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Subscription');
    return {
        _meta: overrides && overrides.hasOwnProperty('_meta') ? overrides._meta! : relationshipsToOmit.has('_Meta_') ? {} as _Meta_ : a_Meta_({}, relationshipsToOmit),
        pair: overrides && overrides.hasOwnProperty('pair') ? overrides.pair! : relationshipsToOmit.has('Pair') ? {} as Pair : aPair({}, relationshipsToOmit),
        pairs: overrides && overrides.hasOwnProperty('pairs') ? overrides.pairs! : [relationshipsToOmit.has('Pair') ? {} as Pair : aPair({}, relationshipsToOmit)],
        swap: overrides && overrides.hasOwnProperty('swap') ? overrides.swap! : relationshipsToOmit.has('Swap') ? {} as Swap : aSwap({}, relationshipsToOmit),
        swaps: overrides && overrides.hasOwnProperty('swaps') ? overrides.swaps! : [relationshipsToOmit.has('Swap') ? {} as Swap : aSwap({}, relationshipsToOmit)],
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit),
        tokens: overrides && overrides.hasOwnProperty('tokens') ? overrides.tokens! : [relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit)],
    };
};

export const aSwap = (overrides?: Partial<Swap>, _relationshipsToOmit: Set<string> = new Set()): Swap => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Swap');
    return {
        close: overrides && overrides.hasOwnProperty('close') ? overrides.close! : casual.word,
        high: overrides && overrides.hasOwnProperty('high') ? overrides.high! : casual.word,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : casual['string'],
        klimaearnedfees: overrides && overrides.hasOwnProperty('klimaearnedfees') ? overrides.klimaearnedfees! : casual.word,
        low: overrides && overrides.hasOwnProperty('low') ? overrides.low! : casual.word,
        lpfees: overrides && overrides.hasOwnProperty('lpfees') ? overrides.lpfees! : casual.word,
        open: overrides && overrides.hasOwnProperty('open') ? overrides.open! : casual.word,
        pair: overrides && overrides.hasOwnProperty('pair') ? overrides.pair! : relationshipsToOmit.has('Pair') ? {} as Pair : aPair({}, relationshipsToOmit),
        slippage: overrides && overrides.hasOwnProperty('slippage') ? overrides.slippage! : casual.word,
        timestamp: overrides && overrides.hasOwnProperty('timestamp') ? overrides.timestamp! : casual.word,
        volume: overrides && overrides.hasOwnProperty('volume') ? overrides.volume! : casual.word,
    };
};

export const aSwap_Filter = (overrides?: Partial<Swap_Filter>, _relationshipsToOmit: Set<string> = new Set()): Swap_Filter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Swap_Filter');
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : relationshipsToOmit.has('BlockChangedFilter') ? {} as BlockChangedFilter : aBlockChangedFilter({}, relationshipsToOmit),
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [relationshipsToOmit.has('Swap_Filter') ? {} as Swap_Filter : aSwap_Filter({}, relationshipsToOmit)],
        close: overrides && overrides.hasOwnProperty('close') ? overrides.close! : casual.word,
        close_gt: overrides && overrides.hasOwnProperty('close_gt') ? overrides.close_gt! : casual.word,
        close_gte: overrides && overrides.hasOwnProperty('close_gte') ? overrides.close_gte! : casual.word,
        close_in: overrides && overrides.hasOwnProperty('close_in') ? overrides.close_in! : [casual.word],
        close_lt: overrides && overrides.hasOwnProperty('close_lt') ? overrides.close_lt! : casual.word,
        close_lte: overrides && overrides.hasOwnProperty('close_lte') ? overrides.close_lte! : casual.word,
        close_not: overrides && overrides.hasOwnProperty('close_not') ? overrides.close_not! : casual.word,
        close_not_in: overrides && overrides.hasOwnProperty('close_not_in') ? overrides.close_not_in! : [casual.word],
        high: overrides && overrides.hasOwnProperty('high') ? overrides.high! : casual.word,
        high_gt: overrides && overrides.hasOwnProperty('high_gt') ? overrides.high_gt! : casual.word,
        high_gte: overrides && overrides.hasOwnProperty('high_gte') ? overrides.high_gte! : casual.word,
        high_in: overrides && overrides.hasOwnProperty('high_in') ? overrides.high_in! : [casual.word],
        high_lt: overrides && overrides.hasOwnProperty('high_lt') ? overrides.high_lt! : casual.word,
        high_lte: overrides && overrides.hasOwnProperty('high_lte') ? overrides.high_lte! : casual.word,
        high_not: overrides && overrides.hasOwnProperty('high_not') ? overrides.high_not! : casual.word,
        high_not_in: overrides && overrides.hasOwnProperty('high_not_in') ? overrides.high_not_in! : [casual.word],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : casual['string'],
        id_gt: overrides && overrides.hasOwnProperty('id_gt') ? overrides.id_gt! : casual['string'],
        id_gte: overrides && overrides.hasOwnProperty('id_gte') ? overrides.id_gte! : casual['string'],
        id_in: overrides && overrides.hasOwnProperty('id_in') ? overrides.id_in! : [casual['string']],
        id_lt: overrides && overrides.hasOwnProperty('id_lt') ? overrides.id_lt! : casual['string'],
        id_lte: overrides && overrides.hasOwnProperty('id_lte') ? overrides.id_lte! : casual['string'],
        id_not: overrides && overrides.hasOwnProperty('id_not') ? overrides.id_not! : casual['string'],
        id_not_in: overrides && overrides.hasOwnProperty('id_not_in') ? overrides.id_not_in! : [casual['string']],
        klimaearnedfees: overrides && overrides.hasOwnProperty('klimaearnedfees') ? overrides.klimaearnedfees! : casual.word,
        klimaearnedfees_gt: overrides && overrides.hasOwnProperty('klimaearnedfees_gt') ? overrides.klimaearnedfees_gt! : casual.word,
        klimaearnedfees_gte: overrides && overrides.hasOwnProperty('klimaearnedfees_gte') ? overrides.klimaearnedfees_gte! : casual.word,
        klimaearnedfees_in: overrides && overrides.hasOwnProperty('klimaearnedfees_in') ? overrides.klimaearnedfees_in! : [casual.word],
        klimaearnedfees_lt: overrides && overrides.hasOwnProperty('klimaearnedfees_lt') ? overrides.klimaearnedfees_lt! : casual.word,
        klimaearnedfees_lte: overrides && overrides.hasOwnProperty('klimaearnedfees_lte') ? overrides.klimaearnedfees_lte! : casual.word,
        klimaearnedfees_not: overrides && overrides.hasOwnProperty('klimaearnedfees_not') ? overrides.klimaearnedfees_not! : casual.word,
        klimaearnedfees_not_in: overrides && overrides.hasOwnProperty('klimaearnedfees_not_in') ? overrides.klimaearnedfees_not_in! : [casual.word],
        low: overrides && overrides.hasOwnProperty('low') ? overrides.low! : casual.word,
        low_gt: overrides && overrides.hasOwnProperty('low_gt') ? overrides.low_gt! : casual.word,
        low_gte: overrides && overrides.hasOwnProperty('low_gte') ? overrides.low_gte! : casual.word,
        low_in: overrides && overrides.hasOwnProperty('low_in') ? overrides.low_in! : [casual.word],
        low_lt: overrides && overrides.hasOwnProperty('low_lt') ? overrides.low_lt! : casual.word,
        low_lte: overrides && overrides.hasOwnProperty('low_lte') ? overrides.low_lte! : casual.word,
        low_not: overrides && overrides.hasOwnProperty('low_not') ? overrides.low_not! : casual.word,
        low_not_in: overrides && overrides.hasOwnProperty('low_not_in') ? overrides.low_not_in! : [casual.word],
        lpfees: overrides && overrides.hasOwnProperty('lpfees') ? overrides.lpfees! : casual.word,
        lpfees_gt: overrides && overrides.hasOwnProperty('lpfees_gt') ? overrides.lpfees_gt! : casual.word,
        lpfees_gte: overrides && overrides.hasOwnProperty('lpfees_gte') ? overrides.lpfees_gte! : casual.word,
        lpfees_in: overrides && overrides.hasOwnProperty('lpfees_in') ? overrides.lpfees_in! : [casual.word],
        lpfees_lt: overrides && overrides.hasOwnProperty('lpfees_lt') ? overrides.lpfees_lt! : casual.word,
        lpfees_lte: overrides && overrides.hasOwnProperty('lpfees_lte') ? overrides.lpfees_lte! : casual.word,
        lpfees_not: overrides && overrides.hasOwnProperty('lpfees_not') ? overrides.lpfees_not! : casual.word,
        lpfees_not_in: overrides && overrides.hasOwnProperty('lpfees_not_in') ? overrides.lpfees_not_in! : [casual.word],
        open: overrides && overrides.hasOwnProperty('open') ? overrides.open! : casual.word,
        open_gt: overrides && overrides.hasOwnProperty('open_gt') ? overrides.open_gt! : casual.word,
        open_gte: overrides && overrides.hasOwnProperty('open_gte') ? overrides.open_gte! : casual.word,
        open_in: overrides && overrides.hasOwnProperty('open_in') ? overrides.open_in! : [casual.word],
        open_lt: overrides && overrides.hasOwnProperty('open_lt') ? overrides.open_lt! : casual.word,
        open_lte: overrides && overrides.hasOwnProperty('open_lte') ? overrides.open_lte! : casual.word,
        open_not: overrides && overrides.hasOwnProperty('open_not') ? overrides.open_not! : casual.word,
        open_not_in: overrides && overrides.hasOwnProperty('open_not_in') ? overrides.open_not_in! : [casual.word],
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [relationshipsToOmit.has('Swap_Filter') ? {} as Swap_Filter : aSwap_Filter({}, relationshipsToOmit)],
        pair: overrides && overrides.hasOwnProperty('pair') ? overrides.pair! : casual.word,
        pair_: overrides && overrides.hasOwnProperty('pair_') ? overrides.pair_! : relationshipsToOmit.has('Pair_Filter') ? {} as Pair_Filter : aPair_Filter({}, relationshipsToOmit),
        pair_contains: overrides && overrides.hasOwnProperty('pair_contains') ? overrides.pair_contains! : casual.word,
        pair_contains_nocase: overrides && overrides.hasOwnProperty('pair_contains_nocase') ? overrides.pair_contains_nocase! : casual.word,
        pair_ends_with: overrides && overrides.hasOwnProperty('pair_ends_with') ? overrides.pair_ends_with! : casual.word,
        pair_ends_with_nocase: overrides && overrides.hasOwnProperty('pair_ends_with_nocase') ? overrides.pair_ends_with_nocase! : casual.word,
        pair_gt: overrides && overrides.hasOwnProperty('pair_gt') ? overrides.pair_gt! : casual.word,
        pair_gte: overrides && overrides.hasOwnProperty('pair_gte') ? overrides.pair_gte! : casual.word,
        pair_in: overrides && overrides.hasOwnProperty('pair_in') ? overrides.pair_in! : [casual.word],
        pair_lt: overrides && overrides.hasOwnProperty('pair_lt') ? overrides.pair_lt! : casual.word,
        pair_lte: overrides && overrides.hasOwnProperty('pair_lte') ? overrides.pair_lte! : casual.word,
        pair_not: overrides && overrides.hasOwnProperty('pair_not') ? overrides.pair_not! : casual.word,
        pair_not_contains: overrides && overrides.hasOwnProperty('pair_not_contains') ? overrides.pair_not_contains! : casual.word,
        pair_not_contains_nocase: overrides && overrides.hasOwnProperty('pair_not_contains_nocase') ? overrides.pair_not_contains_nocase! : casual.word,
        pair_not_ends_with: overrides && overrides.hasOwnProperty('pair_not_ends_with') ? overrides.pair_not_ends_with! : casual.word,
        pair_not_ends_with_nocase: overrides && overrides.hasOwnProperty('pair_not_ends_with_nocase') ? overrides.pair_not_ends_with_nocase! : casual.word,
        pair_not_in: overrides && overrides.hasOwnProperty('pair_not_in') ? overrides.pair_not_in! : [casual.word],
        pair_not_starts_with: overrides && overrides.hasOwnProperty('pair_not_starts_with') ? overrides.pair_not_starts_with! : casual.word,
        pair_not_starts_with_nocase: overrides && overrides.hasOwnProperty('pair_not_starts_with_nocase') ? overrides.pair_not_starts_with_nocase! : casual.word,
        pair_starts_with: overrides && overrides.hasOwnProperty('pair_starts_with') ? overrides.pair_starts_with! : casual.word,
        pair_starts_with_nocase: overrides && overrides.hasOwnProperty('pair_starts_with_nocase') ? overrides.pair_starts_with_nocase! : casual.word,
        slippage: overrides && overrides.hasOwnProperty('slippage') ? overrides.slippage! : casual.word,
        slippage_gt: overrides && overrides.hasOwnProperty('slippage_gt') ? overrides.slippage_gt! : casual.word,
        slippage_gte: overrides && overrides.hasOwnProperty('slippage_gte') ? overrides.slippage_gte! : casual.word,
        slippage_in: overrides && overrides.hasOwnProperty('slippage_in') ? overrides.slippage_in! : [casual.word],
        slippage_lt: overrides && overrides.hasOwnProperty('slippage_lt') ? overrides.slippage_lt! : casual.word,
        slippage_lte: overrides && overrides.hasOwnProperty('slippage_lte') ? overrides.slippage_lte! : casual.word,
        slippage_not: overrides && overrides.hasOwnProperty('slippage_not') ? overrides.slippage_not! : casual.word,
        slippage_not_in: overrides && overrides.hasOwnProperty('slippage_not_in') ? overrides.slippage_not_in! : [casual.word],
        timestamp: overrides && overrides.hasOwnProperty('timestamp') ? overrides.timestamp! : casual.word,
        timestamp_contains: overrides && overrides.hasOwnProperty('timestamp_contains') ? overrides.timestamp_contains! : casual.word,
        timestamp_contains_nocase: overrides && overrides.hasOwnProperty('timestamp_contains_nocase') ? overrides.timestamp_contains_nocase! : casual.word,
        timestamp_ends_with: overrides && overrides.hasOwnProperty('timestamp_ends_with') ? overrides.timestamp_ends_with! : casual.word,
        timestamp_ends_with_nocase: overrides && overrides.hasOwnProperty('timestamp_ends_with_nocase') ? overrides.timestamp_ends_with_nocase! : casual.word,
        timestamp_gt: overrides && overrides.hasOwnProperty('timestamp_gt') ? overrides.timestamp_gt! : casual.word,
        timestamp_gte: overrides && overrides.hasOwnProperty('timestamp_gte') ? overrides.timestamp_gte! : casual.word,
        timestamp_in: overrides && overrides.hasOwnProperty('timestamp_in') ? overrides.timestamp_in! : [casual.word],
        timestamp_lt: overrides && overrides.hasOwnProperty('timestamp_lt') ? overrides.timestamp_lt! : casual.word,
        timestamp_lte: overrides && overrides.hasOwnProperty('timestamp_lte') ? overrides.timestamp_lte! : casual.word,
        timestamp_not: overrides && overrides.hasOwnProperty('timestamp_not') ? overrides.timestamp_not! : casual.word,
        timestamp_not_contains: overrides && overrides.hasOwnProperty('timestamp_not_contains') ? overrides.timestamp_not_contains! : casual.word,
        timestamp_not_contains_nocase: overrides && overrides.hasOwnProperty('timestamp_not_contains_nocase') ? overrides.timestamp_not_contains_nocase! : casual.word,
        timestamp_not_ends_with: overrides && overrides.hasOwnProperty('timestamp_not_ends_with') ? overrides.timestamp_not_ends_with! : casual.word,
        timestamp_not_ends_with_nocase: overrides && overrides.hasOwnProperty('timestamp_not_ends_with_nocase') ? overrides.timestamp_not_ends_with_nocase! : casual.word,
        timestamp_not_in: overrides && overrides.hasOwnProperty('timestamp_not_in') ? overrides.timestamp_not_in! : [casual.word],
        timestamp_not_starts_with: overrides && overrides.hasOwnProperty('timestamp_not_starts_with') ? overrides.timestamp_not_starts_with! : casual.word,
        timestamp_not_starts_with_nocase: overrides && overrides.hasOwnProperty('timestamp_not_starts_with_nocase') ? overrides.timestamp_not_starts_with_nocase! : casual.word,
        timestamp_starts_with: overrides && overrides.hasOwnProperty('timestamp_starts_with') ? overrides.timestamp_starts_with! : casual.word,
        timestamp_starts_with_nocase: overrides && overrides.hasOwnProperty('timestamp_starts_with_nocase') ? overrides.timestamp_starts_with_nocase! : casual.word,
        volume: overrides && overrides.hasOwnProperty('volume') ? overrides.volume! : casual.word,
        volume_gt: overrides && overrides.hasOwnProperty('volume_gt') ? overrides.volume_gt! : casual.word,
        volume_gte: overrides && overrides.hasOwnProperty('volume_gte') ? overrides.volume_gte! : casual.word,
        volume_in: overrides && overrides.hasOwnProperty('volume_in') ? overrides.volume_in! : [casual.word],
        volume_lt: overrides && overrides.hasOwnProperty('volume_lt') ? overrides.volume_lt! : casual.word,
        volume_lte: overrides && overrides.hasOwnProperty('volume_lte') ? overrides.volume_lte! : casual.word,
        volume_not: overrides && overrides.hasOwnProperty('volume_not') ? overrides.volume_not! : casual.word,
        volume_not_in: overrides && overrides.hasOwnProperty('volume_not_in') ? overrides.volume_not_in! : [casual.word],
    };
};

export const aToken = (overrides?: Partial<Token>, _relationshipsToOmit: Set<string> = new Set()): Token => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Token');
    return {
        decimals: overrides && overrides.hasOwnProperty('decimals') ? overrides.decimals! : casual.integer(0, 9999),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : casual['string'],
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : casual.word,
        symbol: overrides && overrides.hasOwnProperty('symbol') ? overrides.symbol! : casual.word,
    };
};

export const aToken_Filter = (overrides?: Partial<Token_Filter>, _relationshipsToOmit: Set<string> = new Set()): Token_Filter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Token_Filter');
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : relationshipsToOmit.has('BlockChangedFilter') ? {} as BlockChangedFilter : aBlockChangedFilter({}, relationshipsToOmit),
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [relationshipsToOmit.has('Token_Filter') ? {} as Token_Filter : aToken_Filter({}, relationshipsToOmit)],
        decimals: overrides && overrides.hasOwnProperty('decimals') ? overrides.decimals! : casual.integer(0, 9999),
        decimals_gt: overrides && overrides.hasOwnProperty('decimals_gt') ? overrides.decimals_gt! : casual.integer(0, 9999),
        decimals_gte: overrides && overrides.hasOwnProperty('decimals_gte') ? overrides.decimals_gte! : casual.integer(0, 9999),
        decimals_in: overrides && overrides.hasOwnProperty('decimals_in') ? overrides.decimals_in! : [casual.integer(0, 9999)],
        decimals_lt: overrides && overrides.hasOwnProperty('decimals_lt') ? overrides.decimals_lt! : casual.integer(0, 9999),
        decimals_lte: overrides && overrides.hasOwnProperty('decimals_lte') ? overrides.decimals_lte! : casual.integer(0, 9999),
        decimals_not: overrides && overrides.hasOwnProperty('decimals_not') ? overrides.decimals_not! : casual.integer(0, 9999),
        decimals_not_in: overrides && overrides.hasOwnProperty('decimals_not_in') ? overrides.decimals_not_in! : [casual.integer(0, 9999)],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : casual['string'],
        id_gt: overrides && overrides.hasOwnProperty('id_gt') ? overrides.id_gt! : casual['string'],
        id_gte: overrides && overrides.hasOwnProperty('id_gte') ? overrides.id_gte! : casual['string'],
        id_in: overrides && overrides.hasOwnProperty('id_in') ? overrides.id_in! : [casual['string']],
        id_lt: overrides && overrides.hasOwnProperty('id_lt') ? overrides.id_lt! : casual['string'],
        id_lte: overrides && overrides.hasOwnProperty('id_lte') ? overrides.id_lte! : casual['string'],
        id_not: overrides && overrides.hasOwnProperty('id_not') ? overrides.id_not! : casual['string'],
        id_not_in: overrides && overrides.hasOwnProperty('id_not_in') ? overrides.id_not_in! : [casual['string']],
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : casual.word,
        name_contains: overrides && overrides.hasOwnProperty('name_contains') ? overrides.name_contains! : casual.word,
        name_contains_nocase: overrides && overrides.hasOwnProperty('name_contains_nocase') ? overrides.name_contains_nocase! : casual.word,
        name_ends_with: overrides && overrides.hasOwnProperty('name_ends_with') ? overrides.name_ends_with! : casual.word,
        name_ends_with_nocase: overrides && overrides.hasOwnProperty('name_ends_with_nocase') ? overrides.name_ends_with_nocase! : casual.word,
        name_gt: overrides && overrides.hasOwnProperty('name_gt') ? overrides.name_gt! : casual.word,
        name_gte: overrides && overrides.hasOwnProperty('name_gte') ? overrides.name_gte! : casual.word,
        name_in: overrides && overrides.hasOwnProperty('name_in') ? overrides.name_in! : [casual.word],
        name_lt: overrides && overrides.hasOwnProperty('name_lt') ? overrides.name_lt! : casual.word,
        name_lte: overrides && overrides.hasOwnProperty('name_lte') ? overrides.name_lte! : casual.word,
        name_not: overrides && overrides.hasOwnProperty('name_not') ? overrides.name_not! : casual.word,
        name_not_contains: overrides && overrides.hasOwnProperty('name_not_contains') ? overrides.name_not_contains! : casual.word,
        name_not_contains_nocase: overrides && overrides.hasOwnProperty('name_not_contains_nocase') ? overrides.name_not_contains_nocase! : casual.word,
        name_not_ends_with: overrides && overrides.hasOwnProperty('name_not_ends_with') ? overrides.name_not_ends_with! : casual.word,
        name_not_ends_with_nocase: overrides && overrides.hasOwnProperty('name_not_ends_with_nocase') ? overrides.name_not_ends_with_nocase! : casual.word,
        name_not_in: overrides && overrides.hasOwnProperty('name_not_in') ? overrides.name_not_in! : [casual.word],
        name_not_starts_with: overrides && overrides.hasOwnProperty('name_not_starts_with') ? overrides.name_not_starts_with! : casual.word,
        name_not_starts_with_nocase: overrides && overrides.hasOwnProperty('name_not_starts_with_nocase') ? overrides.name_not_starts_with_nocase! : casual.word,
        name_starts_with: overrides && overrides.hasOwnProperty('name_starts_with') ? overrides.name_starts_with! : casual.word,
        name_starts_with_nocase: overrides && overrides.hasOwnProperty('name_starts_with_nocase') ? overrides.name_starts_with_nocase! : casual.word,
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [relationshipsToOmit.has('Token_Filter') ? {} as Token_Filter : aToken_Filter({}, relationshipsToOmit)],
        symbol: overrides && overrides.hasOwnProperty('symbol') ? overrides.symbol! : casual.word,
        symbol_contains: overrides && overrides.hasOwnProperty('symbol_contains') ? overrides.symbol_contains! : casual.word,
        symbol_contains_nocase: overrides && overrides.hasOwnProperty('symbol_contains_nocase') ? overrides.symbol_contains_nocase! : casual.word,
        symbol_ends_with: overrides && overrides.hasOwnProperty('symbol_ends_with') ? overrides.symbol_ends_with! : casual.word,
        symbol_ends_with_nocase: overrides && overrides.hasOwnProperty('symbol_ends_with_nocase') ? overrides.symbol_ends_with_nocase! : casual.word,
        symbol_gt: overrides && overrides.hasOwnProperty('symbol_gt') ? overrides.symbol_gt! : casual.word,
        symbol_gte: overrides && overrides.hasOwnProperty('symbol_gte') ? overrides.symbol_gte! : casual.word,
        symbol_in: overrides && overrides.hasOwnProperty('symbol_in') ? overrides.symbol_in! : [casual.word],
        symbol_lt: overrides && overrides.hasOwnProperty('symbol_lt') ? overrides.symbol_lt! : casual.word,
        symbol_lte: overrides && overrides.hasOwnProperty('symbol_lte') ? overrides.symbol_lte! : casual.word,
        symbol_not: overrides && overrides.hasOwnProperty('symbol_not') ? overrides.symbol_not! : casual.word,
        symbol_not_contains: overrides && overrides.hasOwnProperty('symbol_not_contains') ? overrides.symbol_not_contains! : casual.word,
        symbol_not_contains_nocase: overrides && overrides.hasOwnProperty('symbol_not_contains_nocase') ? overrides.symbol_not_contains_nocase! : casual.word,
        symbol_not_ends_with: overrides && overrides.hasOwnProperty('symbol_not_ends_with') ? overrides.symbol_not_ends_with! : casual.word,
        symbol_not_ends_with_nocase: overrides && overrides.hasOwnProperty('symbol_not_ends_with_nocase') ? overrides.symbol_not_ends_with_nocase! : casual.word,
        symbol_not_in: overrides && overrides.hasOwnProperty('symbol_not_in') ? overrides.symbol_not_in! : [casual.word],
        symbol_not_starts_with: overrides && overrides.hasOwnProperty('symbol_not_starts_with') ? overrides.symbol_not_starts_with! : casual.word,
        symbol_not_starts_with_nocase: overrides && overrides.hasOwnProperty('symbol_not_starts_with_nocase') ? overrides.symbol_not_starts_with_nocase! : casual.word,
        symbol_starts_with: overrides && overrides.hasOwnProperty('symbol_starts_with') ? overrides.symbol_starts_with! : casual.word,
        symbol_starts_with_nocase: overrides && overrides.hasOwnProperty('symbol_starts_with_nocase') ? overrides.symbol_starts_with_nocase! : casual.word,
    };
};

export const a_Block_ = (overrides?: Partial<_Block_>, _relationshipsToOmit: Set<string> = new Set()): _Block_ => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('_Block_');
    return {
        hash: overrides && overrides.hasOwnProperty('hash') ? overrides.hash! : casual.word,
        number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : casual.integer(0, 9999),
        timestamp: overrides && overrides.hasOwnProperty('timestamp') ? overrides.timestamp! : casual.integer(0, 9999),
    };
};

export const a_Meta_ = (overrides?: Partial<_Meta_>, _relationshipsToOmit: Set<string> = new Set()): _Meta_ => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('_Meta_');
    return {
        block: overrides && overrides.hasOwnProperty('block') ? overrides.block! : relationshipsToOmit.has('_Block_') ? {} as _Block_ : a_Block_({}, relationshipsToOmit),
        deployment: overrides && overrides.hasOwnProperty('deployment') ? overrides.deployment! : casual.word,
        hasIndexingErrors: overrides && overrides.hasOwnProperty('hasIndexingErrors') ? overrides.hasIndexingErrors! : casual.boolean,
    };
};

export const seedMocks = (seed: number) => casual.seed(seed);

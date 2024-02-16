//@ts-nocheck
import { BlockChangedFilter, Block_Height, Pair, Pair_Filter, Query, Subscription, Swap, Swap_Filter, Token, Token_Filter, _Block_, _Meta_, Aggregation_Interval, OrderDirection, Pair_OrderBy, Swap_OrderBy, Token_OrderBy, _SubgraphErrorPolicy_ } from '../types/tokens.types';

export const aBlockChangedFilter = (overrides?: Partial<BlockChangedFilter>, _relationshipsToOmit: Set<string> = new Set()): BlockChangedFilter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('BlockChangedFilter');
    return {
        number_gte: overrides && overrides.hasOwnProperty('number_gte') ? overrides.number_gte! : 4175,
    };
};

export const aBlock_Height = (overrides?: Partial<Block_Height>, _relationshipsToOmit: Set<string> = new Set()): Block_Height => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Block_Height');
    return {
        hash: overrides && overrides.hasOwnProperty('hash') ? overrides.hash! : 'ut',
        number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : 6885,
        number_gte: overrides && overrides.hasOwnProperty('number_gte') ? overrides.number_gte! : 5347,
    };
};

export const aPair = (overrides?: Partial<Pair>, _relationshipsToOmit: Set<string> = new Set()): Pair => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Pair');
    return {
        currentprice: overrides && overrides.hasOwnProperty('currentprice') ? overrides.currentprice! : 'eius',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ac2b431c-42f3-4771-9ec4-408f5f989521',
        lastupdate: overrides && overrides.hasOwnProperty('lastupdate') ? overrides.lastupdate! : 'nihil',
        swaps: overrides && overrides.hasOwnProperty('swaps') ? overrides.swaps! : [relationshipsToOmit.has('Swap') ? {} as Swap : aSwap({}, relationshipsToOmit)],
        token0: overrides && overrides.hasOwnProperty('token0') ? overrides.token0! : relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit),
        token1: overrides && overrides.hasOwnProperty('token1') ? overrides.token1! : relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit),
        totalklimaearnedfees: overrides && overrides.hasOwnProperty('totalklimaearnedfees') ? overrides.totalklimaearnedfees! : 'delectus',
        totalvolume: overrides && overrides.hasOwnProperty('totalvolume') ? overrides.totalvolume! : 'aut',
    };
};

export const aPair_Filter = (overrides?: Partial<Pair_Filter>, _relationshipsToOmit: Set<string> = new Set()): Pair_Filter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Pair_Filter');
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : relationshipsToOmit.has('BlockChangedFilter') ? {} as BlockChangedFilter : aBlockChangedFilter({}, relationshipsToOmit),
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [relationshipsToOmit.has('Pair_Filter') ? {} as Pair_Filter : aPair_Filter({}, relationshipsToOmit)],
        currentprice: overrides && overrides.hasOwnProperty('currentprice') ? overrides.currentprice! : 'voluptatibus',
        currentprice_gt: overrides && overrides.hasOwnProperty('currentprice_gt') ? overrides.currentprice_gt! : 'delectus',
        currentprice_gte: overrides && overrides.hasOwnProperty('currentprice_gte') ? overrides.currentprice_gte! : 'neque',
        currentprice_in: overrides && overrides.hasOwnProperty('currentprice_in') ? overrides.currentprice_in! : ['omnis'],
        currentprice_lt: overrides && overrides.hasOwnProperty('currentprice_lt') ? overrides.currentprice_lt! : 'illum',
        currentprice_lte: overrides && overrides.hasOwnProperty('currentprice_lte') ? overrides.currentprice_lte! : 'nemo',
        currentprice_not: overrides && overrides.hasOwnProperty('currentprice_not') ? overrides.currentprice_not! : 'totam',
        currentprice_not_in: overrides && overrides.hasOwnProperty('currentprice_not_in') ? overrides.currentprice_not_in! : ['beatae'],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '175d3721-2183-444f-97c6-64e23baa55b1',
        id_gt: overrides && overrides.hasOwnProperty('id_gt') ? overrides.id_gt! : '8729b359-bcef-4385-9070-1a0910673fb9',
        id_gte: overrides && overrides.hasOwnProperty('id_gte') ? overrides.id_gte! : '5c22e006-9dbf-4b33-99f5-378718d6b94e',
        id_in: overrides && overrides.hasOwnProperty('id_in') ? overrides.id_in! : ['c3df17af-84a6-4683-8bbc-75fbeb3f3342'],
        id_lt: overrides && overrides.hasOwnProperty('id_lt') ? overrides.id_lt! : '4c8e2c24-948b-41eb-8f3e-f3dab414b128',
        id_lte: overrides && overrides.hasOwnProperty('id_lte') ? overrides.id_lte! : '85915c17-3744-4e6c-b1b1-1f56accac8a5',
        id_not: overrides && overrides.hasOwnProperty('id_not') ? overrides.id_not! : '89037988-61fd-4117-8169-28490257ec22',
        id_not_in: overrides && overrides.hasOwnProperty('id_not_in') ? overrides.id_not_in! : ['81d73689-8137-4b03-a275-f6b432bc4a24'],
        lastupdate: overrides && overrides.hasOwnProperty('lastupdate') ? overrides.lastupdate! : 'temporibus',
        lastupdate_contains: overrides && overrides.hasOwnProperty('lastupdate_contains') ? overrides.lastupdate_contains! : 'ut',
        lastupdate_contains_nocase: overrides && overrides.hasOwnProperty('lastupdate_contains_nocase') ? overrides.lastupdate_contains_nocase! : 'asperiores',
        lastupdate_ends_with: overrides && overrides.hasOwnProperty('lastupdate_ends_with') ? overrides.lastupdate_ends_with! : 'laborum',
        lastupdate_ends_with_nocase: overrides && overrides.hasOwnProperty('lastupdate_ends_with_nocase') ? overrides.lastupdate_ends_with_nocase! : 'perspiciatis',
        lastupdate_gt: overrides && overrides.hasOwnProperty('lastupdate_gt') ? overrides.lastupdate_gt! : 'aperiam',
        lastupdate_gte: overrides && overrides.hasOwnProperty('lastupdate_gte') ? overrides.lastupdate_gte! : 'dolores',
        lastupdate_in: overrides && overrides.hasOwnProperty('lastupdate_in') ? overrides.lastupdate_in! : ['quo'],
        lastupdate_lt: overrides && overrides.hasOwnProperty('lastupdate_lt') ? overrides.lastupdate_lt! : 'eum',
        lastupdate_lte: overrides && overrides.hasOwnProperty('lastupdate_lte') ? overrides.lastupdate_lte! : 'inventore',
        lastupdate_not: overrides && overrides.hasOwnProperty('lastupdate_not') ? overrides.lastupdate_not! : 'sit',
        lastupdate_not_contains: overrides && overrides.hasOwnProperty('lastupdate_not_contains') ? overrides.lastupdate_not_contains! : 'optio',
        lastupdate_not_contains_nocase: overrides && overrides.hasOwnProperty('lastupdate_not_contains_nocase') ? overrides.lastupdate_not_contains_nocase! : 'laboriosam',
        lastupdate_not_ends_with: overrides && overrides.hasOwnProperty('lastupdate_not_ends_with') ? overrides.lastupdate_not_ends_with! : 'qui',
        lastupdate_not_ends_with_nocase: overrides && overrides.hasOwnProperty('lastupdate_not_ends_with_nocase') ? overrides.lastupdate_not_ends_with_nocase! : 'sint',
        lastupdate_not_in: overrides && overrides.hasOwnProperty('lastupdate_not_in') ? overrides.lastupdate_not_in! : ['atque'],
        lastupdate_not_starts_with: overrides && overrides.hasOwnProperty('lastupdate_not_starts_with') ? overrides.lastupdate_not_starts_with! : 'doloribus',
        lastupdate_not_starts_with_nocase: overrides && overrides.hasOwnProperty('lastupdate_not_starts_with_nocase') ? overrides.lastupdate_not_starts_with_nocase! : 'quasi',
        lastupdate_starts_with: overrides && overrides.hasOwnProperty('lastupdate_starts_with') ? overrides.lastupdate_starts_with! : 'tempora',
        lastupdate_starts_with_nocase: overrides && overrides.hasOwnProperty('lastupdate_starts_with_nocase') ? overrides.lastupdate_starts_with_nocase! : 'atque',
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [relationshipsToOmit.has('Pair_Filter') ? {} as Pair_Filter : aPair_Filter({}, relationshipsToOmit)],
        swaps_: overrides && overrides.hasOwnProperty('swaps_') ? overrides.swaps_! : relationshipsToOmit.has('Swap_Filter') ? {} as Swap_Filter : aSwap_Filter({}, relationshipsToOmit),
        token0: overrides && overrides.hasOwnProperty('token0') ? overrides.token0! : 'numquam',
        token0_: overrides && overrides.hasOwnProperty('token0_') ? overrides.token0_! : relationshipsToOmit.has('Token_Filter') ? {} as Token_Filter : aToken_Filter({}, relationshipsToOmit),
        token0_contains: overrides && overrides.hasOwnProperty('token0_contains') ? overrides.token0_contains! : 'aut',
        token0_contains_nocase: overrides && overrides.hasOwnProperty('token0_contains_nocase') ? overrides.token0_contains_nocase! : 'eaque',
        token0_ends_with: overrides && overrides.hasOwnProperty('token0_ends_with') ? overrides.token0_ends_with! : 'non',
        token0_ends_with_nocase: overrides && overrides.hasOwnProperty('token0_ends_with_nocase') ? overrides.token0_ends_with_nocase! : 'necessitatibus',
        token0_gt: overrides && overrides.hasOwnProperty('token0_gt') ? overrides.token0_gt! : 'esse',
        token0_gte: overrides && overrides.hasOwnProperty('token0_gte') ? overrides.token0_gte! : 'omnis',
        token0_in: overrides && overrides.hasOwnProperty('token0_in') ? overrides.token0_in! : ['cum'],
        token0_lt: overrides && overrides.hasOwnProperty('token0_lt') ? overrides.token0_lt! : 'voluptatem',
        token0_lte: overrides && overrides.hasOwnProperty('token0_lte') ? overrides.token0_lte! : 'et',
        token0_not: overrides && overrides.hasOwnProperty('token0_not') ? overrides.token0_not! : 'sed',
        token0_not_contains: overrides && overrides.hasOwnProperty('token0_not_contains') ? overrides.token0_not_contains! : 'aut',
        token0_not_contains_nocase: overrides && overrides.hasOwnProperty('token0_not_contains_nocase') ? overrides.token0_not_contains_nocase! : 'voluptatem',
        token0_not_ends_with: overrides && overrides.hasOwnProperty('token0_not_ends_with') ? overrides.token0_not_ends_with! : 'quas',
        token0_not_ends_with_nocase: overrides && overrides.hasOwnProperty('token0_not_ends_with_nocase') ? overrides.token0_not_ends_with_nocase! : 'odio',
        token0_not_in: overrides && overrides.hasOwnProperty('token0_not_in') ? overrides.token0_not_in! : ['nulla'],
        token0_not_starts_with: overrides && overrides.hasOwnProperty('token0_not_starts_with') ? overrides.token0_not_starts_with! : 'adipisci',
        token0_not_starts_with_nocase: overrides && overrides.hasOwnProperty('token0_not_starts_with_nocase') ? overrides.token0_not_starts_with_nocase! : 'dolorum',
        token0_starts_with: overrides && overrides.hasOwnProperty('token0_starts_with') ? overrides.token0_starts_with! : 'veritatis',
        token0_starts_with_nocase: overrides && overrides.hasOwnProperty('token0_starts_with_nocase') ? overrides.token0_starts_with_nocase! : 'nam',
        token1: overrides && overrides.hasOwnProperty('token1') ? overrides.token1! : 'molestias',
        token1_: overrides && overrides.hasOwnProperty('token1_') ? overrides.token1_! : relationshipsToOmit.has('Token_Filter') ? {} as Token_Filter : aToken_Filter({}, relationshipsToOmit),
        token1_contains: overrides && overrides.hasOwnProperty('token1_contains') ? overrides.token1_contains! : 'nisi',
        token1_contains_nocase: overrides && overrides.hasOwnProperty('token1_contains_nocase') ? overrides.token1_contains_nocase! : 'quas',
        token1_ends_with: overrides && overrides.hasOwnProperty('token1_ends_with') ? overrides.token1_ends_with! : 'nulla',
        token1_ends_with_nocase: overrides && overrides.hasOwnProperty('token1_ends_with_nocase') ? overrides.token1_ends_with_nocase! : 'sunt',
        token1_gt: overrides && overrides.hasOwnProperty('token1_gt') ? overrides.token1_gt! : 'consectetur',
        token1_gte: overrides && overrides.hasOwnProperty('token1_gte') ? overrides.token1_gte! : 'minus',
        token1_in: overrides && overrides.hasOwnProperty('token1_in') ? overrides.token1_in! : ['dignissimos'],
        token1_lt: overrides && overrides.hasOwnProperty('token1_lt') ? overrides.token1_lt! : 'ad',
        token1_lte: overrides && overrides.hasOwnProperty('token1_lte') ? overrides.token1_lte! : 'ut',
        token1_not: overrides && overrides.hasOwnProperty('token1_not') ? overrides.token1_not! : 'id',
        token1_not_contains: overrides && overrides.hasOwnProperty('token1_not_contains') ? overrides.token1_not_contains! : 'ullam',
        token1_not_contains_nocase: overrides && overrides.hasOwnProperty('token1_not_contains_nocase') ? overrides.token1_not_contains_nocase! : 'non',
        token1_not_ends_with: overrides && overrides.hasOwnProperty('token1_not_ends_with') ? overrides.token1_not_ends_with! : 'atque',
        token1_not_ends_with_nocase: overrides && overrides.hasOwnProperty('token1_not_ends_with_nocase') ? overrides.token1_not_ends_with_nocase! : 'ut',
        token1_not_in: overrides && overrides.hasOwnProperty('token1_not_in') ? overrides.token1_not_in! : ['voluptas'],
        token1_not_starts_with: overrides && overrides.hasOwnProperty('token1_not_starts_with') ? overrides.token1_not_starts_with! : 'velit',
        token1_not_starts_with_nocase: overrides && overrides.hasOwnProperty('token1_not_starts_with_nocase') ? overrides.token1_not_starts_with_nocase! : 'voluptate',
        token1_starts_with: overrides && overrides.hasOwnProperty('token1_starts_with') ? overrides.token1_starts_with! : 'sit',
        token1_starts_with_nocase: overrides && overrides.hasOwnProperty('token1_starts_with_nocase') ? overrides.token1_starts_with_nocase! : 'animi',
        totalklimaearnedfees: overrides && overrides.hasOwnProperty('totalklimaearnedfees') ? overrides.totalklimaearnedfees! : 'at',
        totalklimaearnedfees_gt: overrides && overrides.hasOwnProperty('totalklimaearnedfees_gt') ? overrides.totalklimaearnedfees_gt! : 'et',
        totalklimaearnedfees_gte: overrides && overrides.hasOwnProperty('totalklimaearnedfees_gte') ? overrides.totalklimaearnedfees_gte! : 'sequi',
        totalklimaearnedfees_in: overrides && overrides.hasOwnProperty('totalklimaearnedfees_in') ? overrides.totalklimaearnedfees_in! : ['est'],
        totalklimaearnedfees_lt: overrides && overrides.hasOwnProperty('totalklimaearnedfees_lt') ? overrides.totalklimaearnedfees_lt! : 'hic',
        totalklimaearnedfees_lte: overrides && overrides.hasOwnProperty('totalklimaearnedfees_lte') ? overrides.totalklimaearnedfees_lte! : 'odio',
        totalklimaearnedfees_not: overrides && overrides.hasOwnProperty('totalklimaearnedfees_not') ? overrides.totalklimaearnedfees_not! : 'quaerat',
        totalklimaearnedfees_not_in: overrides && overrides.hasOwnProperty('totalklimaearnedfees_not_in') ? overrides.totalklimaearnedfees_not_in! : ['eos'],
        totalvolume: overrides && overrides.hasOwnProperty('totalvolume') ? overrides.totalvolume! : 'nam',
        totalvolume_gt: overrides && overrides.hasOwnProperty('totalvolume_gt') ? overrides.totalvolume_gt! : 'non',
        totalvolume_gte: overrides && overrides.hasOwnProperty('totalvolume_gte') ? overrides.totalvolume_gte! : 'possimus',
        totalvolume_in: overrides && overrides.hasOwnProperty('totalvolume_in') ? overrides.totalvolume_in! : ['magnam'],
        totalvolume_lt: overrides && overrides.hasOwnProperty('totalvolume_lt') ? overrides.totalvolume_lt! : 'quia',
        totalvolume_lte: overrides && overrides.hasOwnProperty('totalvolume_lte') ? overrides.totalvolume_lte! : 'nostrum',
        totalvolume_not: overrides && overrides.hasOwnProperty('totalvolume_not') ? overrides.totalvolume_not! : 'in',
        totalvolume_not_in: overrides && overrides.hasOwnProperty('totalvolume_not_in') ? overrides.totalvolume_not_in! : ['modi'],
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
        close: overrides && overrides.hasOwnProperty('close') ? overrides.close! : 'corrupti',
        high: overrides && overrides.hasOwnProperty('high') ? overrides.high! : 'quia',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'b5b75c91-d6dc-49e6-8bc9-460ecef39a6c',
        klimaearnedfees: overrides && overrides.hasOwnProperty('klimaearnedfees') ? overrides.klimaearnedfees! : 'ea',
        low: overrides && overrides.hasOwnProperty('low') ? overrides.low! : 'quo',
        lpfees: overrides && overrides.hasOwnProperty('lpfees') ? overrides.lpfees! : 'assumenda',
        open: overrides && overrides.hasOwnProperty('open') ? overrides.open! : 'consequatur',
        pair: overrides && overrides.hasOwnProperty('pair') ? overrides.pair! : relationshipsToOmit.has('Pair') ? {} as Pair : aPair({}, relationshipsToOmit),
        slippage: overrides && overrides.hasOwnProperty('slippage') ? overrides.slippage! : 'quaerat',
        timestamp: overrides && overrides.hasOwnProperty('timestamp') ? overrides.timestamp! : 'possimus',
        volume: overrides && overrides.hasOwnProperty('volume') ? overrides.volume! : 'sapiente',
    };
};

export const aSwap_Filter = (overrides?: Partial<Swap_Filter>, _relationshipsToOmit: Set<string> = new Set()): Swap_Filter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Swap_Filter');
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : relationshipsToOmit.has('BlockChangedFilter') ? {} as BlockChangedFilter : aBlockChangedFilter({}, relationshipsToOmit),
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [relationshipsToOmit.has('Swap_Filter') ? {} as Swap_Filter : aSwap_Filter({}, relationshipsToOmit)],
        close: overrides && overrides.hasOwnProperty('close') ? overrides.close! : 'similique',
        close_gt: overrides && overrides.hasOwnProperty('close_gt') ? overrides.close_gt! : 'minima',
        close_gte: overrides && overrides.hasOwnProperty('close_gte') ? overrides.close_gte! : 'non',
        close_in: overrides && overrides.hasOwnProperty('close_in') ? overrides.close_in! : ['aut'],
        close_lt: overrides && overrides.hasOwnProperty('close_lt') ? overrides.close_lt! : 'asperiores',
        close_lte: overrides && overrides.hasOwnProperty('close_lte') ? overrides.close_lte! : 'qui',
        close_not: overrides && overrides.hasOwnProperty('close_not') ? overrides.close_not! : 'architecto',
        close_not_in: overrides && overrides.hasOwnProperty('close_not_in') ? overrides.close_not_in! : ['assumenda'],
        high: overrides && overrides.hasOwnProperty('high') ? overrides.high! : 'voluptatibus',
        high_gt: overrides && overrides.hasOwnProperty('high_gt') ? overrides.high_gt! : 'explicabo',
        high_gte: overrides && overrides.hasOwnProperty('high_gte') ? overrides.high_gte! : 'nemo',
        high_in: overrides && overrides.hasOwnProperty('high_in') ? overrides.high_in! : ['praesentium'],
        high_lt: overrides && overrides.hasOwnProperty('high_lt') ? overrides.high_lt! : 'fugiat',
        high_lte: overrides && overrides.hasOwnProperty('high_lte') ? overrides.high_lte! : 'omnis',
        high_not: overrides && overrides.hasOwnProperty('high_not') ? overrides.high_not! : 'est',
        high_not_in: overrides && overrides.hasOwnProperty('high_not_in') ? overrides.high_not_in! : ['consectetur'],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'aecbbd24-0f44-42cb-ac92-09d64dac7323',
        id_gt: overrides && overrides.hasOwnProperty('id_gt') ? overrides.id_gt! : '386d9c17-72b8-4363-b915-07cf0bf61655',
        id_gte: overrides && overrides.hasOwnProperty('id_gte') ? overrides.id_gte! : '5e7c0521-7a33-49cc-b24a-efa763164fd7',
        id_in: overrides && overrides.hasOwnProperty('id_in') ? overrides.id_in! : ['03e5c09f-6476-402a-9cd3-93917bc5eaed'],
        id_lt: overrides && overrides.hasOwnProperty('id_lt') ? overrides.id_lt! : 'e23c8cd3-7698-441e-aaec-67f40ebe8156',
        id_lte: overrides && overrides.hasOwnProperty('id_lte') ? overrides.id_lte! : '98b4f9d6-687f-47f1-88dd-a1c6cbb0daef',
        id_not: overrides && overrides.hasOwnProperty('id_not') ? overrides.id_not! : 'eb7cbc34-8924-43b0-9ec9-2058b164575e',
        id_not_in: overrides && overrides.hasOwnProperty('id_not_in') ? overrides.id_not_in! : ['bf97c793-3422-411c-91b6-c9957dc611ac'],
        klimaearnedfees: overrides && overrides.hasOwnProperty('klimaearnedfees') ? overrides.klimaearnedfees! : 'libero',
        klimaearnedfees_gt: overrides && overrides.hasOwnProperty('klimaearnedfees_gt') ? overrides.klimaearnedfees_gt! : 'aut',
        klimaearnedfees_gte: overrides && overrides.hasOwnProperty('klimaearnedfees_gte') ? overrides.klimaearnedfees_gte! : 'commodi',
        klimaearnedfees_in: overrides && overrides.hasOwnProperty('klimaearnedfees_in') ? overrides.klimaearnedfees_in! : ['odio'],
        klimaearnedfees_lt: overrides && overrides.hasOwnProperty('klimaearnedfees_lt') ? overrides.klimaearnedfees_lt! : 'quaerat',
        klimaearnedfees_lte: overrides && overrides.hasOwnProperty('klimaearnedfees_lte') ? overrides.klimaearnedfees_lte! : 'repellat',
        klimaearnedfees_not: overrides && overrides.hasOwnProperty('klimaearnedfees_not') ? overrides.klimaearnedfees_not! : 'voluptas',
        klimaearnedfees_not_in: overrides && overrides.hasOwnProperty('klimaearnedfees_not_in') ? overrides.klimaearnedfees_not_in! : ['aut'],
        low: overrides && overrides.hasOwnProperty('low') ? overrides.low! : 'voluptas',
        low_gt: overrides && overrides.hasOwnProperty('low_gt') ? overrides.low_gt! : 'non',
        low_gte: overrides && overrides.hasOwnProperty('low_gte') ? overrides.low_gte! : 'saepe',
        low_in: overrides && overrides.hasOwnProperty('low_in') ? overrides.low_in! : ['quae'],
        low_lt: overrides && overrides.hasOwnProperty('low_lt') ? overrides.low_lt! : 'sint',
        low_lte: overrides && overrides.hasOwnProperty('low_lte') ? overrides.low_lte! : 'dolorem',
        low_not: overrides && overrides.hasOwnProperty('low_not') ? overrides.low_not! : 'nobis',
        low_not_in: overrides && overrides.hasOwnProperty('low_not_in') ? overrides.low_not_in! : ['atque'],
        lpfees: overrides && overrides.hasOwnProperty('lpfees') ? overrides.lpfees! : 'velit',
        lpfees_gt: overrides && overrides.hasOwnProperty('lpfees_gt') ? overrides.lpfees_gt! : 'ab',
        lpfees_gte: overrides && overrides.hasOwnProperty('lpfees_gte') ? overrides.lpfees_gte! : 'labore',
        lpfees_in: overrides && overrides.hasOwnProperty('lpfees_in') ? overrides.lpfees_in! : ['aliquam'],
        lpfees_lt: overrides && overrides.hasOwnProperty('lpfees_lt') ? overrides.lpfees_lt! : 'nisi',
        lpfees_lte: overrides && overrides.hasOwnProperty('lpfees_lte') ? overrides.lpfees_lte! : 'ipsam',
        lpfees_not: overrides && overrides.hasOwnProperty('lpfees_not') ? overrides.lpfees_not! : 'quo',
        lpfees_not_in: overrides && overrides.hasOwnProperty('lpfees_not_in') ? overrides.lpfees_not_in! : ['dolore'],
        open: overrides && overrides.hasOwnProperty('open') ? overrides.open! : 'atque',
        open_gt: overrides && overrides.hasOwnProperty('open_gt') ? overrides.open_gt! : 'incidunt',
        open_gte: overrides && overrides.hasOwnProperty('open_gte') ? overrides.open_gte! : 'ut',
        open_in: overrides && overrides.hasOwnProperty('open_in') ? overrides.open_in! : ['eum'],
        open_lt: overrides && overrides.hasOwnProperty('open_lt') ? overrides.open_lt! : 'similique',
        open_lte: overrides && overrides.hasOwnProperty('open_lte') ? overrides.open_lte! : 'nesciunt',
        open_not: overrides && overrides.hasOwnProperty('open_not') ? overrides.open_not! : 'hic',
        open_not_in: overrides && overrides.hasOwnProperty('open_not_in') ? overrides.open_not_in! : ['perspiciatis'],
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [relationshipsToOmit.has('Swap_Filter') ? {} as Swap_Filter : aSwap_Filter({}, relationshipsToOmit)],
        pair: overrides && overrides.hasOwnProperty('pair') ? overrides.pair! : 'doloremque',
        pair_: overrides && overrides.hasOwnProperty('pair_') ? overrides.pair_! : relationshipsToOmit.has('Pair_Filter') ? {} as Pair_Filter : aPair_Filter({}, relationshipsToOmit),
        pair_contains: overrides && overrides.hasOwnProperty('pair_contains') ? overrides.pair_contains! : 'ipsam',
        pair_contains_nocase: overrides && overrides.hasOwnProperty('pair_contains_nocase') ? overrides.pair_contains_nocase! : 'est',
        pair_ends_with: overrides && overrides.hasOwnProperty('pair_ends_with') ? overrides.pair_ends_with! : 'et',
        pair_ends_with_nocase: overrides && overrides.hasOwnProperty('pair_ends_with_nocase') ? overrides.pair_ends_with_nocase! : 'quaerat',
        pair_gt: overrides && overrides.hasOwnProperty('pair_gt') ? overrides.pair_gt! : 'autem',
        pair_gte: overrides && overrides.hasOwnProperty('pair_gte') ? overrides.pair_gte! : 'non',
        pair_in: overrides && overrides.hasOwnProperty('pair_in') ? overrides.pair_in! : ['reiciendis'],
        pair_lt: overrides && overrides.hasOwnProperty('pair_lt') ? overrides.pair_lt! : 'nihil',
        pair_lte: overrides && overrides.hasOwnProperty('pair_lte') ? overrides.pair_lte! : 'voluptas',
        pair_not: overrides && overrides.hasOwnProperty('pair_not') ? overrides.pair_not! : 'eum',
        pair_not_contains: overrides && overrides.hasOwnProperty('pair_not_contains') ? overrides.pair_not_contains! : 'consectetur',
        pair_not_contains_nocase: overrides && overrides.hasOwnProperty('pair_not_contains_nocase') ? overrides.pair_not_contains_nocase! : 'voluptate',
        pair_not_ends_with: overrides && overrides.hasOwnProperty('pair_not_ends_with') ? overrides.pair_not_ends_with! : 'neque',
        pair_not_ends_with_nocase: overrides && overrides.hasOwnProperty('pair_not_ends_with_nocase') ? overrides.pair_not_ends_with_nocase! : 'eius',
        pair_not_in: overrides && overrides.hasOwnProperty('pair_not_in') ? overrides.pair_not_in! : ['non'],
        pair_not_starts_with: overrides && overrides.hasOwnProperty('pair_not_starts_with') ? overrides.pair_not_starts_with! : 'dolorem',
        pair_not_starts_with_nocase: overrides && overrides.hasOwnProperty('pair_not_starts_with_nocase') ? overrides.pair_not_starts_with_nocase! : 'officiis',
        pair_starts_with: overrides && overrides.hasOwnProperty('pair_starts_with') ? overrides.pair_starts_with! : 'sed',
        pair_starts_with_nocase: overrides && overrides.hasOwnProperty('pair_starts_with_nocase') ? overrides.pair_starts_with_nocase! : 'iure',
        slippage: overrides && overrides.hasOwnProperty('slippage') ? overrides.slippage! : 'et',
        slippage_gt: overrides && overrides.hasOwnProperty('slippage_gt') ? overrides.slippage_gt! : 'magni',
        slippage_gte: overrides && overrides.hasOwnProperty('slippage_gte') ? overrides.slippage_gte! : 'sunt',
        slippage_in: overrides && overrides.hasOwnProperty('slippage_in') ? overrides.slippage_in! : ['cumque'],
        slippage_lt: overrides && overrides.hasOwnProperty('slippage_lt') ? overrides.slippage_lt! : 'consectetur',
        slippage_lte: overrides && overrides.hasOwnProperty('slippage_lte') ? overrides.slippage_lte! : 'doloribus',
        slippage_not: overrides && overrides.hasOwnProperty('slippage_not') ? overrides.slippage_not! : 'qui',
        slippage_not_in: overrides && overrides.hasOwnProperty('slippage_not_in') ? overrides.slippage_not_in! : ['dolorem'],
        timestamp: overrides && overrides.hasOwnProperty('timestamp') ? overrides.timestamp! : 'quidem',
        timestamp_contains: overrides && overrides.hasOwnProperty('timestamp_contains') ? overrides.timestamp_contains! : 'inventore',
        timestamp_contains_nocase: overrides && overrides.hasOwnProperty('timestamp_contains_nocase') ? overrides.timestamp_contains_nocase! : 'a',
        timestamp_ends_with: overrides && overrides.hasOwnProperty('timestamp_ends_with') ? overrides.timestamp_ends_with! : 'repellendus',
        timestamp_ends_with_nocase: overrides && overrides.hasOwnProperty('timestamp_ends_with_nocase') ? overrides.timestamp_ends_with_nocase! : 'sed',
        timestamp_gt: overrides && overrides.hasOwnProperty('timestamp_gt') ? overrides.timestamp_gt! : 'qui',
        timestamp_gte: overrides && overrides.hasOwnProperty('timestamp_gte') ? overrides.timestamp_gte! : 'facere',
        timestamp_in: overrides && overrides.hasOwnProperty('timestamp_in') ? overrides.timestamp_in! : ['dolor'],
        timestamp_lt: overrides && overrides.hasOwnProperty('timestamp_lt') ? overrides.timestamp_lt! : 'autem',
        timestamp_lte: overrides && overrides.hasOwnProperty('timestamp_lte') ? overrides.timestamp_lte! : 'facere',
        timestamp_not: overrides && overrides.hasOwnProperty('timestamp_not') ? overrides.timestamp_not! : 'voluptatem',
        timestamp_not_contains: overrides && overrides.hasOwnProperty('timestamp_not_contains') ? overrides.timestamp_not_contains! : 'occaecati',
        timestamp_not_contains_nocase: overrides && overrides.hasOwnProperty('timestamp_not_contains_nocase') ? overrides.timestamp_not_contains_nocase! : 'et',
        timestamp_not_ends_with: overrides && overrides.hasOwnProperty('timestamp_not_ends_with') ? overrides.timestamp_not_ends_with! : 'non',
        timestamp_not_ends_with_nocase: overrides && overrides.hasOwnProperty('timestamp_not_ends_with_nocase') ? overrides.timestamp_not_ends_with_nocase! : 'quae',
        timestamp_not_in: overrides && overrides.hasOwnProperty('timestamp_not_in') ? overrides.timestamp_not_in! : ['in'],
        timestamp_not_starts_with: overrides && overrides.hasOwnProperty('timestamp_not_starts_with') ? overrides.timestamp_not_starts_with! : 'magnam',
        timestamp_not_starts_with_nocase: overrides && overrides.hasOwnProperty('timestamp_not_starts_with_nocase') ? overrides.timestamp_not_starts_with_nocase! : 'ut',
        timestamp_starts_with: overrides && overrides.hasOwnProperty('timestamp_starts_with') ? overrides.timestamp_starts_with! : 'a',
        timestamp_starts_with_nocase: overrides && overrides.hasOwnProperty('timestamp_starts_with_nocase') ? overrides.timestamp_starts_with_nocase! : 'ut',
        volume: overrides && overrides.hasOwnProperty('volume') ? overrides.volume! : 'pariatur',
        volume_gt: overrides && overrides.hasOwnProperty('volume_gt') ? overrides.volume_gt! : 'facere',
        volume_gte: overrides && overrides.hasOwnProperty('volume_gte') ? overrides.volume_gte! : 'est',
        volume_in: overrides && overrides.hasOwnProperty('volume_in') ? overrides.volume_in! : ['facere'],
        volume_lt: overrides && overrides.hasOwnProperty('volume_lt') ? overrides.volume_lt! : 'rerum',
        volume_lte: overrides && overrides.hasOwnProperty('volume_lte') ? overrides.volume_lte! : 'quia',
        volume_not: overrides && overrides.hasOwnProperty('volume_not') ? overrides.volume_not! : 'id',
        volume_not_in: overrides && overrides.hasOwnProperty('volume_not_in') ? overrides.volume_not_in! : ['commodi'],
    };
};

export const aToken = (overrides?: Partial<Token>, _relationshipsToOmit: Set<string> = new Set()): Token => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Token');
    return {
        decimals: overrides && overrides.hasOwnProperty('decimals') ? overrides.decimals! : 2903,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'e4a057d9-0741-41d3-ba48-d2dc5f73f080',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'repudiandae',
        symbol: overrides && overrides.hasOwnProperty('symbol') ? overrides.symbol! : 'deleniti',
    };
};

export const aToken_Filter = (overrides?: Partial<Token_Filter>, _relationshipsToOmit: Set<string> = new Set()): Token_Filter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Token_Filter');
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : relationshipsToOmit.has('BlockChangedFilter') ? {} as BlockChangedFilter : aBlockChangedFilter({}, relationshipsToOmit),
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [relationshipsToOmit.has('Token_Filter') ? {} as Token_Filter : aToken_Filter({}, relationshipsToOmit)],
        decimals: overrides && overrides.hasOwnProperty('decimals') ? overrides.decimals! : 4104,
        decimals_gt: overrides && overrides.hasOwnProperty('decimals_gt') ? overrides.decimals_gt! : 7438,
        decimals_gte: overrides && overrides.hasOwnProperty('decimals_gte') ? overrides.decimals_gte! : 9933,
        decimals_in: overrides && overrides.hasOwnProperty('decimals_in') ? overrides.decimals_in! : [2779],
        decimals_lt: overrides && overrides.hasOwnProperty('decimals_lt') ? overrides.decimals_lt! : 4746,
        decimals_lte: overrides && overrides.hasOwnProperty('decimals_lte') ? overrides.decimals_lte! : 3110,
        decimals_not: overrides && overrides.hasOwnProperty('decimals_not') ? overrides.decimals_not! : 4623,
        decimals_not_in: overrides && overrides.hasOwnProperty('decimals_not_in') ? overrides.decimals_not_in! : [9467],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : '815735ed-ea39-4128-91ef-04fdcb30aef8',
        id_gt: overrides && overrides.hasOwnProperty('id_gt') ? overrides.id_gt! : '1cdfd263-c70e-4aab-a1f0-4b585f84e74f',
        id_gte: overrides && overrides.hasOwnProperty('id_gte') ? overrides.id_gte! : 'f53ab6bd-46fe-40c0-8a9a-f6e8ffe52e17',
        id_in: overrides && overrides.hasOwnProperty('id_in') ? overrides.id_in! : ['c15d6c34-3537-4359-9c91-4302dfb0180d'],
        id_lt: overrides && overrides.hasOwnProperty('id_lt') ? overrides.id_lt! : '2cc59e3a-7478-4e1b-9c30-6364c0a22dd8',
        id_lte: overrides && overrides.hasOwnProperty('id_lte') ? overrides.id_lte! : 'a0a45c5c-231f-46eb-aa53-6baa0f33eec6',
        id_not: overrides && overrides.hasOwnProperty('id_not') ? overrides.id_not! : 'e1fc2dd2-0173-4293-a705-35000ff7a324',
        id_not_in: overrides && overrides.hasOwnProperty('id_not_in') ? overrides.id_not_in! : ['3de5fd32-b350-497c-98c3-fd5f0491052b'],
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'voluptas',
        name_contains: overrides && overrides.hasOwnProperty('name_contains') ? overrides.name_contains! : 'fugit',
        name_contains_nocase: overrides && overrides.hasOwnProperty('name_contains_nocase') ? overrides.name_contains_nocase! : 'et',
        name_ends_with: overrides && overrides.hasOwnProperty('name_ends_with') ? overrides.name_ends_with! : 'rerum',
        name_ends_with_nocase: overrides && overrides.hasOwnProperty('name_ends_with_nocase') ? overrides.name_ends_with_nocase! : 'sint',
        name_gt: overrides && overrides.hasOwnProperty('name_gt') ? overrides.name_gt! : 'vero',
        name_gte: overrides && overrides.hasOwnProperty('name_gte') ? overrides.name_gte! : 'pariatur',
        name_in: overrides && overrides.hasOwnProperty('name_in') ? overrides.name_in! : ['est'],
        name_lt: overrides && overrides.hasOwnProperty('name_lt') ? overrides.name_lt! : 'vitae',
        name_lte: overrides && overrides.hasOwnProperty('name_lte') ? overrides.name_lte! : 'distinctio',
        name_not: overrides && overrides.hasOwnProperty('name_not') ? overrides.name_not! : 'reiciendis',
        name_not_contains: overrides && overrides.hasOwnProperty('name_not_contains') ? overrides.name_not_contains! : 'tenetur',
        name_not_contains_nocase: overrides && overrides.hasOwnProperty('name_not_contains_nocase') ? overrides.name_not_contains_nocase! : 'ut',
        name_not_ends_with: overrides && overrides.hasOwnProperty('name_not_ends_with') ? overrides.name_not_ends_with! : 'officia',
        name_not_ends_with_nocase: overrides && overrides.hasOwnProperty('name_not_ends_with_nocase') ? overrides.name_not_ends_with_nocase! : 'vel',
        name_not_in: overrides && overrides.hasOwnProperty('name_not_in') ? overrides.name_not_in! : ['perspiciatis'],
        name_not_starts_with: overrides && overrides.hasOwnProperty('name_not_starts_with') ? overrides.name_not_starts_with! : 'tenetur',
        name_not_starts_with_nocase: overrides && overrides.hasOwnProperty('name_not_starts_with_nocase') ? overrides.name_not_starts_with_nocase! : 'aliquam',
        name_starts_with: overrides && overrides.hasOwnProperty('name_starts_with') ? overrides.name_starts_with! : 'voluptas',
        name_starts_with_nocase: overrides && overrides.hasOwnProperty('name_starts_with_nocase') ? overrides.name_starts_with_nocase! : 'voluptatem',
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [relationshipsToOmit.has('Token_Filter') ? {} as Token_Filter : aToken_Filter({}, relationshipsToOmit)],
        symbol: overrides && overrides.hasOwnProperty('symbol') ? overrides.symbol! : 'asperiores',
        symbol_contains: overrides && overrides.hasOwnProperty('symbol_contains') ? overrides.symbol_contains! : 'vitae',
        symbol_contains_nocase: overrides && overrides.hasOwnProperty('symbol_contains_nocase') ? overrides.symbol_contains_nocase! : 'odio',
        symbol_ends_with: overrides && overrides.hasOwnProperty('symbol_ends_with') ? overrides.symbol_ends_with! : 'doloribus',
        symbol_ends_with_nocase: overrides && overrides.hasOwnProperty('symbol_ends_with_nocase') ? overrides.symbol_ends_with_nocase! : 'ut',
        symbol_gt: overrides && overrides.hasOwnProperty('symbol_gt') ? overrides.symbol_gt! : 'vel',
        symbol_gte: overrides && overrides.hasOwnProperty('symbol_gte') ? overrides.symbol_gte! : 'quidem',
        symbol_in: overrides && overrides.hasOwnProperty('symbol_in') ? overrides.symbol_in! : ['id'],
        symbol_lt: overrides && overrides.hasOwnProperty('symbol_lt') ? overrides.symbol_lt! : 'minus',
        symbol_lte: overrides && overrides.hasOwnProperty('symbol_lte') ? overrides.symbol_lte! : 'quos',
        symbol_not: overrides && overrides.hasOwnProperty('symbol_not') ? overrides.symbol_not! : 'aut',
        symbol_not_contains: overrides && overrides.hasOwnProperty('symbol_not_contains') ? overrides.symbol_not_contains! : 'rerum',
        symbol_not_contains_nocase: overrides && overrides.hasOwnProperty('symbol_not_contains_nocase') ? overrides.symbol_not_contains_nocase! : 'itaque',
        symbol_not_ends_with: overrides && overrides.hasOwnProperty('symbol_not_ends_with') ? overrides.symbol_not_ends_with! : 'quis',
        symbol_not_ends_with_nocase: overrides && overrides.hasOwnProperty('symbol_not_ends_with_nocase') ? overrides.symbol_not_ends_with_nocase! : 'voluptatibus',
        symbol_not_in: overrides && overrides.hasOwnProperty('symbol_not_in') ? overrides.symbol_not_in! : ['assumenda'],
        symbol_not_starts_with: overrides && overrides.hasOwnProperty('symbol_not_starts_with') ? overrides.symbol_not_starts_with! : 'dolores',
        symbol_not_starts_with_nocase: overrides && overrides.hasOwnProperty('symbol_not_starts_with_nocase') ? overrides.symbol_not_starts_with_nocase! : 'numquam',
        symbol_starts_with: overrides && overrides.hasOwnProperty('symbol_starts_with') ? overrides.symbol_starts_with! : 'cum',
        symbol_starts_with_nocase: overrides && overrides.hasOwnProperty('symbol_starts_with_nocase') ? overrides.symbol_starts_with_nocase! : 'totam',
    };
};

export const a_Block_ = (overrides?: Partial<_Block_>, _relationshipsToOmit: Set<string> = new Set()): _Block_ => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('_Block_');
    return {
        hash: overrides && overrides.hasOwnProperty('hash') ? overrides.hash! : 'ex',
        number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : 1599,
        timestamp: overrides && overrides.hasOwnProperty('timestamp') ? overrides.timestamp! : 1310,
    };
};

export const a_Meta_ = (overrides?: Partial<_Meta_>, _relationshipsToOmit: Set<string> = new Set()): _Meta_ => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('_Meta_');
    return {
        block: overrides && overrides.hasOwnProperty('block') ? overrides.block! : relationshipsToOmit.has('_Block_') ? {} as _Block_ : a_Block_({}, relationshipsToOmit),
        deployment: overrides && overrides.hasOwnProperty('deployment') ? overrides.deployment! : 'ut',
        hasIndexingErrors: overrides && overrides.hasOwnProperty('hasIndexingErrors') ? overrides.hasIndexingErrors! : false,
    };
};

//@ts-nocheck
import casual from 'casual';
import { Account, Account_Filter, BlockChangedFilter, Block_Height, Holding, Holding_Filter, Query, Subscription, Token, Token_Filter, _Block_, _Meta_, Account_OrderBy, Holding_OrderBy, OrderDirection, Token_OrderBy, _SubgraphErrorPolicy_ } from '../types/assets.types';

casual.seed(0);

export const anAccount = (overrides?: Partial<Account>, _relationshipsToOmit: Set<string> = new Set()): Account => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Account');
    return {
        holdings: overrides && overrides.hasOwnProperty('holdings') ? overrides.holdings! : [relationshipsToOmit.has('Holding') ? {} as Holding : aHolding({}, relationshipsToOmit)],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : casual.word,
    };
};

export const anAccount_Filter = (overrides?: Partial<Account_Filter>, _relationshipsToOmit: Set<string> = new Set()): Account_Filter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Account_Filter');
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : relationshipsToOmit.has('BlockChangedFilter') ? {} as BlockChangedFilter : aBlockChangedFilter({}, relationshipsToOmit),
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [relationshipsToOmit.has('Account_Filter') ? {} as Account_Filter : anAccount_Filter({}, relationshipsToOmit)],
        holdings_: overrides && overrides.hasOwnProperty('holdings_') ? overrides.holdings_! : relationshipsToOmit.has('Holding_Filter') ? {} as Holding_Filter : aHolding_Filter({}, relationshipsToOmit),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : casual.word,
        id_contains: overrides && overrides.hasOwnProperty('id_contains') ? overrides.id_contains! : casual.word,
        id_gt: overrides && overrides.hasOwnProperty('id_gt') ? overrides.id_gt! : casual.word,
        id_gte: overrides && overrides.hasOwnProperty('id_gte') ? overrides.id_gte! : casual.word,
        id_in: overrides && overrides.hasOwnProperty('id_in') ? overrides.id_in! : [casual.word],
        id_lt: overrides && overrides.hasOwnProperty('id_lt') ? overrides.id_lt! : casual.word,
        id_lte: overrides && overrides.hasOwnProperty('id_lte') ? overrides.id_lte! : casual.word,
        id_not: overrides && overrides.hasOwnProperty('id_not') ? overrides.id_not! : casual.word,
        id_not_contains: overrides && overrides.hasOwnProperty('id_not_contains') ? overrides.id_not_contains! : casual.word,
        id_not_in: overrides && overrides.hasOwnProperty('id_not_in') ? overrides.id_not_in! : [casual.word],
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [relationshipsToOmit.has('Account_Filter') ? {} as Account_Filter : anAccount_Filter({}, relationshipsToOmit)],
    };
};

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

export const aHolding = (overrides?: Partial<Holding>, _relationshipsToOmit: Set<string> = new Set()): Holding => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Holding');
    return {
        account: overrides && overrides.hasOwnProperty('account') ? overrides.account! : relationshipsToOmit.has('Account') ? {} as Account : anAccount({}, relationshipsToOmit),
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : casual['string'],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : casual.word,
        lastUpdated: overrides && overrides.hasOwnProperty('lastUpdated') ? overrides.lastUpdated! : casual['string'],
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit),
    };
};

export const aHolding_Filter = (overrides?: Partial<Holding_Filter>, _relationshipsToOmit: Set<string> = new Set()): Holding_Filter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Holding_Filter');
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : relationshipsToOmit.has('BlockChangedFilter') ? {} as BlockChangedFilter : aBlockChangedFilter({}, relationshipsToOmit),
        account: overrides && overrides.hasOwnProperty('account') ? overrides.account! : casual.word,
        account_: overrides && overrides.hasOwnProperty('account_') ? overrides.account_! : relationshipsToOmit.has('Account_Filter') ? {} as Account_Filter : anAccount_Filter({}, relationshipsToOmit),
        account_contains: overrides && overrides.hasOwnProperty('account_contains') ? overrides.account_contains! : casual.word,
        account_contains_nocase: overrides && overrides.hasOwnProperty('account_contains_nocase') ? overrides.account_contains_nocase! : casual.word,
        account_ends_with: overrides && overrides.hasOwnProperty('account_ends_with') ? overrides.account_ends_with! : casual.word,
        account_ends_with_nocase: overrides && overrides.hasOwnProperty('account_ends_with_nocase') ? overrides.account_ends_with_nocase! : casual.word,
        account_gt: overrides && overrides.hasOwnProperty('account_gt') ? overrides.account_gt! : casual.word,
        account_gte: overrides && overrides.hasOwnProperty('account_gte') ? overrides.account_gte! : casual.word,
        account_in: overrides && overrides.hasOwnProperty('account_in') ? overrides.account_in! : [casual.word],
        account_lt: overrides && overrides.hasOwnProperty('account_lt') ? overrides.account_lt! : casual.word,
        account_lte: overrides && overrides.hasOwnProperty('account_lte') ? overrides.account_lte! : casual.word,
        account_not: overrides && overrides.hasOwnProperty('account_not') ? overrides.account_not! : casual.word,
        account_not_contains: overrides && overrides.hasOwnProperty('account_not_contains') ? overrides.account_not_contains! : casual.word,
        account_not_contains_nocase: overrides && overrides.hasOwnProperty('account_not_contains_nocase') ? overrides.account_not_contains_nocase! : casual.word,
        account_not_ends_with: overrides && overrides.hasOwnProperty('account_not_ends_with') ? overrides.account_not_ends_with! : casual.word,
        account_not_ends_with_nocase: overrides && overrides.hasOwnProperty('account_not_ends_with_nocase') ? overrides.account_not_ends_with_nocase! : casual.word,
        account_not_in: overrides && overrides.hasOwnProperty('account_not_in') ? overrides.account_not_in! : [casual.word],
        account_not_starts_with: overrides && overrides.hasOwnProperty('account_not_starts_with') ? overrides.account_not_starts_with! : casual.word,
        account_not_starts_with_nocase: overrides && overrides.hasOwnProperty('account_not_starts_with_nocase') ? overrides.account_not_starts_with_nocase! : casual.word,
        account_starts_with: overrides && overrides.hasOwnProperty('account_starts_with') ? overrides.account_starts_with! : casual.word,
        account_starts_with_nocase: overrides && overrides.hasOwnProperty('account_starts_with_nocase') ? overrides.account_starts_with_nocase! : casual.word,
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : casual['string'],
        amount_gt: overrides && overrides.hasOwnProperty('amount_gt') ? overrides.amount_gt! : casual['string'],
        amount_gte: overrides && overrides.hasOwnProperty('amount_gte') ? overrides.amount_gte! : casual['string'],
        amount_in: overrides && overrides.hasOwnProperty('amount_in') ? overrides.amount_in! : [casual['string']],
        amount_lt: overrides && overrides.hasOwnProperty('amount_lt') ? overrides.amount_lt! : casual['string'],
        amount_lte: overrides && overrides.hasOwnProperty('amount_lte') ? overrides.amount_lte! : casual['string'],
        amount_not: overrides && overrides.hasOwnProperty('amount_not') ? overrides.amount_not! : casual['string'],
        amount_not_in: overrides && overrides.hasOwnProperty('amount_not_in') ? overrides.amount_not_in! : [casual['string']],
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [relationshipsToOmit.has('Holding_Filter') ? {} as Holding_Filter : aHolding_Filter({}, relationshipsToOmit)],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : casual.word,
        id_contains: overrides && overrides.hasOwnProperty('id_contains') ? overrides.id_contains! : casual.word,
        id_gt: overrides && overrides.hasOwnProperty('id_gt') ? overrides.id_gt! : casual.word,
        id_gte: overrides && overrides.hasOwnProperty('id_gte') ? overrides.id_gte! : casual.word,
        id_in: overrides && overrides.hasOwnProperty('id_in') ? overrides.id_in! : [casual.word],
        id_lt: overrides && overrides.hasOwnProperty('id_lt') ? overrides.id_lt! : casual.word,
        id_lte: overrides && overrides.hasOwnProperty('id_lte') ? overrides.id_lte! : casual.word,
        id_not: overrides && overrides.hasOwnProperty('id_not') ? overrides.id_not! : casual.word,
        id_not_contains: overrides && overrides.hasOwnProperty('id_not_contains') ? overrides.id_not_contains! : casual.word,
        id_not_in: overrides && overrides.hasOwnProperty('id_not_in') ? overrides.id_not_in! : [casual.word],
        lastUpdated: overrides && overrides.hasOwnProperty('lastUpdated') ? overrides.lastUpdated! : casual['string'],
        lastUpdated_gt: overrides && overrides.hasOwnProperty('lastUpdated_gt') ? overrides.lastUpdated_gt! : casual['string'],
        lastUpdated_gte: overrides && overrides.hasOwnProperty('lastUpdated_gte') ? overrides.lastUpdated_gte! : casual['string'],
        lastUpdated_in: overrides && overrides.hasOwnProperty('lastUpdated_in') ? overrides.lastUpdated_in! : [casual['string']],
        lastUpdated_lt: overrides && overrides.hasOwnProperty('lastUpdated_lt') ? overrides.lastUpdated_lt! : casual['string'],
        lastUpdated_lte: overrides && overrides.hasOwnProperty('lastUpdated_lte') ? overrides.lastUpdated_lte! : casual['string'],
        lastUpdated_not: overrides && overrides.hasOwnProperty('lastUpdated_not') ? overrides.lastUpdated_not! : casual['string'],
        lastUpdated_not_in: overrides && overrides.hasOwnProperty('lastUpdated_not_in') ? overrides.lastUpdated_not_in! : [casual['string']],
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [relationshipsToOmit.has('Holding_Filter') ? {} as Holding_Filter : aHolding_Filter({}, relationshipsToOmit)],
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : casual.word,
        token_: overrides && overrides.hasOwnProperty('token_') ? overrides.token_! : relationshipsToOmit.has('Token_Filter') ? {} as Token_Filter : aToken_Filter({}, relationshipsToOmit),
        token_contains: overrides && overrides.hasOwnProperty('token_contains') ? overrides.token_contains! : casual.word,
        token_contains_nocase: overrides && overrides.hasOwnProperty('token_contains_nocase') ? overrides.token_contains_nocase! : casual.word,
        token_ends_with: overrides && overrides.hasOwnProperty('token_ends_with') ? overrides.token_ends_with! : casual.word,
        token_ends_with_nocase: overrides && overrides.hasOwnProperty('token_ends_with_nocase') ? overrides.token_ends_with_nocase! : casual.word,
        token_gt: overrides && overrides.hasOwnProperty('token_gt') ? overrides.token_gt! : casual.word,
        token_gte: overrides && overrides.hasOwnProperty('token_gte') ? overrides.token_gte! : casual.word,
        token_in: overrides && overrides.hasOwnProperty('token_in') ? overrides.token_in! : [casual.word],
        token_lt: overrides && overrides.hasOwnProperty('token_lt') ? overrides.token_lt! : casual.word,
        token_lte: overrides && overrides.hasOwnProperty('token_lte') ? overrides.token_lte! : casual.word,
        token_not: overrides && overrides.hasOwnProperty('token_not') ? overrides.token_not! : casual.word,
        token_not_contains: overrides && overrides.hasOwnProperty('token_not_contains') ? overrides.token_not_contains! : casual.word,
        token_not_contains_nocase: overrides && overrides.hasOwnProperty('token_not_contains_nocase') ? overrides.token_not_contains_nocase! : casual.word,
        token_not_ends_with: overrides && overrides.hasOwnProperty('token_not_ends_with') ? overrides.token_not_ends_with! : casual.word,
        token_not_ends_with_nocase: overrides && overrides.hasOwnProperty('token_not_ends_with_nocase') ? overrides.token_not_ends_with_nocase! : casual.word,
        token_not_in: overrides && overrides.hasOwnProperty('token_not_in') ? overrides.token_not_in! : [casual.word],
        token_not_starts_with: overrides && overrides.hasOwnProperty('token_not_starts_with') ? overrides.token_not_starts_with! : casual.word,
        token_not_starts_with_nocase: overrides && overrides.hasOwnProperty('token_not_starts_with_nocase') ? overrides.token_not_starts_with_nocase! : casual.word,
        token_starts_with: overrides && overrides.hasOwnProperty('token_starts_with') ? overrides.token_starts_with! : casual.word,
        token_starts_with_nocase: overrides && overrides.hasOwnProperty('token_starts_with_nocase') ? overrides.token_starts_with_nocase! : casual.word,
    };
};

export const aQuery = (overrides?: Partial<Query>, _relationshipsToOmit: Set<string> = new Set()): Query => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Query');
    return {
        _meta: overrides && overrides.hasOwnProperty('_meta') ? overrides._meta! : relationshipsToOmit.has('_Meta_') ? {} as _Meta_ : a_Meta_({}, relationshipsToOmit),
        account: overrides && overrides.hasOwnProperty('account') ? overrides.account! : relationshipsToOmit.has('Account') ? {} as Account : anAccount({}, relationshipsToOmit),
        accounts: overrides && overrides.hasOwnProperty('accounts') ? overrides.accounts! : [relationshipsToOmit.has('Account') ? {} as Account : anAccount({}, relationshipsToOmit)],
        holding: overrides && overrides.hasOwnProperty('holding') ? overrides.holding! : relationshipsToOmit.has('Holding') ? {} as Holding : aHolding({}, relationshipsToOmit),
        holdings: overrides && overrides.hasOwnProperty('holdings') ? overrides.holdings! : [relationshipsToOmit.has('Holding') ? {} as Holding : aHolding({}, relationshipsToOmit)],
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit),
        tokens: overrides && overrides.hasOwnProperty('tokens') ? overrides.tokens! : [relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit)],
    };
};

export const aSubscription = (overrides?: Partial<Subscription>, _relationshipsToOmit: Set<string> = new Set()): Subscription => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Subscription');
    return {
        _meta: overrides && overrides.hasOwnProperty('_meta') ? overrides._meta! : relationshipsToOmit.has('_Meta_') ? {} as _Meta_ : a_Meta_({}, relationshipsToOmit),
        account: overrides && overrides.hasOwnProperty('account') ? overrides.account! : relationshipsToOmit.has('Account') ? {} as Account : anAccount({}, relationshipsToOmit),
        accounts: overrides && overrides.hasOwnProperty('accounts') ? overrides.accounts! : [relationshipsToOmit.has('Account') ? {} as Account : anAccount({}, relationshipsToOmit)],
        holding: overrides && overrides.hasOwnProperty('holding') ? overrides.holding! : relationshipsToOmit.has('Holding') ? {} as Holding : aHolding({}, relationshipsToOmit),
        holdings: overrides && overrides.hasOwnProperty('holdings') ? overrides.holdings! : [relationshipsToOmit.has('Holding') ? {} as Holding : aHolding({}, relationshipsToOmit)],
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit),
        tokens: overrides && overrides.hasOwnProperty('tokens') ? overrides.tokens! : [relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit)],
    };
};

export const aToken = (overrides?: Partial<Token>, _relationshipsToOmit: Set<string> = new Set()): Token => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Token');
    return {
        decimals: overrides && overrides.hasOwnProperty('decimals') ? overrides.decimals! : casual.integer(0, 9999),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : casual.word,
        latestPricePerKLIMA: overrides && overrides.hasOwnProperty('latestPricePerKLIMA') ? overrides.latestPricePerKLIMA! : casual.word,
        latestPricePerKLIMAUpdated: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated') ? overrides.latestPricePerKLIMAUpdated! : casual['string'],
        latestPriceUSD: overrides && overrides.hasOwnProperty('latestPriceUSD') ? overrides.latestPriceUSD! : casual.word,
        latestPriceUSDUpdated: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated') ? overrides.latestPriceUSDUpdated! : casual['string'],
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
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : casual.word,
        id_contains: overrides && overrides.hasOwnProperty('id_contains') ? overrides.id_contains! : casual.word,
        id_gt: overrides && overrides.hasOwnProperty('id_gt') ? overrides.id_gt! : casual.word,
        id_gte: overrides && overrides.hasOwnProperty('id_gte') ? overrides.id_gte! : casual.word,
        id_in: overrides && overrides.hasOwnProperty('id_in') ? overrides.id_in! : [casual.word],
        id_lt: overrides && overrides.hasOwnProperty('id_lt') ? overrides.id_lt! : casual.word,
        id_lte: overrides && overrides.hasOwnProperty('id_lte') ? overrides.id_lte! : casual.word,
        id_not: overrides && overrides.hasOwnProperty('id_not') ? overrides.id_not! : casual.word,
        id_not_contains: overrides && overrides.hasOwnProperty('id_not_contains') ? overrides.id_not_contains! : casual.word,
        id_not_in: overrides && overrides.hasOwnProperty('id_not_in') ? overrides.id_not_in! : [casual.word],
        latestPricePerKLIMA: overrides && overrides.hasOwnProperty('latestPricePerKLIMA') ? overrides.latestPricePerKLIMA! : casual.word,
        latestPricePerKLIMAUpdated: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated') ? overrides.latestPricePerKLIMAUpdated! : casual['string'],
        latestPricePerKLIMAUpdated_gt: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_gt') ? overrides.latestPricePerKLIMAUpdated_gt! : casual['string'],
        latestPricePerKLIMAUpdated_gte: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_gte') ? overrides.latestPricePerKLIMAUpdated_gte! : casual['string'],
        latestPricePerKLIMAUpdated_in: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_in') ? overrides.latestPricePerKLIMAUpdated_in! : [casual['string']],
        latestPricePerKLIMAUpdated_lt: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_lt') ? overrides.latestPricePerKLIMAUpdated_lt! : casual['string'],
        latestPricePerKLIMAUpdated_lte: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_lte') ? overrides.latestPricePerKLIMAUpdated_lte! : casual['string'],
        latestPricePerKLIMAUpdated_not: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_not') ? overrides.latestPricePerKLIMAUpdated_not! : casual['string'],
        latestPricePerKLIMAUpdated_not_in: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_not_in') ? overrides.latestPricePerKLIMAUpdated_not_in! : [casual['string']],
        latestPricePerKLIMA_gt: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_gt') ? overrides.latestPricePerKLIMA_gt! : casual.word,
        latestPricePerKLIMA_gte: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_gte') ? overrides.latestPricePerKLIMA_gte! : casual.word,
        latestPricePerKLIMA_in: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_in') ? overrides.latestPricePerKLIMA_in! : [casual.word],
        latestPricePerKLIMA_lt: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_lt') ? overrides.latestPricePerKLIMA_lt! : casual.word,
        latestPricePerKLIMA_lte: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_lte') ? overrides.latestPricePerKLIMA_lte! : casual.word,
        latestPricePerKLIMA_not: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_not') ? overrides.latestPricePerKLIMA_not! : casual.word,
        latestPricePerKLIMA_not_in: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_not_in') ? overrides.latestPricePerKLIMA_not_in! : [casual.word],
        latestPriceUSD: overrides && overrides.hasOwnProperty('latestPriceUSD') ? overrides.latestPriceUSD! : casual.word,
        latestPriceUSDUpdated: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated') ? overrides.latestPriceUSDUpdated! : casual['string'],
        latestPriceUSDUpdated_gt: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_gt') ? overrides.latestPriceUSDUpdated_gt! : casual['string'],
        latestPriceUSDUpdated_gte: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_gte') ? overrides.latestPriceUSDUpdated_gte! : casual['string'],
        latestPriceUSDUpdated_in: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_in') ? overrides.latestPriceUSDUpdated_in! : [casual['string']],
        latestPriceUSDUpdated_lt: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_lt') ? overrides.latestPriceUSDUpdated_lt! : casual['string'],
        latestPriceUSDUpdated_lte: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_lte') ? overrides.latestPriceUSDUpdated_lte! : casual['string'],
        latestPriceUSDUpdated_not: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_not') ? overrides.latestPriceUSDUpdated_not! : casual['string'],
        latestPriceUSDUpdated_not_in: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_not_in') ? overrides.latestPriceUSDUpdated_not_in! : [casual['string']],
        latestPriceUSD_gt: overrides && overrides.hasOwnProperty('latestPriceUSD_gt') ? overrides.latestPriceUSD_gt! : casual.word,
        latestPriceUSD_gte: overrides && overrides.hasOwnProperty('latestPriceUSD_gte') ? overrides.latestPriceUSD_gte! : casual.word,
        latestPriceUSD_in: overrides && overrides.hasOwnProperty('latestPriceUSD_in') ? overrides.latestPriceUSD_in! : [casual.word],
        latestPriceUSD_lt: overrides && overrides.hasOwnProperty('latestPriceUSD_lt') ? overrides.latestPriceUSD_lt! : casual.word,
        latestPriceUSD_lte: overrides && overrides.hasOwnProperty('latestPriceUSD_lte') ? overrides.latestPriceUSD_lte! : casual.word,
        latestPriceUSD_not: overrides && overrides.hasOwnProperty('latestPriceUSD_not') ? overrides.latestPriceUSD_not! : casual.word,
        latestPriceUSD_not_in: overrides && overrides.hasOwnProperty('latestPriceUSD_not_in') ? overrides.latestPriceUSD_not_in! : [casual.word],
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

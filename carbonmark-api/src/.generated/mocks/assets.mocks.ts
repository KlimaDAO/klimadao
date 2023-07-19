import { Account, Account_Filter, BlockChangedFilter, Block_Height, Holding, Holding_Filter, Query, Subscription, Token, Token_Filter, _Block_, _Meta_, Account_OrderBy, Holding_OrderBy, OrderDirection, Token_OrderBy, _SubgraphErrorPolicy_ } from 'src/.generated/types/assets.types';

export const anAccount = (overrides?: Partial<Account>): Account => {
    return {
        holdings: overrides && overrides.hasOwnProperty('holdings') ? overrides.holdings! : [aHolding()],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'atque',
    };
};

export const anAccount_Filter = (overrides?: Partial<Account_Filter>): Account_Filter => {
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : aBlockChangedFilter(),
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [anAccount_Filter()],
        holdings_: overrides && overrides.hasOwnProperty('holdings_') ? overrides.holdings_! : aHolding_Filter(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'ea',
        id_contains: overrides && overrides.hasOwnProperty('id_contains') ? overrides.id_contains! : 'aliquam',
        id_gt: overrides && overrides.hasOwnProperty('id_gt') ? overrides.id_gt! : 'qui',
        id_gte: overrides && overrides.hasOwnProperty('id_gte') ? overrides.id_gte! : 'consequuntur',
        id_in: overrides && overrides.hasOwnProperty('id_in') ? overrides.id_in! : ['incidunt'],
        id_lt: overrides && overrides.hasOwnProperty('id_lt') ? overrides.id_lt! : 'et',
        id_lte: overrides && overrides.hasOwnProperty('id_lte') ? overrides.id_lte! : 'tenetur',
        id_not: overrides && overrides.hasOwnProperty('id_not') ? overrides.id_not! : 'odit',
        id_not_contains: overrides && overrides.hasOwnProperty('id_not_contains') ? overrides.id_not_contains! : 'ut',
        id_not_in: overrides && overrides.hasOwnProperty('id_not_in') ? overrides.id_not_in! : ['ut'],
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [anAccount_Filter()],
    };
};

export const aBlockChangedFilter = (overrides?: Partial<BlockChangedFilter>): BlockChangedFilter => {
    return {
        number_gte: overrides && overrides.hasOwnProperty('number_gte') ? overrides.number_gte! : 4175,
    };
};

export const aBlock_Height = (overrides?: Partial<Block_Height>): Block_Height => {
    return {
        hash: overrides && overrides.hasOwnProperty('hash') ? overrides.hash! : 'ut',
        number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : 6885,
        number_gte: overrides && overrides.hasOwnProperty('number_gte') ? overrides.number_gte! : 5347,
    };
};

export const aHolding = (overrides?: Partial<Holding>): Holding => {
    return {
        account: overrides && overrides.hasOwnProperty('account') ? overrides.account! : anAccount(),
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 'tempore deserunt voluptatem error aspernatur temporibus aut',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'velit',
        lastUpdated: overrides && overrides.hasOwnProperty('lastUpdated') ? overrides.lastUpdated! : 'velit modi itaque alias nostrum voluptas temporibus',
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : aToken(),
    };
};

export const aHolding_Filter = (overrides?: Partial<Holding_Filter>): Holding_Filter => {
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : aBlockChangedFilter(),
        account: overrides && overrides.hasOwnProperty('account') ? overrides.account! : 'repellendus',
        account_: overrides && overrides.hasOwnProperty('account_') ? overrides.account_! : anAccount_Filter(),
        account_contains: overrides && overrides.hasOwnProperty('account_contains') ? overrides.account_contains! : 'rem',
        account_contains_nocase: overrides && overrides.hasOwnProperty('account_contains_nocase') ? overrides.account_contains_nocase! : 'vel',
        account_ends_with: overrides && overrides.hasOwnProperty('account_ends_with') ? overrides.account_ends_with! : 'in',
        account_ends_with_nocase: overrides && overrides.hasOwnProperty('account_ends_with_nocase') ? overrides.account_ends_with_nocase! : 'quasi',
        account_gt: overrides && overrides.hasOwnProperty('account_gt') ? overrides.account_gt! : 'voluptatum',
        account_gte: overrides && overrides.hasOwnProperty('account_gte') ? overrides.account_gte! : 'ut',
        account_in: overrides && overrides.hasOwnProperty('account_in') ? overrides.account_in! : ['iusto'],
        account_lt: overrides && overrides.hasOwnProperty('account_lt') ? overrides.account_lt! : 'et',
        account_lte: overrides && overrides.hasOwnProperty('account_lte') ? overrides.account_lte! : 'temporibus',
        account_not: overrides && overrides.hasOwnProperty('account_not') ? overrides.account_not! : 'esse',
        account_not_contains: overrides && overrides.hasOwnProperty('account_not_contains') ? overrides.account_not_contains! : 'officiis',
        account_not_contains_nocase: overrides && overrides.hasOwnProperty('account_not_contains_nocase') ? overrides.account_not_contains_nocase! : 'quidem',
        account_not_ends_with: overrides && overrides.hasOwnProperty('account_not_ends_with') ? overrides.account_not_ends_with! : 'molestiae',
        account_not_ends_with_nocase: overrides && overrides.hasOwnProperty('account_not_ends_with_nocase') ? overrides.account_not_ends_with_nocase! : 'ut',
        account_not_in: overrides && overrides.hasOwnProperty('account_not_in') ? overrides.account_not_in! : ['quo'],
        account_not_starts_with: overrides && overrides.hasOwnProperty('account_not_starts_with') ? overrides.account_not_starts_with! : 'vel',
        account_not_starts_with_nocase: overrides && overrides.hasOwnProperty('account_not_starts_with_nocase') ? overrides.account_not_starts_with_nocase! : 'quo',
        account_starts_with: overrides && overrides.hasOwnProperty('account_starts_with') ? overrides.account_starts_with! : 'accusantium',
        account_starts_with_nocase: overrides && overrides.hasOwnProperty('account_starts_with_nocase') ? overrides.account_starts_with_nocase! : 'pariatur',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 'est qui voluptas fuga eos non quos',
        amount_gt: overrides && overrides.hasOwnProperty('amount_gt') ? overrides.amount_gt! : 'eligendi dolores doloremque reiciendis fugit quia voluptatibus',
        amount_gte: overrides && overrides.hasOwnProperty('amount_gte') ? overrides.amount_gte! : 'dolores optio autem et similique occaecati aut',
        amount_in: overrides && overrides.hasOwnProperty('amount_in') ? overrides.amount_in! : ['occaecati velit repudiandae animi ab optio fuga'],
        amount_lt: overrides && overrides.hasOwnProperty('amount_lt') ? overrides.amount_lt! : 'itaque laudantium consequatur fugiat quo est voluptatibus',
        amount_lte: overrides && overrides.hasOwnProperty('amount_lte') ? overrides.amount_lte! : 'nulla nesciunt quam provident culpa vel aut',
        amount_not: overrides && overrides.hasOwnProperty('amount_not') ? overrides.amount_not! : 'error est quia omnis consequatur suscipit voluptas',
        amount_not_in: overrides && overrides.hasOwnProperty('amount_not_in') ? overrides.amount_not_in! : ['error id porro odit assumenda non ratione'],
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [aHolding_Filter()],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'impedit',
        id_contains: overrides && overrides.hasOwnProperty('id_contains') ? overrides.id_contains! : 'cumque',
        id_gt: overrides && overrides.hasOwnProperty('id_gt') ? overrides.id_gt! : 'dicta',
        id_gte: overrides && overrides.hasOwnProperty('id_gte') ? overrides.id_gte! : 'corrupti',
        id_in: overrides && overrides.hasOwnProperty('id_in') ? overrides.id_in! : ['facere'],
        id_lt: overrides && overrides.hasOwnProperty('id_lt') ? overrides.id_lt! : 'dolorem',
        id_lte: overrides && overrides.hasOwnProperty('id_lte') ? overrides.id_lte! : 'voluptas',
        id_not: overrides && overrides.hasOwnProperty('id_not') ? overrides.id_not! : 'impedit',
        id_not_contains: overrides && overrides.hasOwnProperty('id_not_contains') ? overrides.id_not_contains! : 'expedita',
        id_not_in: overrides && overrides.hasOwnProperty('id_not_in') ? overrides.id_not_in! : ['non'],
        lastUpdated: overrides && overrides.hasOwnProperty('lastUpdated') ? overrides.lastUpdated! : 'velit est sint molestiae ut libero ipsam',
        lastUpdated_gt: overrides && overrides.hasOwnProperty('lastUpdated_gt') ? overrides.lastUpdated_gt! : 'qui accusamus non sed commodi et eius',
        lastUpdated_gte: overrides && overrides.hasOwnProperty('lastUpdated_gte') ? overrides.lastUpdated_gte! : 'dolores beatae tenetur repellendus voluptatem necessitatibus aut',
        lastUpdated_in: overrides && overrides.hasOwnProperty('lastUpdated_in') ? overrides.lastUpdated_in! : ['ab sed impedit unde et qui architecto'],
        lastUpdated_lt: overrides && overrides.hasOwnProperty('lastUpdated_lt') ? overrides.lastUpdated_lt! : 'quae reprehenderit omnis quia consequatur corporis eligendi',
        lastUpdated_lte: overrides && overrides.hasOwnProperty('lastUpdated_lte') ? overrides.lastUpdated_lte! : 'odit quia cupiditate voluptatibus eveniet modi itaque',
        lastUpdated_not: overrides && overrides.hasOwnProperty('lastUpdated_not') ? overrides.lastUpdated_not! : 'ea deserunt error omnis ut fugit quia',
        lastUpdated_not_in: overrides && overrides.hasOwnProperty('lastUpdated_not_in') ? overrides.lastUpdated_not_in! : ['non quaerat enim voluptatem ut sed voluptas'],
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [aHolding_Filter()],
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : 'eius',
        token_: overrides && overrides.hasOwnProperty('token_') ? overrides.token_! : aToken_Filter(),
        token_contains: overrides && overrides.hasOwnProperty('token_contains') ? overrides.token_contains! : 'animi',
        token_contains_nocase: overrides && overrides.hasOwnProperty('token_contains_nocase') ? overrides.token_contains_nocase! : 'eum',
        token_ends_with: overrides && overrides.hasOwnProperty('token_ends_with') ? overrides.token_ends_with! : 'explicabo',
        token_ends_with_nocase: overrides && overrides.hasOwnProperty('token_ends_with_nocase') ? overrides.token_ends_with_nocase! : 'porro',
        token_gt: overrides && overrides.hasOwnProperty('token_gt') ? overrides.token_gt! : 'voluptatem',
        token_gte: overrides && overrides.hasOwnProperty('token_gte') ? overrides.token_gte! : 'nihil',
        token_in: overrides && overrides.hasOwnProperty('token_in') ? overrides.token_in! : ['ipsum'],
        token_lt: overrides && overrides.hasOwnProperty('token_lt') ? overrides.token_lt! : 'sunt',
        token_lte: overrides && overrides.hasOwnProperty('token_lte') ? overrides.token_lte! : 'ea',
        token_not: overrides && overrides.hasOwnProperty('token_not') ? overrides.token_not! : 'odio',
        token_not_contains: overrides && overrides.hasOwnProperty('token_not_contains') ? overrides.token_not_contains! : 'velit',
        token_not_contains_nocase: overrides && overrides.hasOwnProperty('token_not_contains_nocase') ? overrides.token_not_contains_nocase! : 'et',
        token_not_ends_with: overrides && overrides.hasOwnProperty('token_not_ends_with') ? overrides.token_not_ends_with! : 'iusto',
        token_not_ends_with_nocase: overrides && overrides.hasOwnProperty('token_not_ends_with_nocase') ? overrides.token_not_ends_with_nocase! : 'sunt',
        token_not_in: overrides && overrides.hasOwnProperty('token_not_in') ? overrides.token_not_in! : ['illum'],
        token_not_starts_with: overrides && overrides.hasOwnProperty('token_not_starts_with') ? overrides.token_not_starts_with! : 'natus',
        token_not_starts_with_nocase: overrides && overrides.hasOwnProperty('token_not_starts_with_nocase') ? overrides.token_not_starts_with_nocase! : 'pariatur',
        token_starts_with: overrides && overrides.hasOwnProperty('token_starts_with') ? overrides.token_starts_with! : 'rerum',
        token_starts_with_nocase: overrides && overrides.hasOwnProperty('token_starts_with_nocase') ? overrides.token_starts_with_nocase! : 'sit',
    };
};

export const aQuery = (overrides?: Partial<Query>): Query => {
    return {
        _meta: overrides && overrides.hasOwnProperty('_meta') ? overrides._meta! : a_Meta_(),
        account: overrides && overrides.hasOwnProperty('account') ? overrides.account! : anAccount(),
        accounts: overrides && overrides.hasOwnProperty('accounts') ? overrides.accounts! : [anAccount()],
        holding: overrides && overrides.hasOwnProperty('holding') ? overrides.holding! : aHolding(),
        holdings: overrides && overrides.hasOwnProperty('holdings') ? overrides.holdings! : [aHolding()],
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : aToken(),
        tokens: overrides && overrides.hasOwnProperty('tokens') ? overrides.tokens! : [aToken()],
    };
};

export const aSubscription = (overrides?: Partial<Subscription>): Subscription => {
    return {
        _meta: overrides && overrides.hasOwnProperty('_meta') ? overrides._meta! : a_Meta_(),
        account: overrides && overrides.hasOwnProperty('account') ? overrides.account! : anAccount(),
        accounts: overrides && overrides.hasOwnProperty('accounts') ? overrides.accounts! : [anAccount()],
        holding: overrides && overrides.hasOwnProperty('holding') ? overrides.holding! : aHolding(),
        holdings: overrides && overrides.hasOwnProperty('holdings') ? overrides.holdings! : [aHolding()],
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : aToken(),
        tokens: overrides && overrides.hasOwnProperty('tokens') ? overrides.tokens! : [aToken()],
    };
};

export const aToken = (overrides?: Partial<Token>): Token => {
    return {
        decimals: overrides && overrides.hasOwnProperty('decimals') ? overrides.decimals! : 2903,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'doloribus',
        latestPricePerKLIMA: overrides && overrides.hasOwnProperty('latestPricePerKLIMA') ? overrides.latestPricePerKLIMA! : 'quia',
        latestPricePerKLIMAUpdated: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated') ? overrides.latestPricePerKLIMAUpdated! : 'quia incidunt aut ex aut et dolorum',
        latestPriceUSD: overrides && overrides.hasOwnProperty('latestPriceUSD') ? overrides.latestPriceUSD! : 'magni',
        latestPriceUSDUpdated: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated') ? overrides.latestPriceUSDUpdated! : 'voluptatem culpa omnis quo aut natus saepe',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'repudiandae',
        symbol: overrides && overrides.hasOwnProperty('symbol') ? overrides.symbol! : 'deleniti',
    };
};

export const aToken_Filter = (overrides?: Partial<Token_Filter>): Token_Filter => {
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : aBlockChangedFilter(),
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [aToken_Filter()],
        decimals: overrides && overrides.hasOwnProperty('decimals') ? overrides.decimals! : 4104,
        decimals_gt: overrides && overrides.hasOwnProperty('decimals_gt') ? overrides.decimals_gt! : 7438,
        decimals_gte: overrides && overrides.hasOwnProperty('decimals_gte') ? overrides.decimals_gte! : 9933,
        decimals_in: overrides && overrides.hasOwnProperty('decimals_in') ? overrides.decimals_in! : [2779],
        decimals_lt: overrides && overrides.hasOwnProperty('decimals_lt') ? overrides.decimals_lt! : 4746,
        decimals_lte: overrides && overrides.hasOwnProperty('decimals_lte') ? overrides.decimals_lte! : 3110,
        decimals_not: overrides && overrides.hasOwnProperty('decimals_not') ? overrides.decimals_not! : 4623,
        decimals_not_in: overrides && overrides.hasOwnProperty('decimals_not_in') ? overrides.decimals_not_in! : [9467],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'et',
        id_contains: overrides && overrides.hasOwnProperty('id_contains') ? overrides.id_contains! : 'vero',
        id_gt: overrides && overrides.hasOwnProperty('id_gt') ? overrides.id_gt! : 'aperiam',
        id_gte: overrides && overrides.hasOwnProperty('id_gte') ? overrides.id_gte! : 'rerum',
        id_in: overrides && overrides.hasOwnProperty('id_in') ? overrides.id_in! : ['fugiat'],
        id_lt: overrides && overrides.hasOwnProperty('id_lt') ? overrides.id_lt! : 'velit',
        id_lte: overrides && overrides.hasOwnProperty('id_lte') ? overrides.id_lte! : 'quisquam',
        id_not: overrides && overrides.hasOwnProperty('id_not') ? overrides.id_not! : 'earum',
        id_not_contains: overrides && overrides.hasOwnProperty('id_not_contains') ? overrides.id_not_contains! : 'autem',
        id_not_in: overrides && overrides.hasOwnProperty('id_not_in') ? overrides.id_not_in! : ['dolores'],
        latestPricePerKLIMA: overrides && overrides.hasOwnProperty('latestPricePerKLIMA') ? overrides.latestPricePerKLIMA! : 'nemo',
        latestPricePerKLIMAUpdated: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated') ? overrides.latestPricePerKLIMAUpdated! : 'reprehenderit dolore voluptatem cum voluptas qui laborum',
        latestPricePerKLIMAUpdated_gt: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_gt') ? overrides.latestPricePerKLIMAUpdated_gt! : 'dolorem incidunt voluptates amet sit dicta culpa',
        latestPricePerKLIMAUpdated_gte: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_gte') ? overrides.latestPricePerKLIMAUpdated_gte! : 'laboriosam deleniti nisi architecto qui mollitia labore',
        latestPricePerKLIMAUpdated_in: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_in') ? overrides.latestPricePerKLIMAUpdated_in! : ['exercitationem et deserunt quaerat eum et sunt'],
        latestPricePerKLIMAUpdated_lt: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_lt') ? overrides.latestPricePerKLIMAUpdated_lt! : 'modi numquam recusandae omnis quia ut fugiat',
        latestPricePerKLIMAUpdated_lte: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_lte') ? overrides.latestPricePerKLIMAUpdated_lte! : 'temporibus vel est consectetur labore ipsam iste',
        latestPricePerKLIMAUpdated_not: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_not') ? overrides.latestPricePerKLIMAUpdated_not! : 'ipsa harum veniam laboriosam consequatur eius est',
        latestPricePerKLIMAUpdated_not_in: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated_not_in') ? overrides.latestPricePerKLIMAUpdated_not_in! : ['amet recusandae voluptas aperiam et possimus exercitationem'],
        latestPricePerKLIMA_gt: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_gt') ? overrides.latestPricePerKLIMA_gt! : 'et',
        latestPricePerKLIMA_gte: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_gte') ? overrides.latestPricePerKLIMA_gte! : 'nesciunt',
        latestPricePerKLIMA_in: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_in') ? overrides.latestPricePerKLIMA_in! : ['iste'],
        latestPricePerKLIMA_lt: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_lt') ? overrides.latestPricePerKLIMA_lt! : 'et',
        latestPricePerKLIMA_lte: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_lte') ? overrides.latestPricePerKLIMA_lte! : 'veniam',
        latestPricePerKLIMA_not: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_not') ? overrides.latestPricePerKLIMA_not! : 'impedit',
        latestPricePerKLIMA_not_in: overrides && overrides.hasOwnProperty('latestPricePerKLIMA_not_in') ? overrides.latestPricePerKLIMA_not_in! : ['dolores'],
        latestPriceUSD: overrides && overrides.hasOwnProperty('latestPriceUSD') ? overrides.latestPriceUSD! : 'quis',
        latestPriceUSDUpdated: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated') ? overrides.latestPriceUSDUpdated! : 'ab unde blanditiis illum ullam dolorem corrupti',
        latestPriceUSDUpdated_gt: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_gt') ? overrides.latestPriceUSDUpdated_gt! : 'voluptas et aut deleniti non nesciunt eos',
        latestPriceUSDUpdated_gte: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_gte') ? overrides.latestPriceUSDUpdated_gte! : 'autem eum itaque officiis neque doloremque libero',
        latestPriceUSDUpdated_in: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_in') ? overrides.latestPriceUSDUpdated_in! : ['quia placeat illo quis sit expedita quia'],
        latestPriceUSDUpdated_lt: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_lt') ? overrides.latestPriceUSDUpdated_lt! : 'at odit cupiditate dolor autem hic laborum',
        latestPriceUSDUpdated_lte: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_lte') ? overrides.latestPriceUSDUpdated_lte! : 'sit quia suscipit itaque magnam saepe voluptatem',
        latestPriceUSDUpdated_not: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_not') ? overrides.latestPriceUSDUpdated_not! : 'voluptatem illum illo atque aut incidunt id',
        latestPriceUSDUpdated_not_in: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated_not_in') ? overrides.latestPriceUSDUpdated_not_in! : ['sit eum vitae rerum eligendi voluptas quo'],
        latestPriceUSD_gt: overrides && overrides.hasOwnProperty('latestPriceUSD_gt') ? overrides.latestPriceUSD_gt! : 'eum',
        latestPriceUSD_gte: overrides && overrides.hasOwnProperty('latestPriceUSD_gte') ? overrides.latestPriceUSD_gte! : 'natus',
        latestPriceUSD_in: overrides && overrides.hasOwnProperty('latestPriceUSD_in') ? overrides.latestPriceUSD_in! : ['doloribus'],
        latestPriceUSD_lt: overrides && overrides.hasOwnProperty('latestPriceUSD_lt') ? overrides.latestPriceUSD_lt! : 'neque',
        latestPriceUSD_lte: overrides && overrides.hasOwnProperty('latestPriceUSD_lte') ? overrides.latestPriceUSD_lte! : 'ipsam',
        latestPriceUSD_not: overrides && overrides.hasOwnProperty('latestPriceUSD_not') ? overrides.latestPriceUSD_not! : 'illo',
        latestPriceUSD_not_in: overrides && overrides.hasOwnProperty('latestPriceUSD_not_in') ? overrides.latestPriceUSD_not_in! : ['exercitationem'],
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
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [aToken_Filter()],
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

export const a_Block_ = (overrides?: Partial<_Block_>): _Block_ => {
    return {
        hash: overrides && overrides.hasOwnProperty('hash') ? overrides.hash! : 'ex',
        number: overrides && overrides.hasOwnProperty('number') ? overrides.number! : 1599,
        timestamp: overrides && overrides.hasOwnProperty('timestamp') ? overrides.timestamp! : 1310,
    };
};

export const a_Meta_ = (overrides?: Partial<_Meta_>): _Meta_ => {
    return {
        block: overrides && overrides.hasOwnProperty('block') ? overrides.block! : a_Block_(),
        deployment: overrides && overrides.hasOwnProperty('deployment') ? overrides.deployment! : 'ut',
        hasIndexingErrors: overrides && overrides.hasOwnProperty('hasIndexingErrors') ? overrides.hasIndexingErrors! : false,
    };
};

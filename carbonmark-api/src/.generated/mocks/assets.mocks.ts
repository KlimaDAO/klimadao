//@ts-nocheck
import { Account, Account_Filter, BlockChangedFilter, Block_Height, Holding, Holding_Filter, Query, Subscription, Token, Token_Filter, _Block_, _Meta_, Account_OrderBy, Holding_OrderBy, OrderDirection, Token_OrderBy, _SubgraphErrorPolicy_ } from '../types/assets.types';

export const anAccount = (overrides?: Partial<Account>, _relationshipsToOmit: Set<string> = new Set()): Account => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Account');
    return {
        holdings: overrides && overrides.hasOwnProperty('holdings') ? overrides.holdings! : [relationshipsToOmit.has('Holding') ? {} as Holding : aHolding({}, relationshipsToOmit)],
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'atque',
    };
};

export const anAccount_Filter = (overrides?: Partial<Account_Filter>, _relationshipsToOmit: Set<string> = new Set()): Account_Filter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Account_Filter');
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : relationshipsToOmit.has('BlockChangedFilter') ? {} as BlockChangedFilter : aBlockChangedFilter({}, relationshipsToOmit),
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [relationshipsToOmit.has('Account_Filter') ? {} as Account_Filter : anAccount_Filter({}, relationshipsToOmit)],
        holdings_: overrides && overrides.hasOwnProperty('holdings_') ? overrides.holdings_! : relationshipsToOmit.has('Holding_Filter') ? {} as Holding_Filter : aHolding_Filter({}, relationshipsToOmit),
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
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [relationshipsToOmit.has('Account_Filter') ? {} as Account_Filter : anAccount_Filter({}, relationshipsToOmit)],
    };
};

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

export const aHolding = (overrides?: Partial<Holding>, _relationshipsToOmit: Set<string> = new Set()): Holding => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Holding');
    return {
        account: overrides && overrides.hasOwnProperty('account') ? overrides.account! : relationshipsToOmit.has('Account') ? {} as Account : anAccount({}, relationshipsToOmit),
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 'tempore deserunt voluptatem error aspernatur temporibus aut',
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'velit',
        lastUpdated: overrides && overrides.hasOwnProperty('lastUpdated') ? overrides.lastUpdated! : 'velit modi itaque alias nostrum voluptas temporibus',
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : relationshipsToOmit.has('Token') ? {} as Token : aToken({}, relationshipsToOmit),
    };
};

export const aHolding_Filter = (overrides?: Partial<Holding_Filter>, _relationshipsToOmit: Set<string> = new Set()): Holding_Filter => {
    const relationshipsToOmit: Set<string> = new Set(_relationshipsToOmit);
    relationshipsToOmit.add('Holding_Filter');
    return {
        _change_block: overrides && overrides.hasOwnProperty('_change_block') ? overrides._change_block! : relationshipsToOmit.has('BlockChangedFilter') ? {} as BlockChangedFilter : aBlockChangedFilter({}, relationshipsToOmit),
        account: overrides && overrides.hasOwnProperty('account') ? overrides.account! : 'repellendus modi possimus harum rerum et explicabo',
        account_: overrides && overrides.hasOwnProperty('account_') ? overrides.account_! : relationshipsToOmit.has('Account_Filter') ? {} as Account_Filter : anAccount_Filter({}, relationshipsToOmit),
        account_contains: overrides && overrides.hasOwnProperty('account_contains') ? overrides.account_contains! : 'rem nobis modi eaque tempore tempore doloremque',
        account_contains_nocase: overrides && overrides.hasOwnProperty('account_contains_nocase') ? overrides.account_contains_nocase! : 'vel nobis quae et quas et delectus',
        account_ends_with: overrides && overrides.hasOwnProperty('account_ends_with') ? overrides.account_ends_with! : 'in dolores nemo qui enim ullam sapiente',
        account_ends_with_nocase: overrides && overrides.hasOwnProperty('account_ends_with_nocase') ? overrides.account_ends_with_nocase! : 'quasi at reiciendis quis at ea quis',
        account_gt: overrides && overrides.hasOwnProperty('account_gt') ? overrides.account_gt! : 'voluptatum quia qui ullam aut ut ipsa',
        account_gte: overrides && overrides.hasOwnProperty('account_gte') ? overrides.account_gte! : 'ut consequatur voluptates vero corporis voluptas in',
        account_in: overrides && overrides.hasOwnProperty('account_in') ? overrides.account_in! : ['iusto cupiditate esse amet velit in ut'],
        account_lt: overrides && overrides.hasOwnProperty('account_lt') ? overrides.account_lt! : 'et quibusdam quisquam nisi perferendis porro porro',
        account_lte: overrides && overrides.hasOwnProperty('account_lte') ? overrides.account_lte! : 'temporibus quaerat tempore quia qui dolores excepturi',
        account_not: overrides && overrides.hasOwnProperty('account_not') ? overrides.account_not! : 'esse eaque quas tempora molestiae inventore tenetur',
        account_not_contains: overrides && overrides.hasOwnProperty('account_not_contains') ? overrides.account_not_contains! : 'officiis soluta ea sequi ut consequatur ut',
        account_not_contains_nocase: overrides && overrides.hasOwnProperty('account_not_contains_nocase') ? overrides.account_not_contains_nocase! : 'quidem porro odio reiciendis optio esse quia',
        account_not_ends_with: overrides && overrides.hasOwnProperty('account_not_ends_with') ? overrides.account_not_ends_with! : 'molestiae consequatur magni ex et exercitationem cum',
        account_not_ends_with_nocase: overrides && overrides.hasOwnProperty('account_not_ends_with_nocase') ? overrides.account_not_ends_with_nocase! : 'ut exercitationem ut et quod amet exercitationem',
        account_not_in: overrides && overrides.hasOwnProperty('account_not_in') ? overrides.account_not_in! : ['quo possimus iste corrupti esse ipsam ut'],
        account_not_starts_with: overrides && overrides.hasOwnProperty('account_not_starts_with') ? overrides.account_not_starts_with! : 'vel sit earum ut et veniam aliquam',
        account_not_starts_with_nocase: overrides && overrides.hasOwnProperty('account_not_starts_with_nocase') ? overrides.account_not_starts_with_nocase! : 'quo iusto atque id ipsam error et',
        account_starts_with: overrides && overrides.hasOwnProperty('account_starts_with') ? overrides.account_starts_with! : 'accusantium ad velit iusto dolores ullam possimus',
        account_starts_with_nocase: overrides && overrides.hasOwnProperty('account_starts_with_nocase') ? overrides.account_starts_with_nocase! : 'pariatur tempore quam blanditiis vitae excepturi aliquam',
        amount: overrides && overrides.hasOwnProperty('amount') ? overrides.amount! : 'est qui voluptas fuga eos non quos',
        amount_gt: overrides && overrides.hasOwnProperty('amount_gt') ? overrides.amount_gt! : 'eligendi dolores doloremque reiciendis fugit quia voluptatibus',
        amount_gte: overrides && overrides.hasOwnProperty('amount_gte') ? overrides.amount_gte! : 'dolores optio autem et similique occaecati aut',
        amount_in: overrides && overrides.hasOwnProperty('amount_in') ? overrides.amount_in! : ['occaecati velit repudiandae animi ab optio fuga'],
        amount_lt: overrides && overrides.hasOwnProperty('amount_lt') ? overrides.amount_lt! : 'itaque laudantium consequatur fugiat quo est voluptatibus',
        amount_lte: overrides && overrides.hasOwnProperty('amount_lte') ? overrides.amount_lte! : 'nulla nesciunt quam provident culpa vel aut',
        amount_not: overrides && overrides.hasOwnProperty('amount_not') ? overrides.amount_not! : 'error est quia omnis consequatur suscipit voluptas',
        amount_not_in: overrides && overrides.hasOwnProperty('amount_not_in') ? overrides.amount_not_in! : ['error id porro odit assumenda non ratione'],
        and: overrides && overrides.hasOwnProperty('and') ? overrides.and! : [relationshipsToOmit.has('Holding_Filter') ? {} as Holding_Filter : aHolding_Filter({}, relationshipsToOmit)],
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
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [relationshipsToOmit.has('Holding_Filter') ? {} as Holding_Filter : aHolding_Filter({}, relationshipsToOmit)],
        token: overrides && overrides.hasOwnProperty('token') ? overrides.token! : 'eius doloribus minima sit et praesentium ea',
        token_: overrides && overrides.hasOwnProperty('token_') ? overrides.token_! : relationshipsToOmit.has('Token_Filter') ? {} as Token_Filter : aToken_Filter({}, relationshipsToOmit),
        token_contains: overrides && overrides.hasOwnProperty('token_contains') ? overrides.token_contains! : 'animi laborum ad eveniet atque temporibus et',
        token_contains_nocase: overrides && overrides.hasOwnProperty('token_contains_nocase') ? overrides.token_contains_nocase! : 'eum voluptas atque id et eligendi soluta',
        token_ends_with: overrides && overrides.hasOwnProperty('token_ends_with') ? overrides.token_ends_with! : 'explicabo praesentium aut est repellendus rerum et',
        token_ends_with_nocase: overrides && overrides.hasOwnProperty('token_ends_with_nocase') ? overrides.token_ends_with_nocase! : 'porro et nesciunt eos ut veniam debitis',
        token_gt: overrides && overrides.hasOwnProperty('token_gt') ? overrides.token_gt! : 'voluptatem et et dolorem ut aut ad',
        token_gte: overrides && overrides.hasOwnProperty('token_gte') ? overrides.token_gte! : 'nihil at sed enim eaque magni et',
        token_in: overrides && overrides.hasOwnProperty('token_in') ? overrides.token_in! : ['ipsum enim expedita totam rem est deleniti'],
        token_lt: overrides && overrides.hasOwnProperty('token_lt') ? overrides.token_lt! : 'sunt aut iste vel ea accusamus modi',
        token_lte: overrides && overrides.hasOwnProperty('token_lte') ? overrides.token_lte! : 'ea autem deserunt fugit repellendus dolor consequuntur',
        token_not: overrides && overrides.hasOwnProperty('token_not') ? overrides.token_not! : 'odio et voluptatem aspernatur ut laboriosam dolores',
        token_not_contains: overrides && overrides.hasOwnProperty('token_not_contains') ? overrides.token_not_contains! : 'velit qui aut dolores neque accusantium accusamus',
        token_not_contains_nocase: overrides && overrides.hasOwnProperty('token_not_contains_nocase') ? overrides.token_not_contains_nocase! : 'et vero est quia ullam assumenda sit',
        token_not_ends_with: overrides && overrides.hasOwnProperty('token_not_ends_with') ? overrides.token_not_ends_with! : 'iusto veniam maxime possimus ab atque hic',
        token_not_ends_with_nocase: overrides && overrides.hasOwnProperty('token_not_ends_with_nocase') ? overrides.token_not_ends_with_nocase! : 'sunt ut laboriosam aut cupiditate voluptatem iure',
        token_not_in: overrides && overrides.hasOwnProperty('token_not_in') ? overrides.token_not_in! : ['illum eveniet sequi aut voluptatem libero quo'],
        token_not_starts_with: overrides && overrides.hasOwnProperty('token_not_starts_with') ? overrides.token_not_starts_with! : 'natus et qui eius accusantium dolores quis',
        token_not_starts_with_nocase: overrides && overrides.hasOwnProperty('token_not_starts_with_nocase') ? overrides.token_not_starts_with_nocase! : 'pariatur velit esse nam dolores sed maiores',
        token_starts_with: overrides && overrides.hasOwnProperty('token_starts_with') ? overrides.token_starts_with! : 'rerum ut autem dignissimos reprehenderit atque mollitia',
        token_starts_with_nocase: overrides && overrides.hasOwnProperty('token_starts_with_nocase') ? overrides.token_starts_with_nocase! : 'sit magnam ea quis facere officia perferendis',
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
        decimals: overrides && overrides.hasOwnProperty('decimals') ? overrides.decimals! : 2903,
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 'doloribus',
        latestPricePerKLIMA: overrides && overrides.hasOwnProperty('latestPricePerKLIMA') ? overrides.latestPricePerKLIMA! : 'quia',
        latestPricePerKLIMAUpdated: overrides && overrides.hasOwnProperty('latestPricePerKLIMAUpdated') ? overrides.latestPricePerKLIMAUpdated! : 'quia incidunt aut ex aut et dolorum',
        latestPriceUSD: overrides && overrides.hasOwnProperty('latestPriceUSD') ? overrides.latestPriceUSD! : 'magni',
        latestPriceUSDUpdated: overrides && overrides.hasOwnProperty('latestPriceUSDUpdated') ? overrides.latestPriceUSDUpdated! : 'voluptatem culpa omnis quo aut natus saepe',
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'repudiandae nobis dolorum eius est tenetur quasi',
        symbol: overrides && overrides.hasOwnProperty('symbol') ? overrides.symbol! : 'deleniti praesentium sed corporis soluta voluptatem aperiam',
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
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'voluptas tempore qui sint consectetur aperiam aut',
        name_contains: overrides && overrides.hasOwnProperty('name_contains') ? overrides.name_contains! : 'fugit possimus et at architecto quisquam et',
        name_contains_nocase: overrides && overrides.hasOwnProperty('name_contains_nocase') ? overrides.name_contains_nocase! : 'et id non vitae ut quibusdam minus',
        name_ends_with: overrides && overrides.hasOwnProperty('name_ends_with') ? overrides.name_ends_with! : 'rerum eum adipisci sapiente ut quia quia',
        name_ends_with_nocase: overrides && overrides.hasOwnProperty('name_ends_with_nocase') ? overrides.name_ends_with_nocase! : 'sint quibusdam expedita sequi odio quos doloremque',
        name_gt: overrides && overrides.hasOwnProperty('name_gt') ? overrides.name_gt! : 'vero sed quia tempore vel est ut',
        name_gte: overrides && overrides.hasOwnProperty('name_gte') ? overrides.name_gte! : 'pariatur ut neque quam soluta harum fugiat',
        name_in: overrides && overrides.hasOwnProperty('name_in') ? overrides.name_in! : ['est ea vel voluptas velit perspiciatis nulla'],
        name_lt: overrides && overrides.hasOwnProperty('name_lt') ? overrides.name_lt! : 'vitae architecto excepturi eos eum aut fugit',
        name_lte: overrides && overrides.hasOwnProperty('name_lte') ? overrides.name_lte! : 'distinctio eos nemo architecto esse facilis ad',
        name_not: overrides && overrides.hasOwnProperty('name_not') ? overrides.name_not! : 'reiciendis velit sit dolores asperiores harum repellendus',
        name_not_contains: overrides && overrides.hasOwnProperty('name_not_contains') ? overrides.name_not_contains! : 'tenetur vero in voluptas vero possimus eveniet',
        name_not_contains_nocase: overrides && overrides.hasOwnProperty('name_not_contains_nocase') ? overrides.name_not_contains_nocase! : 'ut aliquam expedita explicabo quia et aliquid',
        name_not_ends_with: overrides && overrides.hasOwnProperty('name_not_ends_with') ? overrides.name_not_ends_with! : 'officia aliquid molestias rem qui quod sed',
        name_not_ends_with_nocase: overrides && overrides.hasOwnProperty('name_not_ends_with_nocase') ? overrides.name_not_ends_with_nocase! : 'vel eos magnam aliquid voluptatem ea quia',
        name_not_in: overrides && overrides.hasOwnProperty('name_not_in') ? overrides.name_not_in! : ['perspiciatis nesciunt sit sequi sunt at officia'],
        name_not_starts_with: overrides && overrides.hasOwnProperty('name_not_starts_with') ? overrides.name_not_starts_with! : 'tenetur ut cupiditate dolores qui sit totam',
        name_not_starts_with_nocase: overrides && overrides.hasOwnProperty('name_not_starts_with_nocase') ? overrides.name_not_starts_with_nocase! : 'aliquam id qui molestiae dolor ea aliquam',
        name_starts_with: overrides && overrides.hasOwnProperty('name_starts_with') ? overrides.name_starts_with! : 'voluptas illum libero nisi corporis qui autem',
        name_starts_with_nocase: overrides && overrides.hasOwnProperty('name_starts_with_nocase') ? overrides.name_starts_with_nocase! : 'voluptatem id earum omnis id atque cumque',
        or: overrides && overrides.hasOwnProperty('or') ? overrides.or! : [relationshipsToOmit.has('Token_Filter') ? {} as Token_Filter : aToken_Filter({}, relationshipsToOmit)],
        symbol: overrides && overrides.hasOwnProperty('symbol') ? overrides.symbol! : 'asperiores recusandae eligendi tempora quia deleniti molestiae',
        symbol_contains: overrides && overrides.hasOwnProperty('symbol_contains') ? overrides.symbol_contains! : 'vitae qui voluptatem unde excepturi id vitae',
        symbol_contains_nocase: overrides && overrides.hasOwnProperty('symbol_contains_nocase') ? overrides.symbol_contains_nocase! : 'odio excepturi cupiditate magnam totam eos rerum',
        symbol_ends_with: overrides && overrides.hasOwnProperty('symbol_ends_with') ? overrides.symbol_ends_with! : 'doloribus explicabo hic dolorum est molestiae vel',
        symbol_ends_with_nocase: overrides && overrides.hasOwnProperty('symbol_ends_with_nocase') ? overrides.symbol_ends_with_nocase! : 'ut temporibus incidunt expedita mollitia culpa perspiciatis',
        symbol_gt: overrides && overrides.hasOwnProperty('symbol_gt') ? overrides.symbol_gt! : 'vel at sint quo neque laboriosam aperiam',
        symbol_gte: overrides && overrides.hasOwnProperty('symbol_gte') ? overrides.symbol_gte! : 'quidem odit nam nemo nihil non quidem',
        symbol_in: overrides && overrides.hasOwnProperty('symbol_in') ? overrides.symbol_in! : ['id nesciunt dolores et quaerat ipsum vel'],
        symbol_lt: overrides && overrides.hasOwnProperty('symbol_lt') ? overrides.symbol_lt! : 'minus et qui inventore asperiores et cupiditate',
        symbol_lte: overrides && overrides.hasOwnProperty('symbol_lte') ? overrides.symbol_lte! : 'quos fugit tenetur dolorem non et nemo',
        symbol_not: overrides && overrides.hasOwnProperty('symbol_not') ? overrides.symbol_not! : 'aut ut id voluptatem perspiciatis et quos',
        symbol_not_contains: overrides && overrides.hasOwnProperty('symbol_not_contains') ? overrides.symbol_not_contains! : 'rerum qui maxime ut odio animi accusantium',
        symbol_not_contains_nocase: overrides && overrides.hasOwnProperty('symbol_not_contains_nocase') ? overrides.symbol_not_contains_nocase! : 'itaque et provident odio voluptatem dignissimos neque',
        symbol_not_ends_with: overrides && overrides.hasOwnProperty('symbol_not_ends_with') ? overrides.symbol_not_ends_with! : 'quis officia saepe aspernatur molestias et qui',
        symbol_not_ends_with_nocase: overrides && overrides.hasOwnProperty('symbol_not_ends_with_nocase') ? overrides.symbol_not_ends_with_nocase! : 'voluptatibus et non molestiae quo quo quae',
        symbol_not_in: overrides && overrides.hasOwnProperty('symbol_not_in') ? overrides.symbol_not_in! : ['assumenda recusandae et repellat qui reprehenderit dolores'],
        symbol_not_starts_with: overrides && overrides.hasOwnProperty('symbol_not_starts_with') ? overrides.symbol_not_starts_with! : 'dolores ducimus blanditiis dolorum earum qui pariatur',
        symbol_not_starts_with_nocase: overrides && overrides.hasOwnProperty('symbol_not_starts_with_nocase') ? overrides.symbol_not_starts_with_nocase! : 'numquam voluptate ad nulla voluptas quis nostrum',
        symbol_starts_with: overrides && overrides.hasOwnProperty('symbol_starts_with') ? overrides.symbol_starts_with! : 'cum nihil enim voluptatibus et error aliquid',
        symbol_starts_with_nocase: overrides && overrides.hasOwnProperty('symbol_starts_with_nocase') ? overrides.symbol_starts_with_nocase! : 'totam dolore impedit dolore natus voluptatibus provident',
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
        deployment: overrides && overrides.hasOwnProperty('deployment') ? overrides.deployment! : 'ut illum dicta esse ut id et',
        hasIndexingErrors: overrides && overrides.hasOwnProperty('hasIndexingErrors') ? overrides.hasIndexingErrors! : false,
    };
};

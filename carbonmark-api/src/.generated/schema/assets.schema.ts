import { z } from 'zod'
import { Account_Filter, Account_OrderBy, BlockChangedFilter, Block_Height, Holding_Filter, Holding_OrderBy, OrderDirection, Token_Filter, Token_OrderBy, _SubgraphErrorPolicy_ } from '../types/assets.types'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const Account_OrderBySchema = z.nativeEnum(Account_OrderBy);

export const Holding_OrderBySchema = z.nativeEnum(Holding_OrderBy);

export const OrderDirectionSchema = z.nativeEnum(OrderDirection);

export const Token_OrderBySchema = z.nativeEnum(Token_OrderBy);

export const _SubgraphErrorPolicy_Schema = z.nativeEnum(_SubgraphErrorPolicy_);

export function Account_FilterSchema(): z.ZodObject<Properties<Account_Filter>> {
  return z.object({
    _change_block: BlockChangedFilterSchema().nullish(),
    and: z.array(Account_FilterSchema().nullable()).nullish(),
    holdings_: Holding_FilterSchema().nullish(),
    id: definedNonNullAnySchema.nullish(),
    id_contains: definedNonNullAnySchema.nullish(),
    id_gt: definedNonNullAnySchema.nullish(),
    id_gte: definedNonNullAnySchema.nullish(),
    id_in: z.array(definedNonNullAnySchema).nullish(),
    id_lt: definedNonNullAnySchema.nullish(),
    id_lte: definedNonNullAnySchema.nullish(),
    id_not: definedNonNullAnySchema.nullish(),
    id_not_contains: definedNonNullAnySchema.nullish(),
    id_not_in: z.array(definedNonNullAnySchema).nullish(),
    or: z.array(Account_FilterSchema().nullable()).nullish()
  })
}

export function BlockChangedFilterSchema(): z.ZodObject<Properties<BlockChangedFilter>> {
  return z.object({
    number_gte: definedNonNullAnySchema
  })
}

export function Block_HeightSchema(): z.ZodObject<Properties<Block_Height>> {
  return z.object({
    hash: definedNonNullAnySchema.nullish(),
    number: definedNonNullAnySchema.nullish(),
    number_gte: definedNonNullAnySchema.nullish()
  })
}

export function Holding_FilterSchema(): z.ZodObject<Properties<Holding_Filter>> {
  return z.object({
    _change_block: BlockChangedFilterSchema().nullish(),
    account: definedNonNullAnySchema.nullish(),
    account_: Account_FilterSchema().nullish(),
    account_contains: definedNonNullAnySchema.nullish(),
    account_contains_nocase: definedNonNullAnySchema.nullish(),
    account_ends_with: definedNonNullAnySchema.nullish(),
    account_ends_with_nocase: definedNonNullAnySchema.nullish(),
    account_gt: definedNonNullAnySchema.nullish(),
    account_gte: definedNonNullAnySchema.nullish(),
    account_in: z.array(definedNonNullAnySchema).nullish(),
    account_lt: definedNonNullAnySchema.nullish(),
    account_lte: definedNonNullAnySchema.nullish(),
    account_not: definedNonNullAnySchema.nullish(),
    account_not_contains: definedNonNullAnySchema.nullish(),
    account_not_contains_nocase: definedNonNullAnySchema.nullish(),
    account_not_ends_with: definedNonNullAnySchema.nullish(),
    account_not_ends_with_nocase: definedNonNullAnySchema.nullish(),
    account_not_in: z.array(definedNonNullAnySchema).nullish(),
    account_not_starts_with: definedNonNullAnySchema.nullish(),
    account_not_starts_with_nocase: definedNonNullAnySchema.nullish(),
    account_starts_with: definedNonNullAnySchema.nullish(),
    account_starts_with_nocase: definedNonNullAnySchema.nullish(),
    amount: definedNonNullAnySchema.nullish(),
    amount_gt: definedNonNullAnySchema.nullish(),
    amount_gte: definedNonNullAnySchema.nullish(),
    amount_in: z.array(definedNonNullAnySchema).nullish(),
    amount_lt: definedNonNullAnySchema.nullish(),
    amount_lte: definedNonNullAnySchema.nullish(),
    amount_not: definedNonNullAnySchema.nullish(),
    amount_not_in: z.array(definedNonNullAnySchema).nullish(),
    and: z.array(Holding_FilterSchema().nullable()).nullish(),
    id: definedNonNullAnySchema.nullish(),
    id_contains: definedNonNullAnySchema.nullish(),
    id_gt: definedNonNullAnySchema.nullish(),
    id_gte: definedNonNullAnySchema.nullish(),
    id_in: z.array(definedNonNullAnySchema).nullish(),
    id_lt: definedNonNullAnySchema.nullish(),
    id_lte: definedNonNullAnySchema.nullish(),
    id_not: definedNonNullAnySchema.nullish(),
    id_not_contains: definedNonNullAnySchema.nullish(),
    id_not_in: z.array(definedNonNullAnySchema).nullish(),
    lastUpdated: definedNonNullAnySchema.nullish(),
    lastUpdated_gt: definedNonNullAnySchema.nullish(),
    lastUpdated_gte: definedNonNullAnySchema.nullish(),
    lastUpdated_in: z.array(definedNonNullAnySchema).nullish(),
    lastUpdated_lt: definedNonNullAnySchema.nullish(),
    lastUpdated_lte: definedNonNullAnySchema.nullish(),
    lastUpdated_not: definedNonNullAnySchema.nullish(),
    lastUpdated_not_in: z.array(definedNonNullAnySchema).nullish(),
    or: z.array(Holding_FilterSchema().nullable()).nullish(),
    token: definedNonNullAnySchema.nullish(),
    token_: Token_FilterSchema().nullish(),
    token_contains: definedNonNullAnySchema.nullish(),
    token_contains_nocase: definedNonNullAnySchema.nullish(),
    token_ends_with: definedNonNullAnySchema.nullish(),
    token_ends_with_nocase: definedNonNullAnySchema.nullish(),
    token_gt: definedNonNullAnySchema.nullish(),
    token_gte: definedNonNullAnySchema.nullish(),
    token_in: z.array(definedNonNullAnySchema).nullish(),
    token_lt: definedNonNullAnySchema.nullish(),
    token_lte: definedNonNullAnySchema.nullish(),
    token_not: definedNonNullAnySchema.nullish(),
    token_not_contains: definedNonNullAnySchema.nullish(),
    token_not_contains_nocase: definedNonNullAnySchema.nullish(),
    token_not_ends_with: definedNonNullAnySchema.nullish(),
    token_not_ends_with_nocase: definedNonNullAnySchema.nullish(),
    token_not_in: z.array(definedNonNullAnySchema).nullish(),
    token_not_starts_with: definedNonNullAnySchema.nullish(),
    token_not_starts_with_nocase: definedNonNullAnySchema.nullish(),
    token_starts_with: definedNonNullAnySchema.nullish(),
    token_starts_with_nocase: definedNonNullAnySchema.nullish()
  })
}

export function Token_FilterSchema(): z.ZodObject<Properties<Token_Filter>> {
  return z.object({
    _change_block: BlockChangedFilterSchema().nullish(),
    and: z.array(Token_FilterSchema().nullable()).nullish(),
    decimals: definedNonNullAnySchema.nullish(),
    decimals_gt: definedNonNullAnySchema.nullish(),
    decimals_gte: definedNonNullAnySchema.nullish(),
    decimals_in: z.array(definedNonNullAnySchema).nullish(),
    decimals_lt: definedNonNullAnySchema.nullish(),
    decimals_lte: definedNonNullAnySchema.nullish(),
    decimals_not: definedNonNullAnySchema.nullish(),
    decimals_not_in: z.array(definedNonNullAnySchema).nullish(),
    id: definedNonNullAnySchema.nullish(),
    id_contains: definedNonNullAnySchema.nullish(),
    id_gt: definedNonNullAnySchema.nullish(),
    id_gte: definedNonNullAnySchema.nullish(),
    id_in: z.array(definedNonNullAnySchema).nullish(),
    id_lt: definedNonNullAnySchema.nullish(),
    id_lte: definedNonNullAnySchema.nullish(),
    id_not: definedNonNullAnySchema.nullish(),
    id_not_contains: definedNonNullAnySchema.nullish(),
    id_not_in: z.array(definedNonNullAnySchema).nullish(),
    latestPricePerKLIMA: definedNonNullAnySchema.nullish(),
    latestPricePerKLIMAUpdated: definedNonNullAnySchema.nullish(),
    latestPricePerKLIMAUpdated_gt: definedNonNullAnySchema.nullish(),
    latestPricePerKLIMAUpdated_gte: definedNonNullAnySchema.nullish(),
    latestPricePerKLIMAUpdated_in: z.array(definedNonNullAnySchema).nullish(),
    latestPricePerKLIMAUpdated_lt: definedNonNullAnySchema.nullish(),
    latestPricePerKLIMAUpdated_lte: definedNonNullAnySchema.nullish(),
    latestPricePerKLIMAUpdated_not: definedNonNullAnySchema.nullish(),
    latestPricePerKLIMAUpdated_not_in: z.array(definedNonNullAnySchema).nullish(),
    latestPricePerKLIMA_gt: definedNonNullAnySchema.nullish(),
    latestPricePerKLIMA_gte: definedNonNullAnySchema.nullish(),
    latestPricePerKLIMA_in: z.array(definedNonNullAnySchema).nullish(),
    latestPricePerKLIMA_lt: definedNonNullAnySchema.nullish(),
    latestPricePerKLIMA_lte: definedNonNullAnySchema.nullish(),
    latestPricePerKLIMA_not: definedNonNullAnySchema.nullish(),
    latestPricePerKLIMA_not_in: z.array(definedNonNullAnySchema).nullish(),
    latestPriceUSD: definedNonNullAnySchema.nullish(),
    latestPriceUSDUpdated: definedNonNullAnySchema.nullish(),
    latestPriceUSDUpdated_gt: definedNonNullAnySchema.nullish(),
    latestPriceUSDUpdated_gte: definedNonNullAnySchema.nullish(),
    latestPriceUSDUpdated_in: z.array(definedNonNullAnySchema).nullish(),
    latestPriceUSDUpdated_lt: definedNonNullAnySchema.nullish(),
    latestPriceUSDUpdated_lte: definedNonNullAnySchema.nullish(),
    latestPriceUSDUpdated_not: definedNonNullAnySchema.nullish(),
    latestPriceUSDUpdated_not_in: z.array(definedNonNullAnySchema).nullish(),
    latestPriceUSD_gt: definedNonNullAnySchema.nullish(),
    latestPriceUSD_gte: definedNonNullAnySchema.nullish(),
    latestPriceUSD_in: z.array(definedNonNullAnySchema).nullish(),
    latestPriceUSD_lt: definedNonNullAnySchema.nullish(),
    latestPriceUSD_lte: definedNonNullAnySchema.nullish(),
    latestPriceUSD_not: definedNonNullAnySchema.nullish(),
    latestPriceUSD_not_in: z.array(definedNonNullAnySchema).nullish(),
    name: definedNonNullAnySchema.nullish(),
    name_contains: definedNonNullAnySchema.nullish(),
    name_contains_nocase: definedNonNullAnySchema.nullish(),
    name_ends_with: definedNonNullAnySchema.nullish(),
    name_ends_with_nocase: definedNonNullAnySchema.nullish(),
    name_gt: definedNonNullAnySchema.nullish(),
    name_gte: definedNonNullAnySchema.nullish(),
    name_in: z.array(definedNonNullAnySchema).nullish(),
    name_lt: definedNonNullAnySchema.nullish(),
    name_lte: definedNonNullAnySchema.nullish(),
    name_not: definedNonNullAnySchema.nullish(),
    name_not_contains: definedNonNullAnySchema.nullish(),
    name_not_contains_nocase: definedNonNullAnySchema.nullish(),
    name_not_ends_with: definedNonNullAnySchema.nullish(),
    name_not_ends_with_nocase: definedNonNullAnySchema.nullish(),
    name_not_in: z.array(definedNonNullAnySchema).nullish(),
    name_not_starts_with: definedNonNullAnySchema.nullish(),
    name_not_starts_with_nocase: definedNonNullAnySchema.nullish(),
    name_starts_with: definedNonNullAnySchema.nullish(),
    name_starts_with_nocase: definedNonNullAnySchema.nullish(),
    or: z.array(Token_FilterSchema().nullable()).nullish(),
    symbol: definedNonNullAnySchema.nullish(),
    symbol_contains: definedNonNullAnySchema.nullish(),
    symbol_contains_nocase: definedNonNullAnySchema.nullish(),
    symbol_ends_with: definedNonNullAnySchema.nullish(),
    symbol_ends_with_nocase: definedNonNullAnySchema.nullish(),
    symbol_gt: definedNonNullAnySchema.nullish(),
    symbol_gte: definedNonNullAnySchema.nullish(),
    symbol_in: z.array(definedNonNullAnySchema).nullish(),
    symbol_lt: definedNonNullAnySchema.nullish(),
    symbol_lte: definedNonNullAnySchema.nullish(),
    symbol_not: definedNonNullAnySchema.nullish(),
    symbol_not_contains: definedNonNullAnySchema.nullish(),
    symbol_not_contains_nocase: definedNonNullAnySchema.nullish(),
    symbol_not_ends_with: definedNonNullAnySchema.nullish(),
    symbol_not_ends_with_nocase: definedNonNullAnySchema.nullish(),
    symbol_not_in: z.array(definedNonNullAnySchema).nullish(),
    symbol_not_starts_with: definedNonNullAnySchema.nullish(),
    symbol_not_starts_with_nocase: definedNonNullAnySchema.nullish(),
    symbol_starts_with: definedNonNullAnySchema.nullish(),
    symbol_starts_with_nocase: definedNonNullAnySchema.nullish()
  })
}

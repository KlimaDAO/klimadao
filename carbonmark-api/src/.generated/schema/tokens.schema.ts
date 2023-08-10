import { z } from 'zod'
import { BlockChangedFilter, Block_Height, OrderDirection, Pair, Pair_Filter, Pair_OrderBy, Swap, Swap_Filter, Swap_OrderBy, Token, Token_Filter, Token_OrderBy, _Block_, _Meta_, _SubgraphErrorPolicy_ } from '../types/tokens.types'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const OrderDirectionSchema = z.nativeEnum(OrderDirection);

export const Pair_OrderBySchema = z.nativeEnum(Pair_OrderBy);

export const Swap_OrderBySchema = z.nativeEnum(Swap_OrderBy);

export const Token_OrderBySchema = z.nativeEnum(Token_OrderBy);

export const _SubgraphErrorPolicy_Schema = z.nativeEnum(_SubgraphErrorPolicy_);

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

export function PairSchema(): z.ZodObject<Properties<Pair>> {
  return z.object({
    __typename: z.literal('Pair').optional(),
    currentprice: definedNonNullAnySchema,
    id: definedNonNullAnySchema,
    lastupdate: definedNonNullAnySchema,
    swaps: z.array(SwapSchema()),
    token0: TokenSchema(),
    token1: TokenSchema(),
    totalklimaearnedfees: definedNonNullAnySchema,
    totalvolume: definedNonNullAnySchema
  })
}

export function Pair_FilterSchema(): z.ZodObject<Properties<Pair_Filter>> {
  return z.object({
    _change_block: BlockChangedFilterSchema().nullish(),
    and: z.array(Pair_FilterSchema().nullable()).nullish(),
    currentprice: definedNonNullAnySchema.nullish(),
    currentprice_gt: definedNonNullAnySchema.nullish(),
    currentprice_gte: definedNonNullAnySchema.nullish(),
    currentprice_in: z.array(definedNonNullAnySchema).nullish(),
    currentprice_lt: definedNonNullAnySchema.nullish(),
    currentprice_lte: definedNonNullAnySchema.nullish(),
    currentprice_not: definedNonNullAnySchema.nullish(),
    currentprice_not_in: z.array(definedNonNullAnySchema).nullish(),
    id: definedNonNullAnySchema.nullish(),
    id_gt: definedNonNullAnySchema.nullish(),
    id_gte: definedNonNullAnySchema.nullish(),
    id_in: z.array(definedNonNullAnySchema).nullish(),
    id_lt: definedNonNullAnySchema.nullish(),
    id_lte: definedNonNullAnySchema.nullish(),
    id_not: definedNonNullAnySchema.nullish(),
    id_not_in: z.array(definedNonNullAnySchema).nullish(),
    lastupdate: definedNonNullAnySchema.nullish(),
    lastupdate_contains: definedNonNullAnySchema.nullish(),
    lastupdate_contains_nocase: definedNonNullAnySchema.nullish(),
    lastupdate_ends_with: definedNonNullAnySchema.nullish(),
    lastupdate_ends_with_nocase: definedNonNullAnySchema.nullish(),
    lastupdate_gt: definedNonNullAnySchema.nullish(),
    lastupdate_gte: definedNonNullAnySchema.nullish(),
    lastupdate_in: z.array(definedNonNullAnySchema).nullish(),
    lastupdate_lt: definedNonNullAnySchema.nullish(),
    lastupdate_lte: definedNonNullAnySchema.nullish(),
    lastupdate_not: definedNonNullAnySchema.nullish(),
    lastupdate_not_contains: definedNonNullAnySchema.nullish(),
    lastupdate_not_contains_nocase: definedNonNullAnySchema.nullish(),
    lastupdate_not_ends_with: definedNonNullAnySchema.nullish(),
    lastupdate_not_ends_with_nocase: definedNonNullAnySchema.nullish(),
    lastupdate_not_in: z.array(definedNonNullAnySchema).nullish(),
    lastupdate_not_starts_with: definedNonNullAnySchema.nullish(),
    lastupdate_not_starts_with_nocase: definedNonNullAnySchema.nullish(),
    lastupdate_starts_with: definedNonNullAnySchema.nullish(),
    lastupdate_starts_with_nocase: definedNonNullAnySchema.nullish(),
    or: z.array(Pair_FilterSchema().nullable()).nullish(),
    swaps_: Swap_FilterSchema().nullish(),
    token0: definedNonNullAnySchema.nullish(),
    token0_: Token_FilterSchema().nullish(),
    token0_contains: definedNonNullAnySchema.nullish(),
    token0_contains_nocase: definedNonNullAnySchema.nullish(),
    token0_ends_with: definedNonNullAnySchema.nullish(),
    token0_ends_with_nocase: definedNonNullAnySchema.nullish(),
    token0_gt: definedNonNullAnySchema.nullish(),
    token0_gte: definedNonNullAnySchema.nullish(),
    token0_in: z.array(definedNonNullAnySchema).nullish(),
    token0_lt: definedNonNullAnySchema.nullish(),
    token0_lte: definedNonNullAnySchema.nullish(),
    token0_not: definedNonNullAnySchema.nullish(),
    token0_not_contains: definedNonNullAnySchema.nullish(),
    token0_not_contains_nocase: definedNonNullAnySchema.nullish(),
    token0_not_ends_with: definedNonNullAnySchema.nullish(),
    token0_not_ends_with_nocase: definedNonNullAnySchema.nullish(),
    token0_not_in: z.array(definedNonNullAnySchema).nullish(),
    token0_not_starts_with: definedNonNullAnySchema.nullish(),
    token0_not_starts_with_nocase: definedNonNullAnySchema.nullish(),
    token0_starts_with: definedNonNullAnySchema.nullish(),
    token0_starts_with_nocase: definedNonNullAnySchema.nullish(),
    token1: definedNonNullAnySchema.nullish(),
    token1_: Token_FilterSchema().nullish(),
    token1_contains: definedNonNullAnySchema.nullish(),
    token1_contains_nocase: definedNonNullAnySchema.nullish(),
    token1_ends_with: definedNonNullAnySchema.nullish(),
    token1_ends_with_nocase: definedNonNullAnySchema.nullish(),
    token1_gt: definedNonNullAnySchema.nullish(),
    token1_gte: definedNonNullAnySchema.nullish(),
    token1_in: z.array(definedNonNullAnySchema).nullish(),
    token1_lt: definedNonNullAnySchema.nullish(),
    token1_lte: definedNonNullAnySchema.nullish(),
    token1_not: definedNonNullAnySchema.nullish(),
    token1_not_contains: definedNonNullAnySchema.nullish(),
    token1_not_contains_nocase: definedNonNullAnySchema.nullish(),
    token1_not_ends_with: definedNonNullAnySchema.nullish(),
    token1_not_ends_with_nocase: definedNonNullAnySchema.nullish(),
    token1_not_in: z.array(definedNonNullAnySchema).nullish(),
    token1_not_starts_with: definedNonNullAnySchema.nullish(),
    token1_not_starts_with_nocase: definedNonNullAnySchema.nullish(),
    token1_starts_with: definedNonNullAnySchema.nullish(),
    token1_starts_with_nocase: definedNonNullAnySchema.nullish(),
    totalklimaearnedfees: definedNonNullAnySchema.nullish(),
    totalklimaearnedfees_gt: definedNonNullAnySchema.nullish(),
    totalklimaearnedfees_gte: definedNonNullAnySchema.nullish(),
    totalklimaearnedfees_in: z.array(definedNonNullAnySchema).nullish(),
    totalklimaearnedfees_lt: definedNonNullAnySchema.nullish(),
    totalklimaearnedfees_lte: definedNonNullAnySchema.nullish(),
    totalklimaearnedfees_not: definedNonNullAnySchema.nullish(),
    totalklimaearnedfees_not_in: z.array(definedNonNullAnySchema).nullish(),
    totalvolume: definedNonNullAnySchema.nullish(),
    totalvolume_gt: definedNonNullAnySchema.nullish(),
    totalvolume_gte: definedNonNullAnySchema.nullish(),
    totalvolume_in: z.array(definedNonNullAnySchema).nullish(),
    totalvolume_lt: definedNonNullAnySchema.nullish(),
    totalvolume_lte: definedNonNullAnySchema.nullish(),
    totalvolume_not: definedNonNullAnySchema.nullish(),
    totalvolume_not_in: z.array(definedNonNullAnySchema).nullish()
  })
}

export function SwapSchema(): z.ZodObject<Properties<Swap>> {
  return z.object({
    __typename: z.literal('Swap').optional(),
    close: definedNonNullAnySchema,
    high: definedNonNullAnySchema,
    id: definedNonNullAnySchema,
    klimaearnedfees: definedNonNullAnySchema,
    low: definedNonNullAnySchema,
    lpfees: definedNonNullAnySchema,
    open: definedNonNullAnySchema,
    pair: PairSchema(),
    slippage: definedNonNullAnySchema,
    timestamp: definedNonNullAnySchema,
    volume: definedNonNullAnySchema
  })
}

export function Swap_FilterSchema(): z.ZodObject<Properties<Swap_Filter>> {
  return z.object({
    _change_block: BlockChangedFilterSchema().nullish(),
    and: z.array(Swap_FilterSchema().nullable()).nullish(),
    close: definedNonNullAnySchema.nullish(),
    close_gt: definedNonNullAnySchema.nullish(),
    close_gte: definedNonNullAnySchema.nullish(),
    close_in: z.array(definedNonNullAnySchema).nullish(),
    close_lt: definedNonNullAnySchema.nullish(),
    close_lte: definedNonNullAnySchema.nullish(),
    close_not: definedNonNullAnySchema.nullish(),
    close_not_in: z.array(definedNonNullAnySchema).nullish(),
    high: definedNonNullAnySchema.nullish(),
    high_gt: definedNonNullAnySchema.nullish(),
    high_gte: definedNonNullAnySchema.nullish(),
    high_in: z.array(definedNonNullAnySchema).nullish(),
    high_lt: definedNonNullAnySchema.nullish(),
    high_lte: definedNonNullAnySchema.nullish(),
    high_not: definedNonNullAnySchema.nullish(),
    high_not_in: z.array(definedNonNullAnySchema).nullish(),
    id: definedNonNullAnySchema.nullish(),
    id_gt: definedNonNullAnySchema.nullish(),
    id_gte: definedNonNullAnySchema.nullish(),
    id_in: z.array(definedNonNullAnySchema).nullish(),
    id_lt: definedNonNullAnySchema.nullish(),
    id_lte: definedNonNullAnySchema.nullish(),
    id_not: definedNonNullAnySchema.nullish(),
    id_not_in: z.array(definedNonNullAnySchema).nullish(),
    klimaearnedfees: definedNonNullAnySchema.nullish(),
    klimaearnedfees_gt: definedNonNullAnySchema.nullish(),
    klimaearnedfees_gte: definedNonNullAnySchema.nullish(),
    klimaearnedfees_in: z.array(definedNonNullAnySchema).nullish(),
    klimaearnedfees_lt: definedNonNullAnySchema.nullish(),
    klimaearnedfees_lte: definedNonNullAnySchema.nullish(),
    klimaearnedfees_not: definedNonNullAnySchema.nullish(),
    klimaearnedfees_not_in: z.array(definedNonNullAnySchema).nullish(),
    low: definedNonNullAnySchema.nullish(),
    low_gt: definedNonNullAnySchema.nullish(),
    low_gte: definedNonNullAnySchema.nullish(),
    low_in: z.array(definedNonNullAnySchema).nullish(),
    low_lt: definedNonNullAnySchema.nullish(),
    low_lte: definedNonNullAnySchema.nullish(),
    low_not: definedNonNullAnySchema.nullish(),
    low_not_in: z.array(definedNonNullAnySchema).nullish(),
    lpfees: definedNonNullAnySchema.nullish(),
    lpfees_gt: definedNonNullAnySchema.nullish(),
    lpfees_gte: definedNonNullAnySchema.nullish(),
    lpfees_in: z.array(definedNonNullAnySchema).nullish(),
    lpfees_lt: definedNonNullAnySchema.nullish(),
    lpfees_lte: definedNonNullAnySchema.nullish(),
    lpfees_not: definedNonNullAnySchema.nullish(),
    lpfees_not_in: z.array(definedNonNullAnySchema).nullish(),
    open: definedNonNullAnySchema.nullish(),
    open_gt: definedNonNullAnySchema.nullish(),
    open_gte: definedNonNullAnySchema.nullish(),
    open_in: z.array(definedNonNullAnySchema).nullish(),
    open_lt: definedNonNullAnySchema.nullish(),
    open_lte: definedNonNullAnySchema.nullish(),
    open_not: definedNonNullAnySchema.nullish(),
    open_not_in: z.array(definedNonNullAnySchema).nullish(),
    or: z.array(Swap_FilterSchema().nullable()).nullish(),
    pair: definedNonNullAnySchema.nullish(),
    pair_: Pair_FilterSchema().nullish(),
    pair_contains: definedNonNullAnySchema.nullish(),
    pair_contains_nocase: definedNonNullAnySchema.nullish(),
    pair_ends_with: definedNonNullAnySchema.nullish(),
    pair_ends_with_nocase: definedNonNullAnySchema.nullish(),
    pair_gt: definedNonNullAnySchema.nullish(),
    pair_gte: definedNonNullAnySchema.nullish(),
    pair_in: z.array(definedNonNullAnySchema).nullish(),
    pair_lt: definedNonNullAnySchema.nullish(),
    pair_lte: definedNonNullAnySchema.nullish(),
    pair_not: definedNonNullAnySchema.nullish(),
    pair_not_contains: definedNonNullAnySchema.nullish(),
    pair_not_contains_nocase: definedNonNullAnySchema.nullish(),
    pair_not_ends_with: definedNonNullAnySchema.nullish(),
    pair_not_ends_with_nocase: definedNonNullAnySchema.nullish(),
    pair_not_in: z.array(definedNonNullAnySchema).nullish(),
    pair_not_starts_with: definedNonNullAnySchema.nullish(),
    pair_not_starts_with_nocase: definedNonNullAnySchema.nullish(),
    pair_starts_with: definedNonNullAnySchema.nullish(),
    pair_starts_with_nocase: definedNonNullAnySchema.nullish(),
    slippage: definedNonNullAnySchema.nullish(),
    slippage_gt: definedNonNullAnySchema.nullish(),
    slippage_gte: definedNonNullAnySchema.nullish(),
    slippage_in: z.array(definedNonNullAnySchema).nullish(),
    slippage_lt: definedNonNullAnySchema.nullish(),
    slippage_lte: definedNonNullAnySchema.nullish(),
    slippage_not: definedNonNullAnySchema.nullish(),
    slippage_not_in: z.array(definedNonNullAnySchema).nullish(),
    timestamp: definedNonNullAnySchema.nullish(),
    timestamp_contains: definedNonNullAnySchema.nullish(),
    timestamp_contains_nocase: definedNonNullAnySchema.nullish(),
    timestamp_ends_with: definedNonNullAnySchema.nullish(),
    timestamp_ends_with_nocase: definedNonNullAnySchema.nullish(),
    timestamp_gt: definedNonNullAnySchema.nullish(),
    timestamp_gte: definedNonNullAnySchema.nullish(),
    timestamp_in: z.array(definedNonNullAnySchema).nullish(),
    timestamp_lt: definedNonNullAnySchema.nullish(),
    timestamp_lte: definedNonNullAnySchema.nullish(),
    timestamp_not: definedNonNullAnySchema.nullish(),
    timestamp_not_contains: definedNonNullAnySchema.nullish(),
    timestamp_not_contains_nocase: definedNonNullAnySchema.nullish(),
    timestamp_not_ends_with: definedNonNullAnySchema.nullish(),
    timestamp_not_ends_with_nocase: definedNonNullAnySchema.nullish(),
    timestamp_not_in: z.array(definedNonNullAnySchema).nullish(),
    timestamp_not_starts_with: definedNonNullAnySchema.nullish(),
    timestamp_not_starts_with_nocase: definedNonNullAnySchema.nullish(),
    timestamp_starts_with: definedNonNullAnySchema.nullish(),
    timestamp_starts_with_nocase: definedNonNullAnySchema.nullish(),
    volume: definedNonNullAnySchema.nullish(),
    volume_gt: definedNonNullAnySchema.nullish(),
    volume_gte: definedNonNullAnySchema.nullish(),
    volume_in: z.array(definedNonNullAnySchema).nullish(),
    volume_lt: definedNonNullAnySchema.nullish(),
    volume_lte: definedNonNullAnySchema.nullish(),
    volume_not: definedNonNullAnySchema.nullish(),
    volume_not_in: z.array(definedNonNullAnySchema).nullish()
  })
}

export function TokenSchema(): z.ZodObject<Properties<Token>> {
  return z.object({
    __typename: z.literal('Token').optional(),
    decimals: definedNonNullAnySchema,
    id: definedNonNullAnySchema,
    name: definedNonNullAnySchema,
    symbol: definedNonNullAnySchema
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
    id_gt: definedNonNullAnySchema.nullish(),
    id_gte: definedNonNullAnySchema.nullish(),
    id_in: z.array(definedNonNullAnySchema).nullish(),
    id_lt: definedNonNullAnySchema.nullish(),
    id_lte: definedNonNullAnySchema.nullish(),
    id_not: definedNonNullAnySchema.nullish(),
    id_not_in: z.array(definedNonNullAnySchema).nullish(),
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

export function _Block_Schema(): z.ZodObject<Properties<_Block_>> {
  return z.object({
    __typename: z.literal('_Block_').optional(),
    hash: definedNonNullAnySchema.nullish(),
    number: definedNonNullAnySchema,
    timestamp: definedNonNullAnySchema.nullish()
  })
}

export function _Meta_Schema(): z.ZodObject<Properties<_Meta_>> {
  return z.object({
    __typename: z.literal('_Meta_').optional(),
    block: _Block_Schema(),
    deployment: definedNonNullAnySchema,
    hasIndexingErrors: definedNonNullAnySchema
  })
}

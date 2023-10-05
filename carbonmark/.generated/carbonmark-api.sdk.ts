/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Carbonmark REST API
 * 
Welcome to the API Reference docs for **version 2.0.0-6** of the Carbonmark REST API. Use this API to view assets, prices, supply, activity and more.
## Quick start
Be sure to prefix a version number, otherwise your application will be exposed to breaking changes.

~~~ts
const res = await fetch("https://v1.api.carbonmark.com/projects");
const projects = await res.json();
~~~

For a developer guides and example implementations, or to learn more about Carbonmark and Digital Carbon Market, view our product knowledge base at <a href="https://docs.carbonmark.com">docs.carbonmark.com</a>.
## 

 * OpenAPI spec version: 2.0.0-6
 */
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import useSwr from 'swr'
import type {
  SWRConfiguration,
  Key
} from 'swr'
import type {
  GetCategories200Item,
  GetCountries200Item,
  GetProjects200Item,
  GetProjectsParams,
  GetUsersWalletOrHandle200,
  GetUsersWalletOrHandleParams,
  PostUsers200,
  PostUsersBody,
  PutUsersWallet200,
  PutUsersWalletBody,
  GetProjectsId200,
  GetProjectsIdParams,
  GetPurchasesId200,
  GetPurchasesIdParams,
  PostUsersLogin200,
  PostUsersLoginBody,
  PostUsersLoginVerify200,
  PostUsersLoginVerifyBody
} from './carbonmark-api.sdk.schemas'


  
  /**
 * A list of all methodology categories used to delineate every project in the marketplace. A project may belong to one or more of these categories.
 * @summary Categories
 */
export const getCategories = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetCategories200Item[]>> => {
    return axios.get(
      `/categories`,options
    );
  }


export const getGetCategoriesKey = () => [`/categories`] as const;

    
export type GetCategoriesQueryResult = NonNullable<Awaited<ReturnType<typeof getCategories>>>
export type GetCategoriesQueryError = AxiosError<unknown>

/**
 * @summary Categories
 */
export const useGetCategories = <TError = AxiosError<unknown>>(
  options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getCategories>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }

  ) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetCategoriesKey() : null);
  const swrFn = () => getCategories(axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}


/**
 * Retrieve an array containing the countries that carbon projects originate from
 * @summary Countries
 */
export const getCountries = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetCountries200Item[]>> => {
    return axios.get(
      `/countries`,options
    );
  }


export const getGetCountriesKey = () => [`/countries`] as const;

    
export type GetCountriesQueryResult = NonNullable<Awaited<ReturnType<typeof getCountries>>>
export type GetCountriesQueryError = AxiosError<unknown>

/**
 * @summary Countries
 */
export const useGetCountries = <TError = AxiosError<unknown>>(
  options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getCountries>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }

  ) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetCountriesKey() : null);
  const swrFn = () => getCountries(axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}


/**
 * Retrieve an array of carbon projects filtered by desired query parameters
 * @summary List projects
 */
export const getProjects = (
    params?: GetProjectsParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetProjects200Item[]>> => {
    return axios.get(
      `/projects`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetProjectsKey = (params?: GetProjectsParams,) => [`/projects`, ...(params ? [params]: [])] as const;

    
export type GetProjectsQueryResult = NonNullable<Awaited<ReturnType<typeof getProjects>>>
export type GetProjectsQueryError = AxiosError<unknown>

/**
 * @summary List projects
 */
export const useGetProjects = <TError = AxiosError<unknown>>(
 params?: GetProjectsParams, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getProjects>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }

  ) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetProjectsKey(params) : null);
  const swrFn = () => getProjects(params, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}


/**
 * Get a user's profile and activity
 * @summary User details
 */
export const getUsersWalletOrHandle = (
    walletOrHandle: string,
    params?: GetUsersWalletOrHandleParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetUsersWalletOrHandle200>> => {
    return axios.get(
      `/users/${walletOrHandle}`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetUsersWalletOrHandleKey = (walletOrHandle: string,
    params?: GetUsersWalletOrHandleParams,) => [`/users/${walletOrHandle}`, ...(params ? [params]: [])] as const;

    
export type GetUsersWalletOrHandleQueryResult = NonNullable<Awaited<ReturnType<typeof getUsersWalletOrHandle>>>
export type GetUsersWalletOrHandleQueryError = AxiosError<unknown>

/**
 * @summary User details
 */
export const useGetUsersWalletOrHandle = <TError = AxiosError<unknown>>(
 walletOrHandle: string,
    params?: GetUsersWalletOrHandleParams, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getUsersWalletOrHandle>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }

  ) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(walletOrHandle)
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetUsersWalletOrHandleKey(walletOrHandle,params) : null);
  const swrFn = () => getUsersWalletOrHandle(walletOrHandle,params, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}


/**
 * @summary Create user profile
 */
export const postUsers = (
    postUsersBody: PostUsersBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<PostUsers200>> => {
    return axios.post(
      `/users`,
      postUsersBody,options
    );
  }



/**
 * @summary Update user profile
 */
export const putUsersWallet = (
    wallet: string,
    putUsersWalletBody: PutUsersWalletBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<PutUsersWallet200>> => {
    return axios.put(
      `/users/${wallet}`,
      putUsersWalletBody,options
    );
  }



/**
 * Retrieve an array of the vintages of available carbon projects
 * @summary Vintages
 */
export const getVintages = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<string[]>> => {
    return axios.get(
      `/vintages`,options
    );
  }


export const getGetVintagesKey = () => [`/vintages`] as const;

    
export type GetVintagesQueryResult = NonNullable<Awaited<ReturnType<typeof getVintages>>>
export type GetVintagesQueryError = AxiosError<unknown>

/**
 * @summary Vintages
 */
export const useGetVintages = <TError = AxiosError<unknown>>(
  options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getVintages>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }

  ) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetVintagesKey() : null);
  const swrFn = () => getVintages(axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}


/**
 * Retrieve a carbon project by its project ID
 * @summary Project details
 */
export const getProjectsId = (
    id: string,
    params?: GetProjectsIdParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetProjectsId200>> => {
    return axios.get(
      `/projects/${id}`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetProjectsIdKey = (id: string,
    params?: GetProjectsIdParams,) => [`/projects/${id}`, ...(params ? [params]: [])] as const;

    
export type GetProjectsIdQueryResult = NonNullable<Awaited<ReturnType<typeof getProjectsId>>>
export type GetProjectsIdQueryError = AxiosError<unknown>

/**
 * @summary Project details
 */
export const useGetProjectsId = <TError = AxiosError<unknown>>(
 id: string,
    params?: GetProjectsIdParams, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getProjectsId>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }

  ) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetProjectsIdKey(id,params) : null);
  const swrFn = () => getProjectsId(id,params, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}


/**
 * Retrieve the details of a purchase by its ID (transaction hash)
 * @summary Purchase details
 */
export const getPurchasesId = (
    id: string,
    params: GetPurchasesIdParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetPurchasesId200>> => {
    return axios.get(
      `/purchases/${id}`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetPurchasesIdKey = (id: string,
    params: GetPurchasesIdParams,) => [`/purchases/${id}`, ...(params ? [params]: [])] as const;

    
export type GetPurchasesIdQueryResult = NonNullable<Awaited<ReturnType<typeof getPurchasesId>>>
export type GetPurchasesIdQueryError = AxiosError<unknown>

/**
 * @summary Purchase details
 */
export const useGetPurchasesId = <TError = AxiosError<unknown>>(
 id: string,
    params: GetPurchasesIdParams, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getPurchasesId>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }

  ) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetPurchasesIdKey(id,params) : null);
  const swrFn = () => getPurchasesId(id,params, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}


/**
 * Provides the user with a nonce to be included in the next signature. Consumed by /verify endpoint.
 * @summary Get nonce
 */
export const postUsersLogin = (
    postUsersLoginBody: PostUsersLoginBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<PostUsersLogin200>> => {
    return axios.post(
      `/users/login`,
      postUsersLoginBody,options
    );
  }



/**
 * Provide a signed hash to receive a JWT token to be consumed by PUT or POST requests.
 * @summary Verify signed data
 */
export const postUsersLoginVerify = (
    postUsersLoginVerifyBody: PostUsersLoginVerifyBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<PostUsersLoginVerify200>> => {
    return axios.post(
      `/users/login/verify`,
      postUsersLoginVerifyBody,options
    );
  }



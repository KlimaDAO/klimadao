import { getUsersWalletorhandle } from ".generated/carbonmark-api-sdk/clients";
import { User } from ".generated/carbonmark-api-sdk/types";
import { PageProps, Users } from "components/pages/Users";
import { isAddress } from "ethers-v6";
import { VALID_HANDLE_REGEX } from "lib/constants";
import { loadTranslation } from "lib/i18n";
import { getAddressByDomain } from "lib/shared/getAddressByDomain";
import { getIsDomainInURL } from "lib/shared/getIsDomainInURL";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  user: string;
}

type UserType = "address" | "domain" | "handle";

/**
 * Validates the user param and returns the type, otherwise throws if invalid
 * */
const getUserType = (user: string): UserType => {
  if (isAddress(user)) return "address";
  if (VALID_HANDLE_REGEX.test(user)) return "handle";
  if (getIsDomainInURL(user)) return "domain";
  throw new Error(
    `Param '${user}' is invalid. Must be handle, address, or domain.`
  );
};

/**
 * Attempts to resolve a valid 0x address string to a user handle.
 * Redirects if handle is found, otherwise render empty page props.
 * */
const resolveAddress = async (params: { address: string; locale?: string }) => {
  let carbonmarkUser: User | null = null;
  try {
    carbonmarkUser = await getUsersWalletorhandle(params.address);
  } catch (e) {
    if (e.data.statusCode !== 404) {
      throw e;
    } else {
      console.error(e.message);
    }
  }

  // Handle urls are canonical & more user friendly, redirect if possible
  if (carbonmarkUser?.handle) {
    return {
      redirect: {
        destination: `/users/${carbonmarkUser.handle}`,
        permanent: true,
      },
    };
  }
  const translation = await loadTranslation(params.locale);
  if (!translation) {
    throw new Error("No translation found");
  }
  return {
    props: {
      userAddress: params.address,
      userDomain: null,
      carbonmarkUser, // may be null -- all we need is a valid address
      translation,
      fixedThemeName: "theme-light",
    },
    revalidate: 10,
  };
};

/**
 * Attempts to resolve a valid KNS or ENS domain. Throws if domain can't be resolved.
 * */
const resolveDomain = async (params: { domain: string; locale?: string }) => {
  // sad path: this throws and is caught by parent -> 404
  const address = await getAddressByDomain(params.domain);
  return resolveAddress({ address, locale: params.locale });
};

/**
 * Attempts to resolve a valid user handle. Throws if handle can't be resolved.
 * */
const resolveHandle = async (params: { handle: string; locale?: string }) => {
  let carbonmarkUser: User | null = null;
  try {
    carbonmarkUser = await getUsersWalletorhandle(params.handle);
  } catch (e) {
    if (e.data.statusCode !== 404) {
      throw e;
    } else {
      console.error(e.message);
    }
  }

  if (!carbonmarkUser?.wallet) {
    throw new Error(`${params.handle} could not be resolved`);
  }

  const translation = await loadTranslation(params.locale);
  if (!translation) {
    throw new Error("No translation found");
  }

  return {
    props: {
      userAddress: carbonmarkUser.wallet,
      userDomain: null,
      carbonmarkUser,
      translation,
      fixedThemeName: "theme-light",
    },
    revalidate: 10,
  };
};

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  console.log("WHATU")
  const { params, locale } = ctx;
  if (!params || !params?.user) {
    throw new Error("No matching params found");
  }

  try {
    const userType = getUserType(params.user);

    switch (userType) {
      case "address":
        return resolveAddress({ address: params.user, locale });
      case "domain":
        return resolveDomain({ domain: params.user, locale });
      case "handle":
        return resolveHandle({ handle: params.user, locale });
    }
  } catch (e) {
    console.error("Failed to generate Carbonmark Users Page", e);
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Users;

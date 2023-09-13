import { isAddress } from "ethers-v6";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { PageProps, Users } from "components/pages/Users";
import { loadTranslation } from "lib/i18n";
import { getAddressByDomain } from "lib/shared/getAddressByDomain";
import { getIsDomainInURL } from "lib/shared/getIsDomainInURL";

import { client } from "lib/api/client";
import { User } from "lib/types/carbonmark";

interface Params extends ParsedUrlQuery {
  user: string;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  const { params, locale } = ctx;

  if (!params || !params?.user) {
    throw new Error("No matching params found");
  }

  try {
    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    const userInUrl = params.user;
    const isDomainInURL = getIsDomainInURL(userInUrl);
    const isValidAddress = !isDomainInURL && isAddress(userInUrl);

    let carbonmarkUser: User | null = null;

    if (!isDomainInURL && !isValidAddress) {
      const response = await client["/users/{walletOrHandle}"].get({
        query: { type: "handle" },
        params: { walletOrHandle: params.user },
      });
      if (response.ok) {
        carbonmarkUser = await response.json();
      } else {
        throw new Error("Not a valid user address");
      }
    }

    let userAddress: string;
    if (isDomainInURL) {
      userAddress = await getAddressByDomain(userInUrl); // this fn should throw if it fails to resolve
    } else {
      userAddress = carbonmarkUser?.wallet || userInUrl;
    }

    // Haven't fetched carbonmark API yet?
    if (!carbonmarkUser) {
      const response = await client["/users/{walletOrHandle}"].get({
        params: {
          walletOrHandle: userAddress,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        return {
          redirect: {
            destination: `/users/${userData?.handle}`,
            permanent: true,
          },
        };
      }
    }

    return {
      props: {
        userAddress,
        userDomain: isDomainInURL ? userInUrl : null,
        carbonmarkUser,
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: 10,
    };
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

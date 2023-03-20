import { ethers } from "ethers";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { Users } from "components/pages/Users";
import { loadTranslation } from "lib/i18n";
import { getAddressByDomain } from "lib/shared/getAddressByDomain";
import { getIsDomainInURL } from "lib/shared/getIsDomainInURL";

import { getCarbonmarkUser } from "lib/carbonmark";
import { User } from "lib/types/carbonmark";

interface Params extends ParsedUrlQuery {
  user: string;
}

interface PageProps {
  userAddress: string;
  userDomain: string | null;
  carbonmarkUser: User | null;
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
    const isValidAddress = !isDomainInURL && ethers.utils.isAddress(userInUrl);

    let carbonmarkUser: User | null = null;

    if (!isDomainInURL && !isValidAddress) {
      const userData = await getCarbonmarkUser({
        user: params.user,
        type: "handle",
      });
      // API returns object on 404 not found
      if (userData?.handle) {
        carbonmarkUser = userData;
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
      const userData = await getCarbonmarkUser({
        user: userAddress,
        type: "wallet",
      });
      if (userData?.handle) {
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

import { concatAddress } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { useConnectedUser } from "hooks/useConnectedUser";
import { fetcher } from "lib/fetcher";
import { User } from "lib/types/carbonmark.types";
import { NextPage } from "next";
import { SWRConfig } from "swr";
import { SellerConnected } from "./SellerConnected";
import { SellerUnconnected } from "./SellerUnconnected";

export type PageProps = {
  userAddress: string;
  userDomain: string | null;
  carbonmarkUser: User | null;
};

const Page: NextPage<PageProps> = (props) => {
  const { isConnectedUser, isUnconnectedUser } = useConnectedUser(
    props.userAddress
  );

  const userName =
    props.userDomain || props.carbonmarkUser?.handle || props.userAddress;

  return (
    <>
      <PageHead
        title={t`${
          props.carbonmarkUser?.handle || concatAddress(props.userAddress)
        } | Profile | Carbonmark`}
        mediaTitle={`${
          props.carbonmarkUser?.handle || concatAddress(props.userAddress)
        }'s Profile on Carbonmark`}
        metaDescription={t`Create and edit listings, and track your activity with your Carbonmark profile.`}
      />

      <Layout userAddress={props.userAddress}>
        {isConnectedUser && (
          <SellerConnected
            userAddress={props.userAddress}
            userName={userName}
          />
        )}

        {isUnconnectedUser && (
          <SellerUnconnected
            user={props.carbonmarkUser}
            userAddress={props.userAddress}
            userName={userName}
          />
        )}
      </Layout>
    </>
  );
};

export const Users: NextPage<PageProps> = (props) => (
  <SWRConfig
    value={{
      fetcher,
      fallback: {
        [`/users/${props.userAddress}`]: props.carbonmarkUser,
      },
    }}
  >
    <Page {...props} />
  </SWRConfig>
);
// export const Users: NextPage<PageProps> = (props) => {
//   const { networkLabel } = useWeb3();
//   return (
//     <SWRConfig
//       value={{
//         fetcher,
//         fallback: {
//           [fetchUserURL({
//             params: {
//               walletOrHandle: props.userAddress,
//             },
//             query: { network: networkLabel },
//           })]: props.carbonmarkUser,
//         },
//       }}
//     >
//       <Page {...props} />
//     </SWRConfig>
//   );
// };

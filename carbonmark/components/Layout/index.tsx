import { ClassNamesArg, cx } from "@emotion/css";
import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { InvalidNetworkModal } from "components/shared/InvalidNetworkModal";
import { getConnectErrorStrings } from "lib/constants";
import { FC, ReactNode, useState } from "react";
import "tippy.js/dist/tippy.css";
import { Footer } from "../Footer";
import { TopMenu } from "./TopMenu";
import * as styles from "./styles";

// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

// const ThemeToggle = dynamic(() => import("../shared/ThemeToggle"), {
//   ssr: false,
// });

type Props = {
  userAddress?: string;
  children: ReactNode;
  customCss?: ClassNamesArg;
  fullContentWidth?: boolean;
  fullContentHeight?: boolean;
};

/** App layout for desktop side-panel and mobile navigation */
export const Layout: FC<Props> = (props: Props) => {
  const { renderModal } = useWeb3();
  const [showMobileMenu] = useState(false);
  return (
    <>
      <main
        className={cx(styles.container, styles.global)}
        data-scroll-lock={showMobileMenu}
      >
        <TopMenu userAddress={props.userAddress} />
        <div
          className={cx(styles.layoutChildrenContainer, props.customCss, {
            fullContentWidth: props.fullContentWidth,
          })}
        >
          {props.children}
        </div>
        {!props.fullContentHeight && <Footer />}
      </main>
      <InvalidNetworkModal />
      {renderModal &&
        renderModal({
          errors: getConnectErrorStrings(),
          torusText: t({
            message: "social or email",
            id: "connectModal.torus",
          }),
          walletText: t({
            message: "connect a wallet",
            id: "connectModal.wallet",
          }),
          titles: {
            connect: t`Login`,
            loading: t({
              id: "connect_modal.connecting",
              message: "Connecting...",
            }),
            error: t({
              id: "connect_modal.error_title",
              message: "Connection Error",
            }),
          },
        })}
    </>
  );
};

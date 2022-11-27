import { FC, ReactNode } from "react";

import { InvalidNetworkModal } from "components/InvalidNetworkModal";
import { HeaderDesktop } from "../HeaderDesktop";
import { HeaderMobile } from "../HeaderMobile";
import * as styles from "./styles";

type Props = {
  canEditPledge?: boolean;
  toggleEditModal?: (bool: boolean) => void;
  children: ReactNode;
};

export const PledgeLayout: FC<Props> = (props) => {
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.headerContainer}>
          <HeaderMobile
            canEditPledge={props.canEditPledge}
            toggleEditModal={props.toggleEditModal}
          />

          <HeaderDesktop
            canEditPledge={props.canEditPledge}
            toggleEditModal={props.toggleEditModal}
          />
        </div>

        {props.children}
      </div>

      <InvalidNetworkModal />
    </>
  );
};

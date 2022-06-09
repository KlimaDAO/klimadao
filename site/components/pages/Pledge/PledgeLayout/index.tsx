import React, { FC } from "react";

import { HeaderDesktop } from "../HeaderDesktop";
import { HeaderMobile } from "../HeaderMobile";
import * as styles from "./styles";

type Props = {
  canEditPledge?: boolean;
  toggleEditModal?: (bool: boolean) => void;
};

export const PledgeLayout: FC<Props> = (props) => {
  return (
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
  );
};

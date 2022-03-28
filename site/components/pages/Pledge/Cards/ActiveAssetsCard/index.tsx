import React, { FC } from "react";
import Image from "next/image";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { Text } from "@klimadao/lib/components";

import BCTIcon from "public/icon-bct.png";
import KlimaIcon from "public/icon-klima.png";
import MCO2Icon from "public/icon-mco2.png";

import { BaseCard } from "../BaseCard";
import * as styles from "./styles";

// type Props = {};

export const ActiveAssetsCard: FC = () => (
  <BaseCard title="Carbon Assets" icon={<CloudQueueIcon fontSize="large" />}>
    <div className={styles.tokenRow}>
      <Image height={48} width={48} src={KlimaIcon} alt="Klima" />
      <div className={styles.tokenHoldings}>
        <Text t="caption">Holding</Text>
        <div>
          <Text t="h4" as="span">
            400{" "}
          </Text>
          <Text t="h4" as="span" color="lightest" uppercase>
            Klima
          </Text>
        </div>
      </div>
    </div>

    <div className={styles.divider} />

    <div className={styles.tokenRow}>
      <Image height={48} width={48} src={MCO2Icon} alt="MCO2" />
      <div className={styles.tokenHoldings}>
        <Text t="caption">Holding</Text>
        <div>
          <Text t="h4" as="span">
            100{" "}
          </Text>
          <Text t="h4" as="span" color="lightest" uppercase>
            MCO2
          </Text>
        </div>
      </div>
    </div>

    <div className={styles.divider} />

    <div className={styles.tokenRow}>
      <Image height={48} width={48} src={BCTIcon} alt="BCT" />
      <div className={styles.tokenHoldings}>
        <Text t="caption">Holding</Text>
        <div>
          <Text t="h4" as="span">
            100{" "}
          </Text>
          <Text t="h4" as="span" color="lightest" uppercase>
            BCT
          </Text>
        </div>
      </div>
    </div>
  </BaseCard>
);

import { urls } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";
import { Button } from "@mui/material";
import Link from "components/Link";
import { FC } from "react";
import styles from "./styles.module.scss";

export const ExploreMarketplaceButton: FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <Link href={urls.marketplace}>
      <Button className={`${styles.exploreMarketplaceButton} ${className}`}>
        {t`Explore Marketplace`}
      </Button>
    </Link>
  );
};

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import classNames from "classnames";
import { RootState } from "state";
import { selectAppState } from "state/selectors";

import styles from "./index.module.css";
import t from "@klimadao/lib/theme/typography.module.css";
import { Bond } from "@klimadao/lib/constants";
import { trimWithPlaceholder } from "@klimadao/lib/utils";

export const useBond = (bond: Bond) => {
  const bondState = useSelector((state: RootState) => {
    return state.bonds[bond];
  });

  return {
    price: bondState?.bondPrice,
    discount: bondState?.bondDiscount,
    name: {
      bct: "BCT",
      klima_bct_lp: "BCT/KLIMA LP",
      bct_usdc_lp: "BCT/USDC LP",
      // future bond names go here
    }[bond],
    description: {
      bct: "Base Carbon Tons (Verra Carbon Standard)",
      klima_bct_lp: "BCT/KLIMA Sushiswap LP Bonds",
      bct_usdc_lp: "BCT/USDC Sushiswap LP Bonds",
      // future bond descriptions go here
    }[bond],
    href: {
      bct: "/bonds/bct",
      klima_bct_lp: "/bonds/klima_bct_lp",
      bct_usdc_lp: "/bonds/bct_usdc_lp",
      // future bond hrefs go here
    }[bond],
  };
};

export function ChooseBond() {
  const bct = useBond("bct");
  const klimaBctLp = useBond("klima_bct_lp");
  const bctUsdcLp = useBond("bct_usdc_lp");
  const { treasuryBalance } = useSelector(selectAppState);

  const bonds = [bct, klimaBctLp, bctUsdcLp];

  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>Bond Carbon.</h2>
        <p className={t.body2}>
          The best way to buy KLIMA. Commit carbon to our treasury, and receive
          KLIMA at a discount. All bonds have a mandatory 5-day vesting period.
        </p>
      </div>

      <div className={styles.data_container}>
        <div className={styles.data_column}>
          <p className={classNames(styles.data_column_label, t.overline)}>
            Treasury Balance
          </p>
          <p className={classNames("price-data")}>
            <span className={t.h6}>
              {trimWithPlaceholder(treasuryBalance, 0)}
            </span>
            {treasuryBalance ? " T CO2" : ""}
          </p>
        </div>
      </div>
      <div className={styles.bondList}>
        <div className={styles.bondList_columnTitle}>
          <h2 className={t.overline}>Choose a bond:</h2>
          <p className={t.overline} style={{ opacity: 0.7 }}>
            % Discount
          </p>
        </div>

        {bonds.map((bond) => (
          <Link to={bond.href} key={bond.href}>
            <div className={styles.bondLink} key={bond.name}>
              <div>
                <h3 className={t.subtitle2}>{bond.name}</h3>
                <p
                  className={classNames(styles.bondLink_description, t.caption)}
                >
                  {bond.description}
                </p>
              </div>
              <p
                className={styles.bondROI}
                data-hide={!bond?.discount || bond.discount < 0}
              >
                {trimWithPlaceholder(bond?.discount, 2)}
                {bond.discount ? "%" : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ChooseBond;

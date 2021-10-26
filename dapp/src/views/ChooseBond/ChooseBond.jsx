import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import React from "react";
import classNames from "classnames";
import styles from "./ChooseBond.module.css";
import t from "../../styles/typography.module.css";
import { useBond } from "../../hooks/useBond";
import { abi as ierc20Abi } from "../../abi/IERC20.json";
import { trimWithPlaceholder } from "../../helpers";

function ChooseBond({ provider }) {
  const bct = useBond("bct");
  const bct_lp = useBond("klima_bct_lp");
  const bct_usdc_lp = useBond("bct_usdc_lp");
  const treasuryBalance = useSelector(state => state.app.treasuryBalance);
  const bonds = [bct, bct_lp, bct_usdc_lp];

  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>Bond Carbon.</h2>
        <p className={t.body2}>
          The best way to buy KLIMA. Commit carbon to our treasury, and receive KLIMA at a discount. All bonds have a
          mandatory 5-day vesting period.
        </p>
      </div>

      <div className={styles.data_container}>
        <div className={styles.data_column}>
          <p className={classNames(styles.data_column_label, t.overline)}>Treasury Balance</p>
          <p className={classNames("price-data")}>
            <span className={t.h6}>{trimWithPlaceholder(treasuryBalance, 0)}</span>
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

        {bonds.map(bond => (
          <Link to={bond.href}>
            <div to={bond.href} className={styles.bondLink} key={bond.name}>
              <div>
                <h3 className={t.subtitle2}>{bond.name}</h3>
                <p className={classNames(styles.bondLink_description, t.caption)}>{bond.description}</p>
              </div>
              <p className={styles.bondROI} data-hide={bond.discount * 100 < 0}>
                {trimWithPlaceholder(bond.discount * 100, 2)}
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

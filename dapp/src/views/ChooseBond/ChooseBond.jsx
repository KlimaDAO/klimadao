import { Link } from "react-router-dom";
import React from "react";
import classNames from "classnames";
import styles from "./ChooseBond.module.css";
import t from "../../styles/typography.module.css";
import { useBond } from "../../hooks/useBond";

function ChooseBond() {
  const bct = useBond("bct");
  const bct_lp = useBond("klima_bct_lp");
  const bct_usdc_lp = useBond("bct_usdc_lp");

  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>Bond Carbon.</h2>
        <p className={t.body2}>
          The best way to buy KLIMA. Commit carbon to our treasury, and receive KLIMA at a discount. All
          bonds have a mandatory 5-day vesting period.
        </p>
      </div>

      <div className={styles.data_container}>
        <div className={styles.data_column}>
          <p className={classNames(styles.data_column_label, t.overline)}>Treasury Balance</p>
          <p className="price-data">{"<coming soon>"}</p>
        </div>
        <div className={styles.data_column}>
          <p className={classNames(styles.data_column_label, t.overline)}>KLIMA Price</p>
          <p className="price-data">{"<coming soon>"}</p>
        </div>
      </div>
      <div className={styles.bondList}>
        <h2 className={t.overline}>Choose a bond:</h2>
        <Link to={bct_lp.href}>
          <div className={styles.bondLink} key={bct_lp.name}>
            <h3 className={t.subtitle2}>{bct_lp.name}</h3>
            <p className={classNames(styles.bondLink_description, t.caption)}>{bct_lp.description}</p>
          </div>
        </Link>
        <Link to={bct_usdc_lp.href}>
          <div to={bct_usdc_lp.href} className={styles.bondLink} key={bct_usdc_lp.name}>
            <h3 className={t.subtitle2}>{bct_usdc_lp.name}</h3>
            <p className={classNames(styles.bondLink_description, t.caption)}>{bct_usdc_lp.description}</p>
          </div>
        </Link>
        <Link to={bct.href}>
          <div to={bct.href} className={styles.bondLink} key={bct.name}>
            <h3 className={t.subtitle2}>{bct.name}</h3>
            <p className={classNames(styles.bondLink_description, t.caption)}>{bct.description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ChooseBond;

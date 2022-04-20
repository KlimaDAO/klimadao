import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "state";
import { selectAppState, selectLocale } from "state/selectors";
import { Bond } from "@klimadao/lib/constants";
import { trimWithPlaceholder } from "@klimadao/lib/utils";
import { ImageCard } from "components/ImageCard";
import { Trans, t } from "@lingui/macro";
import { Text } from "@klimadao/lib/components";
import * as styles from "./styles";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import { Image } from "components/Image";

export const useBond = (bond: Bond) => {
  const bondState = useSelector((state: RootState) => {
    return state.bonds[bond];
  });

  const bondPrice = bondState?.bondPrice;
  const bondFee = bondState?.fee;

  const disabledBonds = {
    mco2: false,
    bct: false,
    klima_usdc_lp: false,
    klima_bct_lp: false,
    bct_usdc_lp: true,
    klima_mco2_lp: false,
    // future bond names go here
  };
  let disabled = disabledBonds[bond];
  if (bondPrice && bondFee && parseFloat(bondPrice) < 1 + bondFee) {
    disabled = true;
  }

  return {
    price: bondPrice,
    discount: bondState?.bondDiscount,
    disabled: disabled,
    icon: {
      mco2: "/icons/MCO2.png",
      bct: "/icons/BCT.png",
      klima_bct_lp: "/icons/BCT-KLIMA-LP.png",
      klima_usdc_lp: "/icons/KLIMA-USDC-LP.png",
      bct_usdc_lp: "/icons/BCT-USDC-LP.png",
      klima_mco2_lp: "/icons/KLIMA-MCO2-LP.png",
      // future bond names go here
    }[bond],
    name: {
      mco2: "MCO2",
      bct: "BCT",
      klima_usdc_lp: "KLIMA/USDC LP",
      klima_bct_lp: "KLIMA/BCT LP",
      bct_usdc_lp: "BCT/USDC LP",
      klima_mco2_lp: "KLIMA/MCO2 LP",
      // future bond names go here
    }[bond],
    description: {
      mco2: t({
        id: "choose_bond.mco2.moss_carbon_credit_token",
        message: "MOSS Carbon Credit Token",
      }),
      bct: t({
        id: "choose_bond.bct.toucan_base_carbon_tonne",
        message: "Toucan Base Carbon Tonne",
      }),
      klima_usdc_lp: t({
        id: "choose_bond.klima_usdc_lp.klima_usdc_sushiswap_liquidity",
        message: "KLIMA/USDC Sushiswap Liquidity",
      }),
      klima_bct_lp: t({
        id: "choose_bond.klima_bct_lp.klima_bct_sushiswap_liquidity",
        message: "KLIMA/BCT Sushiswap Liquidity",
      }),
      bct_usdc_lp: t({
        id: "choose_bond.usdc_lp.bct_usdc_sushiswap_liquidity",
        message: "BCT/USDC Sushiswap Liquidity",
      }),
      klima_mco2_lp: t({
        id: "choose_bond.mco2_lp.klima_mco2_quickswap_liquidity",
        message: "KLIMA/MCO2 Quickswap Liquidity",
      }),
      // future bond descriptions go here
    }[bond],
    href: {
      mco2: "/bonds/mco2",
      bct: "/bonds/bct",
      klima_usdc_lp: "/bonds/klima_usdc_lp",
      klima_bct_lp: "/bonds/klima_bct_lp",
      bct_usdc_lp: "/bonds/bct_usdc_lp",
      klima_mco2_lp: "/bonds/klima_mco2_lp",
      // future bond hrefs go here
    }[bond],
    balanceUnit: {
      mco2: "MCO2",
      bct: "BCT",
      klima_usdc_lp: "SLP",
      klima_bct_lp: "SLP",
      bct_usdc_lp: "SLP",
      klima_mco2_lp: "LP",
    }[bond],
    priceUnit: {
      mco2: "MCO2",
      bct: "BCT",
      klima_usdc_lp: "USDC",
      klima_bct_lp: "BCT",
      bct_usdc_lp: "BCT",
      klima_mco2_lp: "MCO2",
    }[bond],
  };
};

export function ChooseBond() {
  const locale = useSelector(selectLocale);

  const bct = useBond("bct");
  const klimaBctLp = useBond("klima_bct_lp");
  const bctUsdcLp = useBond("bct_usdc_lp");
  const mco2 = useBond("mco2");
  const klimaUsdcLp = useBond("klima_usdc_lp");
  const klimaMco2Lp = useBond("klima_mco2_lp");

  const { treasuryBalance } = useSelector(selectAppState);

  const bonds = [mco2, bct, klimaMco2Lp, klimaUsdcLp, klimaBctLp, bctUsdcLp];

  return (
    <>
      <div className={styles.chooseBondCard}>
        <div className={styles.chooseBondCard_header}>
          <Text t="h4" className={styles.chooseBondCard_header_title}>
            <SpaOutlined />
            <Trans id="choose_bond.bond_carbon">Bond Carbon</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans
              id="choose_bond.bond_carbon.the_best_way_to_buy_klima"
              comment="Long sentence"
            >
              The best way to buy KLIMA. Commit carbon to our treasury, and
              receive KLIMA at a discount. All bonds have a mandatory 5 day
              vesting period.
            </Trans>
          </Text>
        </div>

        <div className={styles.chooseBondCard_ui}>
          <div>
            <Text t="badge" color="lightest">
              <Trans id="choose_bond.treasury_balance">Treasury Balance</Trans>
            </Text>
            <Text>
              {trimWithPlaceholder(treasuryBalance, 0, locale)}
              {treasuryBalance ? " T CO2" : ""}
            </Text>
          </div>
          <div className={styles.bondList}>
            <div className={styles.bondList_columnTitle}>
              <Text t="caption" color="lighter">
                <Trans id="choose_bond.choose_bond">Choose a bond</Trans>
              </Text>
              <Text t="caption" color="lighter">
                <Trans id="choose_bond.percent_discount">% Discount</Trans>
              </Text>
            </div>

            {bonds.map((bond) => (
              <Link to={bond.href} key={bond.href}>
                <div className={styles.bondLink} key={bond.name}>
                  <div className="bondLink_imgContainer">
                    <Image src={bond.icon} alt="" width={64} height={64} />
                  </div>
                  <div>
                    <Text t="body1">{bond.name}</Text>
                    <Text t="caption" color="lightest">
                      {bond.description}
                    </Text>
                  </div>
                  {bond.disabled ? (
                    <Text
                      t="h5"
                      color="lightest"
                      className={styles.bondDiscount}
                    >
                      <Trans id="choose_bond.sold_out">SOLD OUT</Trans>
                    </Text>
                  ) : (
                    <Text
                      t="h5"
                      className={styles.bondDiscount}
                      data-hide={!bond?.discount || bond.discount < 0}
                    >
                      {trimWithPlaceholder(bond?.discount, 2, locale)}
                      {bond.discount ? "%" : ""}
                    </Text>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.columnRight}>
        <ImageCard />
      </div>
    </>
  );
}

export default ChooseBond;

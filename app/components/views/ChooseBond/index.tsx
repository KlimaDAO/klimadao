import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import { Bond } from "@klimadao/lib/constants";
import {
  BCTIcon,
  KLIMABCTLPIcon,
  KLIMAMCO2LPIcon,
  KLIMAUSDCLPIcon,
  MCO2Icon,
  NBOIcon,
  UBOIcon,
} from "@klimadao/lib/resources";
import { trimWithPlaceholder } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import { calcBondDetails, getIsInverse } from "actions/bonds";
import { DisclaimerModal } from "components/DisclaimerModal";
import { Image } from "components/Image";
import { ImageCard } from "components/ImageCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "state";
import { selectAppState, selectLocale } from "state/selectors";
import * as styles from "./styles";

// put inverse into bonds array and add to useBond

export const useBond = (bond: Bond) => {
  const bondState = useSelector((state: RootState) => {
    return state.bonds[bond];
  });

  const bondPrice = bondState?.bondPrice;
  const bondFee = bondState?.fee;

  const disabledBonds = {
    mco2: true,
    bct: true,
    klima_usdc_lp: true,
    klima_bct_lp: true,
    klima_mco2_lp: true,
    ubo: true,
    nbo: true,
    inverse_usdc: true,
  };

  if (getIsInverse(bond) && Number(bondState?.capacity) < 1) {
    // set to sold out if capacity reaches zero
    disabledBonds[bond] = true;
  } else if (
    !getIsInverse(bond) &&
    bondPrice &&
    bondFee &&
    parseFloat(bondPrice) < 1 + bondFee
  ) {
    disabledBonds[bond] = true;
  }

  return {
    price: bondPrice,
    discount: bondState?.bondDiscount,
    disabled: disabledBonds[bond],
    icon: {
      ubo: UBOIcon,
      nbo: NBOIcon,
      mco2: MCO2Icon,
      bct: BCTIcon,
      klima_bct_lp: KLIMABCTLPIcon,
      klima_usdc_lp: KLIMAUSDCLPIcon,
      klima_mco2_lp: KLIMAMCO2LPIcon,
      inverse_usdc: KLIMAUSDCLPIcon,
      // future bond names go here
    }[bond],
    name: {
      ubo: "UBO",
      nbo: "NBO",
      mco2: "MCO2",
      bct: "BCT",
      klima_usdc_lp: "KLIMA/USDC.e LP",
      klima_bct_lp: "KLIMA/BCT LP",
      klima_mco2_lp: "KLIMA/MCO2 LP",
      inverse_usdc: "KLIMA (inverse)",
      // future bond names go here
    }[bond] as Bond,
    description: {
      ubo: t({
        id: "choose_bond.ubo.description",
        message: "C3 Universal Basic Offset",
      }),
      nbo: t({
        id: "choose_bond.nbo.description",
        message: "C3 Nature Based Offset",
      }),
      mco2: t({
        id: "choose_bond.mco2.moss_carbon_credit_token",
        message: "MOSS Carbon Credit Token",
      }),
      bct: t({
        id: "choose_bond.bct.base_carbon_tonne",
        message: "Base Carbon Tonne",
      }),
      klima_usdc_lp: t({
        id: "choose_bond.klima_usdc_lp.klima_usdc_sushiswap_liquidity",
        message: "KLIMA/USDC.e Sushiswap Liquidity",
      }),
      klima_bct_lp: t({
        id: "choose_bond.klima_bct_lp.klima_bct_sushiswap_liquidity",
        message: "KLIMA/BCT Sushiswap Liquidity",
      }),
      klima_mco2_lp: t({
        id: "choose_bond.mco2_lp.klima_mco2_quickswap_liquidity",
        message: "KLIMA/MCO2 Quickswap Liquidity",
      }),
      inverse_usdc: t({
        id: "choose_bond.inverse_usdc",
        message: "Provide KLIMA, receive USDC.e",
      }),
      // future bond descriptions go here
    }[bond],
    href: {
      ubo: "/bonds/ubo",
      nbo: "/bonds/nbo",
      mco2: "/bonds/mco2",
      bct: "/bonds/bct",
      klima_usdc_lp: "/bonds/klima_usdc_lp",
      klima_bct_lp: "/bonds/klima_bct_lp",
      klima_mco2_lp: "/bonds/klima_mco2_lp",
      inverse_usdc: "/bonds/inverse_usdc",
      // future bond hrefs go here
    }[bond],
    balanceUnit: {
      ubo: "UBO",
      nbo: "NBO",
      mco2: "MCO2",
      bct: "BCT",
      klima_usdc_lp: "SLP",
      klima_bct_lp: "SLP",
      klima_mco2_lp: "LP",
      inverse_usdc: "KLIMA",
    }[bond],
    priceUnit: {
      ubo: "UBO",
      nbo: "NBO",
      mco2: "MCO2",
      bct: "BCT",
      klima_usdc_lp: "USDC.e",
      klima_bct_lp: "BCT",
      klima_mco2_lp: "MCO2",
      inverse_usdc: "KLIMA",
    }[bond],
    isInverse: {
      ubo: false,
      nbo: false,
      mco2: false,
      bct: false,
      klima_usdc_lp: false,
      klima_bct_lp: false,
      klima_mco2_lp: false,
      inverse_usdc: true,
    }[bond],
  };
};

export function ChooseBond() {
  const dispatch = useAppDispatch();
  const locale = useSelector(selectLocale);
  const inverse_usdc = useBond("inverse_usdc");
  const klimaBctLp = useBond("klima_bct_lp");
  const ubo = useBond("ubo");
  const nbo = useBond("nbo");
  const bct = useBond("bct");
  const mco2 = useBond("mco2");
  const klimaUsdcLp = useBond("klima_usdc_lp");
  const klimaMco2Lp = useBond("klima_mco2_lp");

  const { treasuryBalance } = useSelector(selectAppState);

  const bonds = [
    inverse_usdc,
    klimaBctLp,
    ubo,
    nbo,
    mco2,
    bct,
    klimaMco2Lp,
    klimaUsdcLp,
  ];

  useEffect(() => {
    bonds.forEach((bond) => {
      if (bond && !bond.disabled) {
        dispatch(
          calcBondDetails({
            bond: bond.name,
          })
        );
      }
    });
  }, []);

  return (
    <>
      <DisclaimerModal />
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
              receive KLIMA at a discount. All bonds (except inverse bonds) have
              a mandatory 5 day vesting period.
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
                <div
                  className={cx(styles.bondLink, {
                    disabled: !!bond.disabled,
                  })}
                  key={bond.name}
                >
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

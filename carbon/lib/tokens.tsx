import bctIcon from "@klimadao/app/public/icons/BCT.png";
import mco2Icon from "@klimadao/app/public/icons/MCO2.png";
import nboIcon from "@klimadao/app/public/icons/NBO.png";
import nctIcon from "@klimadao/app/public/icons/NCT.png";
import uboIcon from "@klimadao/app/public/icons/UBO.png";
import { t } from "@lingui/macro";
import OverviewCardIcon from "components/Graphics/OverviewCardIcon";
import { queryTokenInfo } from "./charts/queries";
import { Token } from "./charts/types";

/** Returns the translated version of a coin name */
export function getTokenFullName(token: Token) {
  if (token == "bct") return t`Base Carbon Tonne (BCT)`;
  if (token == "nct") return t`Nature Carbon Tonne (NCT)`;
  if (token == "mco2") return t`Moss Carbon Credit (MCO2)`;
  if (token == "ubo") return t`Universal Basic Offset (UBO)`;
  if (token == "nbo") return t`Nature Based Offset (NBO)`;
  return "";
}

/** Returns an Icon representing the given Coin */
export function getTokenIcon(token: Token) {
  let icon: typeof bctIcon = bctIcon;
  if (token == "nct") icon = nctIcon;
  if (token == "mco2") icon = mco2Icon;
  if (token == "ubo") icon = uboIcon;
  if (token == "nbo") icon = nboIcon;
  return <OverviewCardIcon icon={icon} alt={token} />;
}

/** Returns the helper text of the selective fee for the given Token */
export async function getTokenSelectiveFeeDescription(token: Token) {
  const tokenInfo = await queryTokenInfo(token);
  if (tokenInfo == undefined) return "";

  if (tokenInfo.fee_redeem_factor == 0)
    return t`There is no selective redemption/retirement functionality for ${tokenInfo.name}.`;
  return t`This cost includes the asset spot price + the ${tokenInfo.fee_redeem_factor.toFixed(
    2
  )}% fee to selectively redeem or retire an underlying carbon project charged by ${
    tokenInfo.bridge
  }`;
}

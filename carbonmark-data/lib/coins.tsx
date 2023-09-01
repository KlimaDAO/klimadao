import { t } from "@lingui/macro";
import bctIcon from "components/Graphics/bct.png";
import mco2Icon from "components/Graphics/mco2.png";
import nboIcon from "components/Graphics/nbo.png";
import nctIcon from "components/Graphics/nct.png";
import uboIcon from "components/Graphics/ubo.png";
import Image from "next/image";
import { Coin } from "./charts/types";

/** Returns the translated version of a coin title */
export function getCoinTitle(coin: Coin) {
    if (coin == "btc") return t`Base Carbon Tonne (BCT)`
    if (coin == "nct") return t`Nature Carbon Tonne (NCT)`
    if (coin == "mco2") return t`Moss Carbon Credit (MCO2)`
    if (coin == "ubo") return t`Universal Basic Offset (UBO)`
    if (coin == "nbo") return t`Nature Based Offset (UBO)`
    return "";
  }
  
  /** Returns an Icon representing the given Coin */
  export function getCoinIcon(coin: Coin) {
    let icon: typeof bctIcon = bctIcon;
    if (coin == "nct") icon = nctIcon
    if (coin == "mco2") icon = mco2Icon
    if (coin == "ubo") icon = uboIcon
    if (coin == "nbo") icon = nboIcon
    return (
    <Image
      src={icon}
      width={32}
      height={32}
      alt={`${coin} icon`}
    />)
  }
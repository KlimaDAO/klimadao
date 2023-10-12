import c3tIcon from "@klimadao/app/public/icons/C3T.png";
import mco2Icon from "@klimadao/app/public/icons/MCO2.png";
import tco2Icon from "@klimadao/app/public/icons/TCO2.png";
import { t } from "@lingui/macro";

import OverviewCardIcon from "components/Graphics/OverviewCardIcon";
import { Protocol } from "./charts/types";

/** Returns the translated version of a coin name */
export function getProtocolFullName(protocol: Protocol) {
  if (protocol == "c3t") return t`C3 Carbon Credit (C3T)`;
  if (protocol == "tco2") return t`Toucan Carbon Credit (TCO2)`;
  if (protocol == "mco2") return t`Moss Carbon Credit (MCO2)`;
  return "";
}

/** Returns an Icon representing the given protocol */
export function getProtocolIcon(protocol: Protocol) {
  let icon: typeof c3tIcon = c3tIcon;
  if (protocol == "tco2") icon = tco2Icon;
  if (protocol == "mco2") icon = mco2Icon;

  return <OverviewCardIcon icon={icon} alt={protocol} />;
}

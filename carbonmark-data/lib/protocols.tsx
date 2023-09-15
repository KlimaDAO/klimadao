import { t } from "@lingui/macro";
import c3tIcon from "components/Graphics/c3t.png";
import mco2Icon from "components/Graphics/mco2.png";
import tco2Icon from "components/Graphics/tco2.png";

import Image from "next/image";

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

  return <Image src={icon} width={32} height={32} alt={`${protocol} icon`} />;
}

import { Trans } from "@lingui/macro";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Text } from "components/Text";
import { urls } from "lib/constants";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { getPoolTokenType } from "lib/getPoolData";
import { carbonTokenInfoMap } from "lib/getTokenInfo";
import { createProjectTokenName } from "lib/projectGetter";
import { CarbonmarkPaymentMethod, Price, Project } from "lib/types/carbonmark";
import Image from "next/legacy/image";
import Link from "next/link";
import { FC } from "react";
import * as styles from "../styles";

type Props = {
  project: Project;
  totalPrice?: string;
  transactionHash: string | null;
  paymentMethod?: CarbonmarkPaymentMethod;
  address?: string;
  price: Price;
  quantity: string;
};

export const SuccessScreen: FC<Props> = (props) => {
  const tokenType = getPoolTokenType(props.price.name);
  const tokenData = carbonTokenInfoMap[tokenType];
  const projectTokenName = createProjectTokenName(props.project, tokenType);

  return (
    <div className={styles.successScreen}>
      <Text t="h5" className="headline">
        <CelebrationOutlinedIcon fontSize="inherit" />
        <Trans>You successfully acquired carbon!</Trans>
      </Text>
      <Text>
        View transaction on{" "}
        <a
          href={`${urls.blockExplorer}/tx/${props.transactionHash}`}
          target="_blank"
          rel="noreferrer"
        >
          PolygonScan
        </a>
        .
      </Text>
      <>
        <div className="summary">
          <Text t="body1" color="lighter">
            <Trans>Tokens received:</Trans>
          </Text>
          <div className={styles.iconAndText}>
            <div className="icon">
              <Image
                src={tokenData.icon}
                width={20}
                height={20}
                alt={tokenData.label}
              />
            </div>
            <Text t="h5">
              {props.quantity} {projectTokenName}
            </Text>
          </div>
        </div>

        <div className="summary">
          <Text t="body1" color="lighter">
            <Trans>Total sale cost</Trans>
          </Text>
          <div className={styles.iconAndText}>
            <div className="icon">
              <Image
                src={
                  carbonmarkPaymentMethodMap[props.paymentMethod || "usdc"].icon
                }
                width={20}
                height={20}
                alt={
                  carbonmarkPaymentMethodMap[props.paymentMethod || "usdc"].id
                }
              />
            </div>
            <Text t="h5">{props.totalPrice}</Text>
          </div>
        </div>

        <ButtonPrimary
          href={`/portfolio`}
          label={<Trans>See your portfolio</Trans>}
          renderLink={(linkProps) => <Link {...linkProps} />}
        />
        <CarbonmarkButton
          href={"/projects"}
          label={<Trans>Purchase more Carbon</Trans>}
        />
      </>
    </div>
  );
};

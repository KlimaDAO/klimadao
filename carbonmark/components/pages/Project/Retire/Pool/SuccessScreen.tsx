import { Trans } from "@lingui/macro";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Text } from "components/Text";
import { urls } from "lib/constants";
import { carbonmarkPaymentMethodMap } from "lib/getPaymentMethods";
import { CarbonmarkPaymentMethod, Project } from "lib/types/carbonmark";
import Image from "next/legacy/image";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  project: Project;
  totalPrice?: string;
  transactionHash: string | null;
  paymentMethod?: CarbonmarkPaymentMethod;
  address?: string;
  retirementIndex: number | null;
  subgraphIndexStatus: "indexed" | "pending" | "timeout";
};

export const SuccessScreen: FC<Props> = (props) => {
  return (
    <div className={styles.successScreen}>
      {props.subgraphIndexStatus === "timeout" ? (
        <>
          <Text t="h5" className="headline">
            <CelebrationOutlinedIcon fontSize="inherit" />
            <Trans id="offset.successModal.body2">
              Thank you for supporting the planet!
            </Trans>
          </Text>
          <Text t="body5">
            <Trans id="offset.successModal.body3">
              Your transaction has been successfully processed but is taking
              longer than normal to index. It will appear in your{" "}
              <Link target="_blank" href={`/retirements/${props.address}`}>
                retirements
              </Link>{" "}
              soon.
            </Trans>
          </Text>
          <Text t="body5">
            <Trans>
              You can view the successful transaction now on{" "}
              <Link href={`${urls.blockExplorer}/tx/${props.transactionHash}`}>
                PolygonScan.
              </Link>
            </Trans>
          </Text>
          <CarbonmarkButton
            className={styles.fullWidthButton}
            href={"/portfolio"}
            renderLink={(linkProps) => <Link {...linkProps} />}
            label={<Trans>Retire more carbon</Trans>}
          />
        </>
      ) : (
        <>
          {" "}
          <Text t="h5" className="headline">
            <CelebrationOutlinedIcon fontSize="inherit" />
            <Trans>Thank you for supporting the planet!</Trans>
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
                <Trans>Total sale cost</Trans>
              </Text>
              <div className={styles.iconAndText}>
                <div className="icon">
                  <Image
                    src={
                      carbonmarkPaymentMethodMap[props.paymentMethod || "usdc"]
                        .icon
                    }
                    width={20}
                    height={20}
                    alt={
                      carbonmarkPaymentMethodMap[props.paymentMethod || "usdc"]
                        .id
                    }
                  />
                </div>
                <Text t="h5">{props.totalPrice}</Text>
              </div>
            </div>
            <ButtonPrimary
              href={`/retirements/${props.address}/${props.retirementIndex}`}
              label={<Trans>See your retirement receipt</Trans>}
              renderLink={(linkProps) => <Link {...linkProps} />}
              target="_blank"
            />
            <CarbonmarkButton
              href={"/projects"}
              label={<Trans>Retire more Carbon</Trans>}
            />
          </>
        </>
      )}
    </div>
  );
};

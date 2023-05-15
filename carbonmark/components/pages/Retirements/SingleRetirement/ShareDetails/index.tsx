import { t } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CopyAddressButton } from "components/CopyAddressButton";
import { FacebookButton } from "components/FacebookButton";
import { LinkedInButton } from "components/LinkedInButton";
import { Text } from "components/Text";
import { TweetButton } from "components/TweetButton";
import dynamic from "next/dynamic";
import { FC } from "react";
import { DownloadCertificateButtonProps } from "../DownloadCertificateButton";
import * as styles from "./styles";

type Props = {
  retiree: string;
  formattedAmount: string;
  retirementIndex: string;
  beneficiaryName: string;
  beneficiaryAddress: string;
};

const DownloadCertificateButton: React.ComponentType<DownloadCertificateButtonProps> =
  dynamic(
    () =>
      import("../DownloadCertificateButton").then(
        (mod) => mod.DownloadCertificateButton
      ),
    {
      ssr: false,
      loading: () => (
        <ButtonPrimary
          disabled
          variant="blue"
          label={t({
            id: "shared.loading",
            message: "Loading...",
          })}
        />
      ),
    }
  );

export const ShareDetails: FC<Props> = (props) => (
  <div className={styles.shareCard}>
    <Text t="button" color="lightest">
      Share this retirement
    </Text>
    <div className={styles.content}>
      {props.beneficiaryName && props.beneficiaryAddress ? (
        <DownloadCertificateButton
          retirementIndex={props.retirementIndex}
          beneficiaryName={props.beneficiaryName}
          beneficiaryAddress={props.beneficiaryAddress}
        />
      ) : null}
      <div className={styles.socialLinks}>
        <div className="buttons">
          <TweetButton
            title={`${props.retiree} retired ${props.formattedAmount} Tonnes of carbon`}
            tags={["Carbonmark", "Offset"]}
          />
          <FacebookButton />
          <LinkedInButton />
          <CopyAddressButton />
        </div>
      </div>
    </div>
    <Text t="button" uppercase className={styles.profileLink}>
      Create your own retirement
      <LaunchIcon />
    </Text>
  </div>
);

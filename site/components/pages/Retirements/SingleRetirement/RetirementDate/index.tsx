import { FC } from "react";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { TextGroup } from "../TextGroup";

type Props = {
  timestamp: string | null; // 10 digits
};

export const RetirementDate: FC<Props> = ({ timestamp }) => {
  const { locale } = useRouter();
  const retirementDate = timestamp && new Date(parseInt(timestamp) * 1000); //expects milliseconds
  const formattedDate =
    retirementDate &&
    new Intl.DateTimeFormat(locale, {
      dateStyle: "full",
    }).format(retirementDate);

  return (
    <TextGroup
      title={<Trans id="retirement.single.retirementDate.title">Date</Trans>}
      text={
        formattedDate || (
          <Trans id="retirement.single.timestamp.placeholder">
            No retirement timestamp provided
          </Trans>
        )
      }
    />
  );
};

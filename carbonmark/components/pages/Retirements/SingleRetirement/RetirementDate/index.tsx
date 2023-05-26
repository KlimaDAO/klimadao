import { Trans } from "@lingui/macro";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import { Text } from "components/Text";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  timestamp: string | null; // 10 digits
};

export const RetirementDate: FC<Props> = ({ timestamp }) => {
  const { locale } = useRouter();
  const retirementDate = timestamp && new Date(parseInt(timestamp) * 1000); // expects milliseconds
  const formattedDate =
    retirementDate &&
    new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(retirementDate);

  return (
    <div className={styles.retirementDate}>
      <TodayOutlinedIcon />
      <Text t="button" color="lightest">
        {formattedDate || (
          <Trans id="retirement.single.timestamp.placeholder">
            No retirement timestamp provided
          </Trans>
        )}
      </Text>
    </div>
  );
};

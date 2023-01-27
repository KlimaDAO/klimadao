import { Text, TextInfoTooltip } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import { selectLocale } from "state/selectors";

import { MiniTokenDisplay } from "components/MiniTokenDisplay";
import { tokenInfo } from "lib/getTokenInfo";

const MAX_FIAT_COST = 2000; // usdc

type Props = {
  cost: number;
  paymentMethod: string;
  warn: boolean;
};

export const CostDisplay: React.FC<Props> = (props) => {
  const locale = useSelector(selectLocale);
  const label = (
    <div className="mini_token_label">
      <Text t="caption" color="lighter">
        <Trans id="offset_cost">Cost</Trans>
      </Text>
      <TextInfoTooltip
        content={
          <Trans id="offset.aggregation_fee_tooltip">
            This cost includes slippage and the aggregation fee of 1%.
          </Trans>
        }
      >
        <InfoOutlined />
      </TextInfoTooltip>
    </div>
  );

  const costIcon =
    tokenInfo[props.paymentMethod === "fiat" ? "usdc" : props.paymentMethod]
      .icon;

  return (
    <MiniTokenDisplay
      label={label}
      amount={Number(props.cost)?.toLocaleString(locale)}
      icon={costIcon}
      name={props.paymentMethod}
      loading={props.cost === "loading"}
      warn={props.warn}
      helperText={
        props.paymentMethod === "fiat"
          ? t({
              id: "fiat.max_quantity",
              message: `$${MAX_FIAT_COST.toLocaleString(
                locale
              )} maximum for credit cards`,
            })
          : undefined
      }
    />
  );
};

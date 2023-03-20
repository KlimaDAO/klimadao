import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Text } from "components/Text";
import { formatBigToPrice, formatBigToTonnes } from "lib/formatNumbers";
import { formatWalletAddress } from "lib/formatWalletAddress";
import { getElapsedTime } from "lib/getElapsedTime";
import { ActivityType as ActivityT } from "lib/types/carbonmark";
import Link from "next/link";
import { useRouter } from "next/router";
import { getActivityActions } from "./Activities.constants";
import * as styles from "./styles";
type Props = {
  activity: ActivityT;
  showTitle?: boolean;
};
/** Represents a single activity of a user  */
export const Activity = (props: Props) => {
  const { address: connectedAddress } = useWeb3();
  const { locale } = useRouter();

  let addressA, addressB;
  let amountA, amountB;
  let transactionString = t({
    id: "props.transaction.conjunction.at",
    message: "at",
  });

  const isPurchaseActivity = props.activity.activityType === "Purchase";
  const isSaleActivity = props.activity.activityType === "Sold";
  const isUpdateQuantity = props.activity.activityType === "UpdatedQuantity";
  const isUpdatePrice = props.activity.activityType === "UpdatedPrice";

  const sellerID = props.activity.seller.id;
  const buyerId = props.activity.buyer?.id;

  /** By default the seller is the "source" of all actions */
  addressA = sellerID;

  /** By default activities are buy or sell transactions */
  amountA =
    !!props.activity.amount &&
    `${formatBigToTonnes(props.activity.amount, locale)}t`;
  amountB =
    !!props.activity.price &&
    `${formatBigToPrice(props.activity.price, locale)}`;

  /** Determine the order in which to display addresses based on the activity type */
  if (isPurchaseActivity) {
    addressA = buyerId;
    addressB = sellerID;
  }

  if (isSaleActivity) {
    addressA = sellerID;
    addressB = buyerId;
  }

  /** Price Labels */
  if (isUpdatePrice) {
    amountA =
      props.activity.previousPrice &&
      formatBigToPrice(props.activity.previousPrice, locale);
    amountB =
      props.activity.price && formatBigToPrice(props.activity.price, locale);
  }

  /** Quantity Labels */
  if (isUpdateQuantity) {
    amountA =
      props.activity.previousAmount &&
      formatBigToTonnes(props.activity.previousAmount);
    amountB = props.activity.amount && formatBigToTonnes(props.activity.amount);
  }

  /** Determine the conjunction between the labels */
  if (isPurchaseActivity || isSaleActivity) {
    transactionString = t({
      id: "props.transaction.conjunction",
      message: "for",
    });
  }
  if (isUpdatePrice || isUpdateQuantity) {
    transactionString = "->";
  }

  return (
    <div key={props.activity.id} className={styles.activity}>
      {props.showTitle && (
        <Text t="h5">{props.activity.project?.name || "unknown"}</Text>
      )}
      <Text t="body1" color="lighter">
        <i>
          {getElapsedTime({
            locale: locale || "en",
            timeStamp: Number(props.activity.timeStamp),
          })}
        </i>
      </Text>
      <Text t="body1">
        {!!addressA && (
          <Link className="account" href={`/users/${addressA}`}>
            {formatWalletAddress(addressA, connectedAddress)}{" "}
          </Link>
        )}

        {getActivityActions()[props.activity.activityType]}

        {addressB && (
          <Link className="account" href={`/users/${addressB}`}>
            {" "}
            {formatWalletAddress(addressB, connectedAddress)}
          </Link>
        )}
      </Text>
      {!!amountA && !!amountB && (
        <Text t="body1">
          <span className="number">{`${amountA}`}</span> {transactionString}
          <span className="number">{`${amountB}`}</span>
        </Text>
      )}
    </div>
  );
};

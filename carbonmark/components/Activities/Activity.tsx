import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import EastIcon from "@mui/icons-material/East";
import { Text } from "components/Text";
import { createProjectLink } from "lib/createUrls";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { formatHandle, formatWalletAddress } from "lib/formatWalletAddress";
import { getElapsedTime } from "lib/getElapsedTime";
import {
  Activity as ActivityT,
  UserActivity,
} from "lib/types/carbonmark.types";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { ActivityActions } from "./Activities.constants";
import * as styles from "./styles";
interface Props {
  activity: ActivityT;
}

const isUserActivity = (activity: ActivityT): activity is UserActivity => {
  // only user activity objects have the project entry
  return !!(activity as UserActivity).project;
};

/** Represents a single activity of a user  */
export const Activity = (props: Props) => {
  const { address: connectedAddress } = useWeb3();
  const { locale } = useRouter();
  let firstActor, secondActor;
  let amountA, amountB;
  let transactionString: string | ReactNode = t`at`;

  const isPurchaseActivity = props.activity.activityType === "Purchase";
  const isSaleActivity = props.activity.activityType === "Sold";
  const isUpdateQuantity = props.activity.activityType === "UpdatedQuantity";
  const isUpdatePrice = props.activity.activityType === "UpdatedPrice";

  const seller = props.activity.seller;
  const buyer = props.activity.buyer;

  // type guard
  const project = isUserActivity(props.activity)
    ? props.activity.project
    : null;

  /** By default the seller is the "source" of all actions */
  firstActor = seller;

  /** By default activities are buy or sell transactions */
  amountA =
    !!props.activity.amount &&
    `${formatToTonnes(props.activity.amount, locale)}t`;
  amountB =
    !!props.activity.price && `${formatToPrice(props.activity.price, locale)}`;

  /** Determine the order in which to display addresses based on the activity type */
  if (isPurchaseActivity) {
    firstActor = buyer;
    secondActor = seller;
  }

  if (isSaleActivity) {
    firstActor = seller;
    secondActor = buyer;
  }

  /** Price Labels */
  if (isUpdatePrice) {
    amountA =
      props.activity.previousPrice &&
      formatToPrice(props.activity.previousPrice, locale);
    amountB =
      props.activity.price && formatToPrice(props.activity.price, locale);
  }

  /** Quantity Labels */
  if (isUpdateQuantity) {
    amountA =
      props.activity.previousAmount &&
      `${formatToTonnes(props.activity.previousAmount)}t`;
    amountB =
      props.activity.amount && `${formatToTonnes(props.activity.amount)}t`;
  }

  /** Determine the conjunction between the labels */
  if (isPurchaseActivity || isSaleActivity) {
    transactionString = t`for`;
  }
  if (isUpdatePrice || isUpdateQuantity) {
    transactionString = <EastIcon />;
  }

  const shouldDisplayActivity = amountA !== amountB;
  if (!shouldDisplayActivity) {
    return null;
  }
  return (
    <div key={props.activity.id} className={styles.activity}>
      {project && (
        <Link href={createProjectLink(project)}>
          <Text t="h5" className={styles.link}>
            {project.name}
          </Text>
        </Link>
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
        {!!firstActor && firstActor.handle ? (
          <Link className="account" href={`/users/${firstActor.handle}`}>
            {formatHandle(firstActor.id, firstActor.handle, connectedAddress)}{" "}
          </Link>
        ) : (
          !!firstActor &&
          firstActor.id && (
            <Link className="account" href={`/users/${firstActor.id}`}>
              {formatWalletAddress(firstActor.id, connectedAddress)}{" "}
            </Link>
          )
        )}

        {ActivityActions[props.activity.activityType ?? ""] ?? "Undefined"}

        {!!secondActor && secondActor.handle ? (
          <Link className="account" href={`/users/${secondActor.handle}`}>
            {" "}
            {formatHandle(secondActor.id, secondActor.handle, connectedAddress)}
          </Link>
        ) : (
          !!secondActor &&
          secondActor.id && (
            <Link className="account" href={`/users/${secondActor.id}`}>
              {" "}
              {formatWalletAddress(secondActor.id, connectedAddress)}{" "}
            </Link>
          )
        )}
      </Text>
      {!!amountA &&
        !!amountB &&
        props.activity.activityType != "DeletedListing" && (
          <Text t="body1" className={styles.activitySummary}>
            <span className={styles.amount}>{`${amountA}`}</span>
            <span className={styles.action}>{transactionString}</span>
            <span className={styles.amount}>{`${amountB}`}</span>
          </Text>
        )}
    </div>
  );
};

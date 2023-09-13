import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
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
  const activity = props.activity;
  let firstActor, secondActor;
  let amountA, amountB;
  let transactionString = t`at`;

  const isPurchaseActivity = activity.activityType === "Purchase";
  const isSaleActivity = activity.activityType === "Sold";
  const isUpdateQuantity = activity.activityType === "UpdatedQuantity";
  const isUpdatePrice = activity.activityType === "UpdatedPrice";

  const seller = activity.seller;
  const buyer = activity.buyer;

  // type guard
  const project = isUserActivity(activity) ? activity.project : null;

  /** By default the seller is the "source" of all actions */
  firstActor = seller;

  /** By default activities are buy or sell transactions */
  amountA = !!activity.amount && `${formatToTonnes(activity.amount, locale)}t`;
  amountB = !!activity.price && `${formatToPrice(activity.price, locale)}`;

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
      activity.previousPrice && formatToPrice(activity.previousPrice, locale);
    amountB = activity.price && formatToPrice(activity.price, locale);
  }

  /** Quantity Labels */
  if (isUpdateQuantity) {
    amountA =
      activity.previousAmount && formatToTonnes(activity.previousAmount);
    amountB = activity.amount && formatToTonnes(activity.amount);
  }

  /** Determine the conjunction between the labels */
  if (isPurchaseActivity || isSaleActivity) {
    transactionString = t`for`;
  }
  if (isUpdatePrice || isUpdateQuantity) {
    transactionString = "->";
  }

  return (
    <div key={activity.id} className={styles.activity}>
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
            timeStamp: Number(activity.timeStamp),
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

        {ActivityActions[activity.activityType ?? ""] ?? "Undefined"}

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
      {!!amountA && !!amountB && (
        <Text t="body1">
          <span className="number">{`${amountA}`}</span> {transactionString}
          <span className="number">{`${amountB}`}</span>
        </Text>
      )}
    </div>
  );
};

import { UserActivity } from "lib/types/carbonmark";

export const getSoldSum = (activities: UserActivity[]): number =>
  activities.reduce((acc, curr) => {
    const price = Number(curr.price);
    const amount = Number(curr.amount);
    const total = amount * price;
    return acc + total;
  }, 0);

export const getActivitiesTypeSold = (activities: UserActivity[]) => {
  return activities.filter((a) => a.activityType === "Sold");
};

export const getTotalAmountSoldFromActivities = (
  activities: UserActivity[]
) => {
  const activitySold = getActivitiesTypeSold(activities);
  return getSoldSum(activitySold);
};

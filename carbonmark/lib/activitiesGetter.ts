import { UserActivity } from "lib/types/carbonmark";

export const getSoldTonnes = (activities: UserActivity[]): number =>
  activities.reduce((acc, curr) => {
    const amount = Number(curr.amount);
    return acc + amount;
  }, 0);

export const getActivitiesTypeSold = (activities: UserActivity[]) => {
  return activities.filter((a) => a.activityType === "Sold");
};

export const getTotalTonnesSoldFromActivities = (
  activities: UserActivity[]
) => {
  const activitySold = getActivitiesTypeSold(activities);
  return getSoldTonnes(activitySold);
};

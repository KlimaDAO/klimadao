import { t } from "@lingui/macro";
import { ActivityActionT } from "lib/types/carbonmark";

export const getActivityActions = (): Record<ActivityActionT, string> =>
  ({
    CreatedListing: t`created listing`,
    DeletedListing: t`deleted listing`,
    Purchase: t`bought from`,
    Sold: t`sold to`,
    UpdatedPrice: t`updated price`,
    UpdatedQuantity: t`updated quantity`,
  } as const);

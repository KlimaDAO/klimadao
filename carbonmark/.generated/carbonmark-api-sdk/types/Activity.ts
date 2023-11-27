export type Activity = {
  /**
   * @type string
   */
  id: string;
  amount?: string | null;
  previousAmount?: string | null;
  price?: string | null;
  previousPrice?: string | null;
  timeStamp?: string | null;
  activityType?: string | null;
  seller?: {
    /**
     * @type string
     */
    id: string;
    handle?: string | null;
  } | null;
  buyer?: {
    /**
     * @type string
     */
    id: string;
    handle?: string | null;
  } | null;
};

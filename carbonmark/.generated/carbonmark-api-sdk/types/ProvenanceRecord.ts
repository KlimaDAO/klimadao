export type ProvenanceRecord = {
  /**
   * @type string
   */
  id: string;
  /**
   * @type string
   */
  transactionType: string;
  /**
   * @type array
   */
  registrySerialNumbers: string[];
  /**
   * @type string
   */
  token: string;
  /**
   * @type string
   */
  sender: string;
  /**
   * @type string
   */
  receiver: string;
  /**
   * @type number
   */
  originalAmount: number;
  /**
   * @type number
   */
  remainingAmount: number;
  /**
   * @type number
   */
  createdAt: number;
  /**
   * @type number
   */
  updatedAt: number;
};

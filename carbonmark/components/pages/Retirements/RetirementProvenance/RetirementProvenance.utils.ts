import { ProvenanceRecord } from ".generated/carbonmark-api-sdk/types";
import { ProvenanceList } from "./RetirementProvenance.types";

export const getFormattedDate = (timestamp: number, locale = "en") => {
  const dateObj = new Date(timestamp * 1000); //expects milliseconds
  const time = new Intl.DateTimeFormat(locale, {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
  const date = new Intl.DateTimeFormat(locale, {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObj);

  return `UTC ${time} | ${date}`;
};

/**
 * Splits Provenance records in different streams
 * Each stream tracks the provenance of the credits received by the last sender
 * @param provenance
 * @returns
 */
export const splitProvenance = (records: ProvenanceRecord[]) => {
  if (records.length <= 3) return [records];
  // Sender of the last trasfer
  const lastSender = records[1].sender;
  // Stores the different carbon sources
  const provenanceList: ProvenanceList = {};
  records.forEach((record, index) => {
    // Ignore ORIGINATION, RETIMENT and last transfer records for now
    if (record.transactionType !== "TRANSFER" || index <= 1) return;

    // The transfer concerns the last sender
    if (record.receiver == lastSender) {
      if (provenanceList[record.sender]) {
        // Add  this transfer to an existing source
        provenanceList[record.sender].push(record);
      } else {
        // Initialize a new source
        provenanceList[record.sender] = [record];
      }
    } else {
      // If everything goes according to plan, we already identified the receiver of this transfer as a sender in one of the source
      const targetLastSender = Object.keys(provenanceList).find(
        (lastSender) => {
          return provenanceList[lastSender]
            .map((record) => record.sender)
            .includes(record.receiver);
        }
      );
      if (targetLastSender) {
        const targetProvenanceElement = provenanceList[targetLastSender];
        targetProvenanceElement.push(record);
      }
      // If the plan failed. We create another provenance list and log the traceability issue
      else {
        provenanceList[record.sender] = [record];
        console.error("Unable to trace carbon provenance properly", record);
      }
    }
  });
  // total carbon received from all sources
  const totalQuantity = Object.values(provenanceList).reduce(
    (acc, newRrecords) => newRrecords[0].originalAmount + acc,
    0
  );

  // Add bridging and retirement events to each recordList
  Object.values(provenanceList).forEach((newRrecords) => {
    // Quantity received from this source
    const quantity = newRrecords[0].originalAmount;
    // Add the last transfer to each recordList
    newRrecords.unshift(records[1]);
    records.forEach((record) => {
      if (record.transactionType === "RETIREMENT") {
        // We say that the amount retired from this source is proportional to the amount acquired from this source
        const retirement = { ...record };
        retirement.originalAmount *= quantity / totalQuantity;
        newRrecords.unshift(retirement);
      }
      if (record.transactionType === "ORIGINATION") {
        newRrecords.push(record);
      }
    });
  });
  // Sort results by amount retired
  return Object.values(provenanceList).sort((a, b) =>
    a[0].originalAmount > b[0].originalAmount ? -1 : 1
  );
};

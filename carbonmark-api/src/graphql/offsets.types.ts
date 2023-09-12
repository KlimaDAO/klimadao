import { FindCarbonOffsetsQuery } from "../.generated/types/offsets.types";

/** The specific CarbonOffset type from the findCarbonOffsets query*/
export type FindQueryOffset = FindCarbonOffsetsQuery["carbonOffsets"][number];

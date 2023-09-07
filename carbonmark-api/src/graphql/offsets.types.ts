import { FindCarbonOffsetsQuery } from "src/.generated/types/offsets.types";

/** The specific CarbonOffset type from the find findCarbonOffsets query*/
export type FindQueryOffset = FindCarbonOffsetsQuery["carbonOffsets"][number];

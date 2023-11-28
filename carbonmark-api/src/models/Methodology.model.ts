import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "./Utility.model";

export const MethodologyModel = Type.Object(
  {
    id: Nullable(Type.String()),
    category: Nullable(Type.String()),
    name: Nullable(Type.String()),
  },
  { $id: "MethodologyModel" }
);

export type Methodology = Static<typeof MethodologyModel>;

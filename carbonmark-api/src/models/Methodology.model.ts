import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "./Utility.model";

export const Methodology = Type.Object({
  id: Nullable(Type.String()),
  category: Nullable(Type.String()),
  name: Nullable(Type.String()),
});

export type MethodologyT = Static<typeof Methodology>;

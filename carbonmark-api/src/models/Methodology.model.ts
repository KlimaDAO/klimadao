import { Type } from "@sinclair/typebox";

export const Methodology = Type.Object({
  id: Type.String(),
  category: Type.String(),
  name: Type.String(),
});

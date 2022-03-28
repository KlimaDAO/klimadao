import React, { FC } from "react";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { Text } from "@klimadao/lib/components";

import { BaseCard } from "../BaseCard";
// import * as styles from "./styles";

// type Props = {};

export const MethodologyCard: FC = () => (
  <BaseCard
    title="Methodology"
    icon={<HowToRegOutlinedIcon fontSize="large" />}
  >
    <Text t="body2">
      <em>
        "Everyone loves the big cheese say cheese hard cheese cut the cheese
        cheese on toast chalk and cheese who moved my cheese airedale croque
        monsieur, brie. cheese triangles parmesan cut the cheese smelly cheese
        cheesy feet cow, dolcelatte bavarian bergkase cauliflower cheese danish
        fontina fromage swiss chalk and cheese. hard cheese cream cheese"
      </em>
    </Text>
  </BaseCard>
);

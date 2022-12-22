import { FC } from "react";
import Image from "next/legacy/image";
import { CategoryName } from "@klimadao/lib/types/marketplace";

import { categoryInfoMap } from "components/pages/Marketplace/lib/getCategoryInfo";

type Props = {
  category: CategoryName;
};

export const ProjectImage: FC<Props> = (props) => {
  const category = categoryInfoMap[props.category];

  return (
    <Image
      src={category.imageSrc}
      alt={category.label}
      objectFit="cover"
      layout="fill"
    />
  );
};

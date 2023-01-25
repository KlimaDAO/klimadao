import { CategoryNames } from "@klimadao/lib/types/carbonmark";
import Image from "next/legacy/image";
import { FC } from "react";

import { categoryInfoMap, getFirstCategory } from "lib/getCategoryInfo";

type Props = {
  category: CategoryNames;
};

export const ProjectImage: FC<Props> = (props) => {
  // there are more than one category if coming from a pool!
  // quick fix: take the first one
  const firstCategory = getFirstCategory(props.category);
  const category = categoryInfoMap[firstCategory];

  return (
    <Image
      src={category.imageSrc}
      alt={category.label}
      objectFit="cover"
      layout="fill"
    />
  );
};

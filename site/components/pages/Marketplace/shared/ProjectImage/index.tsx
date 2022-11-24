import { FC } from "react";
import Image from "next/legacy/image";
import { Category as CategoryType } from "@klimadao/lib/types/marketplace";

import { categoryInfoMap } from "components/pages/Marketplace/lib/getCategoryInfo";
import * as styles from "./styles";

type Props = {
  category: CategoryType;
};

export const ProjectImage: FC<Props> = (props) => {
  const category = categoryInfoMap[props.category];

  if (!category) {
    return <div className={styles.image}>??</div>;
  }

  return (
    <div className={styles.image}>
      <Image
        src={category.imageSrc}
        alt={category.label}
        objectFit="cover"
        layout="fill"
      />
    </div>
  );
};

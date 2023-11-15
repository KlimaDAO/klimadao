import CloseIcon from "@mui/icons-material/Close";
import { Text } from "components/Text";
import { useElementWidth } from "hooks/useElementWidth";
import { FilterValues } from "hooks/useProjectsFilterParams";
import { flatMap, List, omit, remove } from "lodash";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import * as styles from "./styles";

type Props = {
  onMoreTextClick: () => void;
  defaultValues: FilterValues & { search?: string };
};

export const ProjectFilters: FC<Props> = (props) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth] = useElementWidth(containerRef);
  const [hasOverflow, setHasOverflow] = useState(false);
  const filters = flatMap(
    omit(props.defaultValues, ["search", "sort", "layout"])
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const { clientWidth, scrollWidth } = containerRef.current;
    setHasOverflow(clientWidth < scrollWidth);
  }, [containerWidth, containerRef, router.query]);

  const handleRemoveFilter = (filter: string) => {
    Object.keys(router.query).map((key: string) => {
      if (router.query[key] === filter) {
        router.query[key] = [];
      }
      remove(
        router.query[key] as List<string>,
        (value: string) => value === filter
      );
    });
    router.replace({ query: router.query }, undefined, { shallow: true });
  };

  return (
    <>
      {!!filters?.length && (
        <div ref={containerRef} className={styles.pillContainer}>
          {filters?.map((filter: string, key: number) => (
            <div key={key} className={styles.pill}>
              <span>{filter}</span>
              <CloseIcon onClick={() => handleRemoveFilter(filter)} />
            </div>
          ))}
          {hasOverflow && (
            <div className="more-text">
              <Text t="button" role="button" onClick={props.onMoreTextClick}>
                + more
              </Text>
            </div>
          )}
        </div>
      )}
    </>
  );
};

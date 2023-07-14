import { Close } from "@mui/icons-material";
import { useElementWidth } from "hooks/useElementWidth";
import { flatMap, List, omit, remove } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import * as styles from "./styles";

export const ProjectFilters: React.FC<{ defaultValues: any }> = (props) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth] = useElementWidth(containerRef);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const { clientWidth, scrollWidth } = containerRef.current;
    setIsOverflow(clientWidth < scrollWidth);
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
      {!!flatMap(omit(props.defaultValues, ["search", "sort"]))?.length && (
        <div ref={containerRef} className={styles.pillContainer}>
          {flatMap(omit(props.defaultValues, ["search", "sort"]))?.map(
            (filter: string, key: number) => (
              <div key={key} className={styles.pill}>
                <span>{filter}</span>
                <Close onClick={() => handleRemoveFilter(filter)} />
              </div>
            )
          )}
          {isOverflow && (
            <div
              role="button"
              className="more-text"
              onClick={() => console.log("openModal")}
            >
              + more
            </div>
          )}
        </div>
      )}
    </>
  );
};

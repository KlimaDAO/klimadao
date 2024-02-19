import { t } from "@lingui/macro";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Tippy from "@tippyjs/react";
import { FC, useEffect, useState } from "react";
import { Control, useWatch } from "react-hook-form";

import { getSortedByQueries, SortQuery } from "../lib/cmsDataMap";
import { FormValues } from "../ResourcesList";
import { SortByButton } from "../SortByButton";

import * as styles from "./styles";

interface Props {
  control: Control<FormValues>;
  setValue: (field: "sortedBy", value: SortQuery) => void;
}

const getSelectedSortyByLabel = (sortBy: string) =>
  (!!sortBy && getSortedByQueries().find((q) => q.value === sortBy)?.label) ||
  t`Select`;

export const SortyByDropDown: FC<Props> = (props) => {
  const sortedBy = useWatch({ name: "sortedBy", control: props.control });
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen((current) => !current);
  const onClose = () => setIsOpen(false);

  const label = getSelectedSortyByLabel(sortedBy);

  useEffect(() => {
    // always close dropdown if label changed
    onClose();
  }, [sortedBy]);

  return (
    <div className={styles.tippyContainer}>
      <Tippy
        content={
          <>
            {getSortedByQueries().map((option) => (
              <SortByButton
                key={option.id}
                label={option.label}
                onClick={() => props.setValue("sortedBy", option.value)}
                active={sortedBy === option.value}
              />
            ))}
          </>
        }
        interactive={true}
        onClickOutside={onToggle}
        visible={isOpen}
        placement="bottom-end"
        appendTo="parent"
        arrow={false}
      >
        <button
          onClick={onToggle}
          role="button"
          className={styles.dropdownHeader}
          aria-label={t`Toggle Sorted by menu`}
        >
          {label}
          {isOpen ? (
            <ArrowDropUpIcon fontSize="large" />
          ) : (
            <ArrowDropDownIcon fontSize="large" />
          )}
        </button>
      </Tippy>
    </div>
  );
};

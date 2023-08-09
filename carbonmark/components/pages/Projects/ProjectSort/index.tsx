export const ProjectSort = () => {
  return (
    <Dropdown
      key={sort}
      name="sort"
      initial={sort ?? "recently-updated"}
      className={styles.dropdown}
      aria-label={t`Toggle sort menu`}
      renderLabel={(selected) => `Sort: ${selected?.label}`}
      control={control}
      options={Object.entries(PROJECT_SORT_OPTIONS).map(([option, label]) => ({
        id: option,
        label: label,
        value: option,
      }))}
    />
  );
};

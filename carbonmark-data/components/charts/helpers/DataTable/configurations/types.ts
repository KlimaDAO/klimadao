export type Columns<RI> = Array<{
  /** Column title */
  header: string;
  /** key in the dataset to be displayed in the column cells */
  dataKey: keyof RI;
  /** Style of the cells */
  cellStyle: string;
  /** Formatter for the data to be displayed */
  formatter:
    | ((v: string) => string | React.ReactNode)
    | ((v: number) => string | React.ReactNode);
}>;

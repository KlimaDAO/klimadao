import { t } from "@lingui/macro";
import { Paper, TableContainer, TableSortLabel } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Category } from "components/Category";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { formatToPrice } from "lib/formatNumbers";
import { getCategoryFromProject } from "lib/projectGetter";
import { Project } from "lib/types/carbonmark";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import * as styles from "./styles";

interface Data {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  vintage: string;
}

interface Column {
  id: keyof Data;
  label: string;
  sortable: boolean;
  disablePadding: boolean;
}

const columns: readonly Column[] = [
  {
    id: "name",
    label: "Name",
    sortable: false,
    disablePadding: true,
  },
  {
    id: "price",
    label: "Price",
    sortable: true,
    disablePadding: false,
  },
  {
    id: "description",
    label: "Description",
    sortable: false,
    disablePadding: false,
  },
  {
    id: "category",
    label: "Category",
    sortable: false,
    disablePadding: false,
  },
  {
    id: "vintage",
    label: "Vintage",
    sortable: true,
    disablePadding: false,
  },
];

type Order = "asc" | "desc";

type Props = {
  projects: Array<Project>;
  onColumnSort?: (column: keyof Data, order: Order) => void;
};

export const ListView: FC<Props> = (props) => {
  const router = useRouter();
  const [order, setOrder] = useState<Order>("asc");
  const [sortedColumn, setSortedColumn] = useState<keyof Data>();

  // @todo 0xMakka - integrate sorting when #1149 is merged
  const handleSort = (column: keyof Data) => {
    setSortedColumn(column);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  return (
    <TableContainer className={styles.listView} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                align="left"
                key={column.id}
                sortDirection={order === "asc" ? "asc" : "desc"}
                padding={column.disablePadding ? "none" : "normal"}
              >
                <TableSortLabel
                  hideSortIcon={!column.sortable}
                  active={column.sortable && column.id === sortedColumn}
                  onClick={() => handleSort(column.id)}
                  direction={order === "asc" ? "asc" : "desc"}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.projects.map((project: Project, index: number) => (
            <TableRow
              hover
              tabIndex={-1}
              key={`${project.key}-${index}`}
              onClick={() => router.push(createProjectLink(project))}
            >
              <TableCell component="th" width="35%">
                <p className="description">
                  {project.name || "! MISSING PROJECT NAME !"}
                </p>
              </TableCell>
              <TableCell component="th">
                {formatToPrice(project.price, router.locale)}
              </TableCell>
              <TableCell>
                <p className="description">
                  {project.short_description ||
                    project.description ||
                    t`No project description found`}
                </p>
              </TableCell>
              <TableCell>
                <div className={styles.tags}>
                  <Category category={getCategoryFromProject(project)} />
                </div>
              </TableCell>
              <TableCell>
                <div className={styles.tags}>
                  <Vintage vintage={project.vintage} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

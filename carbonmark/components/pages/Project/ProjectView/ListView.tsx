import { t } from "@lingui/macro";
import { Paper, TableContainer } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { Category } from "components/Category";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { formatToPrice } from "lib/formatNumbers";
import { getCategoryFromProject } from "lib/projectGetter";
import { Project } from "lib/types/carbonmark";
import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";
import * as styles from "./styles";

type Order = "asc" | "desc";

interface Data {
  id?: string;
  name: string;
  price: string;
  description: string;
  // @todo 0xMakka - fix types
  category: { id: any };
  vintage: string;
}

interface Column {
  id: keyof Data;
  label: string;
  disablePadding: boolean;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const columns: readonly Column[] = [
  {
    id: "name",
    label: "Name",
    disablePadding: true,
  },
  {
    id: "price",
    label: "Price",
    disablePadding: false,
  },
  {
    id: "description",
    label: "Description",
    disablePadding: false,
  },
  {
    id: "category",
    label: "Category",
    disablePadding: false,
  },
  {
    id: "vintage",
    label: "Vintage",
    disablePadding: false,
  },
];

type Props = {
  projects: Array<Project>;
};

export const ListView: FC<Props> = (props) => {
  const router = useRouter();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");

  const sortedProjects = useMemo(
    () => stableSort(props.projects as any, getComparator(order, orderBy)),
    [order, orderBy]
  );

  const handleRequestSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
                padding={column.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === column.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={() => handleRequestSort(column.id)}
                >
                  {column.label}
                  {orderBy === column.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* @todo 0xMakka - fix types */}
          {sortedProjects.map((project: any) => (
            <TableRow
              hover
              tabIndex={-1}
              key={project.id}
              onClick={() => router.push(createProjectLink(project))}
            >
              <TableCell component="th" width="45%">
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
                <Category category={getCategoryFromProject(project)} />
              </TableCell>
              <TableCell>
                <Vintage vintage={project.vintage} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

import { t } from "@lingui/macro";
import { Paper, TableContainer, TableSortLabel } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Category } from "components/Category";
import { Vintage } from "components/Vintage";
import { useProjectsParams } from "hooks/useProjectsFilterParams";
import { createProjectLink } from "lib/createUrls";
import { formatToPrice } from "lib/formatNumbers";
import { getCategoryFromProject } from "lib/projectGetter";
import { Project } from "lib/types/carbonmark";
import { isEqual, split } from "lodash";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
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

type Props = {
  projects: Array<Project>;
};

export const ListView: FC<Props> = ({ projects }) => {
  const router = useRouter();
  const {
    params: { sort },
    updateQueryParams,
  } = useProjectsParams();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<keyof Data>();
  const sortDirection = sortOrder ?? "desc";

  const handleSort = (column: keyof Data) => {
    setSortColumn(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    // when the user loads the projects view with some previously set sort value the sort
    // order should be reflected in the table header with the correct arrow direction
    const [column, order] = split(sort, "-");
    setSortColumn(column as keyof Data);
    setSortOrder(["newest", "highest"].includes(order) ? "asc" : "desc");
  }, [sort]);

  useEffect(() => {
    // updates the sort dropdown when there is an update to the table sorting
    if (sortColumn === "vintage") {
      updateQueryParams({
        sort: isEqual(sortOrder, "asc") ? "vintage-newest" : "vintage-oldest",
      });
    }
    if (sortColumn === "price") {
      updateQueryParams({
        sort: sortOrder === "asc" ? "price-highest" : "price-lowest",
      });
    }
  }, [sortOrder]);

  return (
    <div className={styles.projectsList}>
      <TableContainer className={styles.listView} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  align="left"
                  key={column.id}
                  sortDirection={sortDirection}
                  padding={column.disablePadding ? "none" : "normal"}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      direction={sortDirection}
                      onClick={() => handleSort(column.id)}
                      active={column.id === sortColumn}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    <span>{column.label}</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project: Project, index: number) => (
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
    </div>
  );
};

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import styles from "./styles.module.scss";

/** Client component that renders a Data Table pagination element
 * page: Current page
 * pages_count: Number of pages this dataset has
 * onPageChange: Callback funtion that handle page change events
 */
export default function Pagination(props: {
  page: number;
  pages_count: number;
  onPageChange: (x: number) => void;
}) {
  return (
    <div className={styles.pagination}>
      {props.page > 0 && (
        <>
          <div
            className={styles.paginationIcon}
            onClick={() => props.onPageChange(0)}
          >
            <KeyboardDoubleArrowLeft></KeyboardDoubleArrowLeft>
          </div>
          <div
            className={styles.paginationIcon}
            onClick={() => props.onPageChange(props.page - 1)}
          >
            <KeyboardArrowLeft></KeyboardArrowLeft>
          </div>
        </>
      )}

      {props.page < props.pages_count - 1 && (
        <>
          <div
            className={styles.paginationIcon}
            onClick={() => props.onPageChange(props.page + 1)}
          >
            <KeyboardArrowRight></KeyboardArrowRight>
          </div>
          <div
            className={styles.paginationIcon}
            onClick={() => props.onPageChange(props.pages_count - 1)}
          >
            <KeyboardDoubleArrowRight></KeyboardDoubleArrowRight>
          </div>
        </>
      )}
    </div>
  );
}

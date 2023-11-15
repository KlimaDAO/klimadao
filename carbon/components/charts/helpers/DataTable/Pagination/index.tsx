import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
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
        <div className={styles.paginationButtons}>
          <div
            className={styles.paginationIcon}
            onClick={() => props.onPageChange(0)}
          >
            <KeyboardDoubleArrowLeftIcon />
          </div>
          <div
            className={styles.paginationIcon}
            onClick={() => props.onPageChange(props.page - 1)}
          >
            <KeyboardArrowLeftIcon />
          </div>
        </div>
      )}
      <div className={styles.paginationCounter}>
        {props.page + 1} / {props.pages_count}
      </div>

      {props.page < props.pages_count - 1 && (
        <div className={styles.paginationButtons}>
          <div
            className={styles.paginationIcon}
            onClick={() => props.onPageChange(props.page + 1)}
            role="button"
          >
            <KeyboardArrowRightIcon />
          </div>
          <div
            className={styles.paginationIcon}
            onClick={() => props.onPageChange(props.pages_count - 1)}
          >
            <KeyboardDoubleArrowRightIcon />
          </div>
        </div>
      )}
    </div>
  );
}

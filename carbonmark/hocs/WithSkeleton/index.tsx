import { Skeleton } from "@mui/material";
import { FC } from "react";
import * as styles from "./styles";

type WithSkeletonProps<T> = T & {
  loading?: boolean;
};

/**
 * Using the React Skeleton MUI component to automatically add a loading skeleton to a wrapped component
 * https://mui.com/material-ui/react-skeleton/
 * HOC pattern shamelessly ripped and customized from https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example
 */
export function withSkeleton<T>(WrappedComponent: React.ComponentType<T>) {
  // Maintain the previous display name
  const displayName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? "Component";

  /** Create out wrapped skeleton component */
  const ComponentWithSkeleton: FC<WithSkeletonProps<T>> = (props) =>
    props.loading ? (
      <Skeleton
        variant="rounded"
        width="100%"
        className={styles.skeletonStyles}
      >
        <WrappedComponent {...props} />
      </Skeleton>
    ) : (
      <WrappedComponent {...props} />
    );

  /** Add another display name for the wrapped version */
  ComponentWithSkeleton.displayName = `withSkeleton(${displayName})`;

  return ComponentWithSkeleton;
}

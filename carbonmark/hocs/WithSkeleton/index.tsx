import { Skeleton } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import * as styles from "./styles";

type WithSkeletonDecoratorProps<T> = T & WithSkeletonProps;

/** A decorator version of WithSkeleton */
export function withSkeleton<T>(Component: React.ComponentType<T>) {
  // Maintain the previous display name
  const displayName = Component.displayName ?? Component.name ?? "Component";

  /** Create out wrapped skeleton component */
  const ComponentWithSkeleton: FC<WithSkeletonDecoratorProps<T>> = (props) => (
    <WithSkeleton>
      <Component {...props} />
    </WithSkeleton>
  );

  /** Add another display name for the wrapped version */
  ComponentWithSkeleton.displayName = `withSkeleton(${displayName})`;

  return ComponentWithSkeleton;
}

type WithSkeletonProps = {
  loading?: boolean;
};

/**
 *  Using the React Skeleton MUI component to automatically add a loading skeleton to a wrapped component
 * https://mui.com/material-ui/react-skeleton/
 * HOC pattern shamelessly ripped and customized from https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example
 */
export const WithSkeleton: FC<WithSkeletonProps & PropsWithChildren> = (
  props
) => {
  return props.loading ? (
    <Skeleton variant="rounded" width="100%" className={styles.skeletonStyles}>
      {props.children}
    </Skeleton>
  ) : (
    <>{props.children}</>
  );
};

import { FC, ReactNode } from "react";
import * as styles from "./styles";

interface Props {
    icon: () => JSX.Element;
    children: ReactNode;
}

export const SidebarItem: FC<Props> = (props) => {
    return (
        <a className={styles.sidebarItem}>
            {props.icon()}
            {props.children}
        </a>
    );
};

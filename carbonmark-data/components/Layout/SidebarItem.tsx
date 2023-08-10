import { FC, ReactNode } from "react";
import * as styles from "./styles";

interface Props {
    icon: () => JSX.Element;
    children: ReactNode;
    url: string;
}

export const SidebarItem: FC<Props> = (props) => {
    return (
        <a className={styles.sidebarItem} href={props.url}>
            {props.icon()}
            {props.children}
        </a>
    );
};

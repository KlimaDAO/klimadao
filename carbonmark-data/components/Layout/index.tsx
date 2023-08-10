import { FC, ReactNode } from "react";
import { DesktopHeader } from "./DesktopHeader";
import * as styles from "./styles";

import { useRouter } from "next/router";

interface Props {
    buttons?: JSX.Element[];
    href?: string;
    transparent?: boolean;
    children: ReactNode;
}

export const Layout: FC<Props> = (props) => {
    const { pathname } = useRouter();
    return (<>
        <DesktopHeader></DesktopHeader>
        <div className={styles.content}>
            {props.children}
        </div>
    </>
    );
};

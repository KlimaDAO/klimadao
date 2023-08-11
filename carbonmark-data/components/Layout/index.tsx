import { FC, ReactNode } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileHeader } from "./MobileHeader";
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
        <DesktopSidebar></DesktopSidebar>
        <MobileHeader></MobileHeader>
        <div className={styles.content}>
            {props.children}
        </div>
        <MobileBottomNav></MobileBottomNav>
    </>
    );
};

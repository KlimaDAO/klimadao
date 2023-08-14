import { FC, ReactNode } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileHeader } from "./MobileHeader";
import * as styles from "./styles";


import { useRouter } from "next/router";

interface Props {
    title: ReactNode;
    children: ReactNode;
}

export const Layout: FC<Props> = ({ title, children }) => {
    const { pathname } = useRouter();
    return (<>
        <DesktopSidebar></DesktopSidebar>
        <MobileHeader></MobileHeader>
        <div className={styles.content}>
            <h1>{title}</h1>
            {children}
        </div>
        <MobileBottomNav></MobileBottomNav>
    </>
    );
};

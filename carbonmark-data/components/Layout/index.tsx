import { FC, ReactNode } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileHeader } from "./MobileHeader";
import * as styles from "./styles";



interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (<>
        <DesktopSidebar></DesktopSidebar>
        <MobileHeader></MobileHeader>
        <div className={styles.content}>
            {children}
        </div>
        <MobileBottomNav></MobileBottomNav>
    </>
    );
};
export default Layout;
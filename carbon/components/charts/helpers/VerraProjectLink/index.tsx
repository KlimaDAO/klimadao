import { t } from "@lingui/macro";
import Link from "components/Link";

import styles from "./styles.module.scss";

/** Async server component that renders a Recharts client component */
export default function VerraProjectLink(props: { projectId: string }) {
  const projectIdSplited = props.projectId.split("-");
  const projectNumber =
    projectIdSplited.length > 0 ? projectIdSplited[1] : undefined;
  const VerraUrl = `https://registry.verra.org/app/projectDetail/VCS/${projectNumber}`;
  return projectNumber ? (
    <Link href={VerraUrl} className={styles.verraProjectLink}>
      {" "}
      {props.projectId}
    </Link>
  ) : (
    <div>{t`N/A`}</div>
  );
}

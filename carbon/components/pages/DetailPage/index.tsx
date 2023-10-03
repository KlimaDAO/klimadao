import { t } from "@lingui/macro";
import { PageHeader } from "components/PageHeader/PageHeader";
import styles from "./styles.module.scss";

/**
 * A UI layout component to position detail pages content
 */
export default function DetailPage(props: {
  card: React.ReactNode | Promise<React.ReactNode>;
  pageTitle?: string;
  overview: string;
  insights?: {
    content: string;
    source: "ai" | "human";
  };
}) {
  return (
    <div>
      {props.pageTitle && (
        <PageHeader title={props.pageTitle} showBackButton={true} />
      )}
      {props.card}
      <div className={styles.text}>
        <div>
          <h2>{t`Overview`}</h2>
          {props.overview}
        </div>
        {!!props.insights && (
          <div className={styles.insights}>
            <h2>
              {t`Insights`}
              {props.insights.source == "ai" && <AiSvg />}
            </h2>
            {props.insights.content}
          </div>
        )}
      </div>
    </div>
  );
}

const AiSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 9.5V7.5C20 6.4 19.1 5.5 18 5.5H15C15 3.84 13.66 2.5 12 2.5C10.34 2.5 9 3.84 9 5.5H6C4.9 5.5 4 6.4 4 7.5V9.5C2.34 9.5 1 10.84 1 12.5C1 14.16 2.34 15.5 4 15.5V19.5C4 20.6 4.9 21.5 6 21.5H18C19.1 21.5 20 20.6 20 19.5V15.5C21.66 15.5 23 14.16 23 12.5C23 10.84 21.66 9.5 20 9.5ZM18 19.5H6V7.5H18V19.5ZM9 13.5C8.17 13.5 7.5 12.83 7.5 12C7.5 11.17 8.17 10.5 9 10.5C9.83 10.5 10.5 11.17 10.5 12C10.5 12.83 9.83 13.5 9 13.5ZM16.5 12C16.5 12.83 15.83 13.5 15 13.5C14.17 13.5 13.5 12.83 13.5 12C13.5 11.17 14.17 10.5 15 10.5C15.83 10.5 16.5 11.17 16.5 12ZM8 15.5H16V17.5H8V15.5Z"
        fill="#313131"
      />
    </svg>
  );
};

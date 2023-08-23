/**
 * A UI layout component to position detail pages content
 */
export default function DetailPage(props: {
  chart: React.ReactNode | Promise<React.ReactNode>;
  pageTitle: string;
  chartTitle: string;
  overview: string;
}) {
  return (
    <div>
      <h1>{props.pageTitle}</h1>
      {props.chart}
      <div>{props.overview}</div>
    </div>
  );
}

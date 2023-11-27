import OverviewPage, {
  generateMetadata as overviewGenerateMetadata,
} from "./overview/page";

const IndexPage = OverviewPage;

export const generateMetadata = overviewGenerateMetadata;
export default IndexPage;

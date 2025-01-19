import assessor from "./assessor";
import country from "./country";
import developer from "./developer";
import indexContent from "./indexContent";
import methodology from "./methodology";
import accreditation from "./objects/accreditation";
import captionImage from "./objects/captionImage";
import externalFile from "./objects/externalFile";
import hostedFile from "./objects/hostedFile";
import project from "./project";
import projectContent from "./projectContent";
import standard from "./standard";
export const schemaTypes = [
  project,
  methodology,
  projectContent,
  externalFile,
  hostedFile,
  captionImage,
  country,
  indexContent,
  accreditation,
  assessor,
  developer,
  standard,
];

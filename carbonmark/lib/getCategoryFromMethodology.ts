import { CategoryName } from "lib/types/carbonmark";

const getMap = () => {
  const methodologyToCategoryMap = new Map<string, CategoryName>();

  //Renewable Energy
  methodologyToCategoryMap.set("AM0103", "Renewable Energy");
  methodologyToCategoryMap.set("ACM0002", "Renewable Energy");
  methodologyToCategoryMap.set("AMS-I.D.", "Renewable Energy");
  methodologyToCategoryMap.set("AMS-I.C.", "Renewable Energy");
  methodologyToCategoryMap.set("ACM0018", "Renewable Energy");

  //Energy Efficiency
  methodologyToCategoryMap.set("AM0038", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0043", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0044", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0046", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0055", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0055", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0056", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0061", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0062", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0067", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0091", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0105", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0106", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0113", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0114", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0115", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0116", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0117", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0118", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0119", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0120", "Energy Efficiency");
  methodologyToCategoryMap.set("AM0121", "Energy Efficiency");
  methodologyToCategoryMap.set("VM0008", "Energy Efficiency");
  methodologyToCategoryMap.set("VM0018", "Energy Efficiency");
  methodologyToCategoryMap.set("VM0019", "Energy Efficiency");
  methodologyToCategoryMap.set("VM0020", "Energy Efficiency");
  methodologyToCategoryMap.set("VM0025", "Energy Efficiency");
  methodologyToCategoryMap.set("VMR0005", "Energy Efficiency");
  methodologyToCategoryMap.set("VMR0006", "Energy Efficiency");
  methodologyToCategoryMap.set("VM0001", "Energy Efficiency");
  methodologyToCategoryMap.set("VM0002", "Energy Efficiency");
  methodologyToCategoryMap.set("VM0008", "Energy Efficiency");
  methodologyToCategoryMap.set("VM0019", "Energy Efficiency");
  methodologyToCategoryMap.set("VM0020", "Energy Efficiency");
  methodologyToCategoryMap.set("VM0018", "Energy Efficiency");
  methodologyToCategoryMap.set("ACM0012", "Energy Efficiency");
  methodologyToCategoryMap.set("AMS-III.Z", "Energy Efficiency");
  methodologyToCategoryMap.set("GS TPDDTEC v 1.", "Energy Efficiency");
  methodologyToCategoryMap.set("AMS-II.G.", "Energy Efficiency");

  //Agriculture
  methodologyToCategoryMap.set("VM0041", "Agriculture");
  methodologyToCategoryMap.set("VM0042", "Agriculture");
  methodologyToCategoryMap.set("VM0017", "Agriculture");
  methodologyToCategoryMap.set("VMR0003", "Agriculture");
  methodologyToCategoryMap.set("AMS-III.AU.", "Agriculture");
  methodologyToCategoryMap.set("AMS-III.BE", "Agriculture");
  methodologyToCategoryMap.set("AMS-III.BF", "Agriculture");
  methodologyToCategoryMap.set("VM0017", "Agriculture");
  methodologyToCategoryMap.set("AMS-III.D.", "Agriculture");

  //Forestry
  methodologyToCategoryMap.set("VM0004", "Forestry");
  methodologyToCategoryMap.set("VM0007", "Forestry");
  methodologyToCategoryMap.set("VM0024", "Forestry");
  methodologyToCategoryMap.set("VM0027", "Forestry");
  methodologyToCategoryMap.set("VM0033", "Forestry");
  methodologyToCategoryMap.set("VM0036", "Forestry");
  methodologyToCategoryMap.set("VM0003", "Forestry");
  methodologyToCategoryMap.set("VM0004", "Forestry");
  methodologyToCategoryMap.set("VM0005", "Forestry");
  methodologyToCategoryMap.set("VM0006", "Forestry");
  methodologyToCategoryMap.set("VM0007", "Forestry");
  methodologyToCategoryMap.set("VM0009", "Forestry");
  methodologyToCategoryMap.set("VM0010", "Forestry");
  methodologyToCategoryMap.set("VM0011", "Forestry");
  methodologyToCategoryMap.set("VM0012", "Forestry");
  methodologyToCategoryMap.set("VM0015", "Forestry");
  methodologyToCategoryMap.set("VM0029", "Forestry");
  methodologyToCategoryMap.set("VM0034", "Forestry");
  methodologyToCategoryMap.set("VM0035", "Forestry");
  methodologyToCategoryMap.set("VM0037", "Forestry");
  methodologyToCategoryMap.set("AR-ACM0003", "Forestry");
  methodologyToCategoryMap.set("AR-AM0014", "Forestry");
  methodologyToCategoryMap.set("AR-AMS0003", "Forestry");
  methodologyToCategoryMap.set("AR-AMS0007", "Forestry");
  methodologyToCategoryMap.set("AR-ACM0001", "Forestry");
  methodologyToCategoryMap.set("AM0014", "Forestry");

  //Other nature based
  methodologyToCategoryMap.set("VM0021", "Other Nature-Based");
  methodologyToCategoryMap.set("VM0026", "Other Nature-Based");
  methodologyToCategoryMap.set("VM0032", "Other Nature-Based");
  methodologyToCategoryMap.set("AM0010", "Other Nature-Based");

  //Industrial processing
  methodologyToCategoryMap.set("AM0048", "Industrial Processing");
  methodologyToCategoryMap.set("AM0050", "Industrial Processing");
  methodologyToCategoryMap.set("AM0059", "Industrial Processing");
  methodologyToCategoryMap.set("AM0092", "Industrial Processing");
  methodologyToCategoryMap.set("AM0095", "Industrial Processing");
  methodologyToCategoryMap.set("AM0096", "Industrial Processing");
  methodologyToCategoryMap.set("AMS-III.M.", "Industrial Processing");
  methodologyToCategoryMap.set("AM0025", "Industrial Processing");

  //Other
  methodologyToCategoryMap.set("AM0052", "Other");
  methodologyToCategoryMap.set("AM0053", "Other");
  methodologyToCategoryMap.set("AM0057", "Other");
  methodologyToCategoryMap.set("AM0058", "Other");
  methodologyToCategoryMap.set("AM0064", "Other");
  methodologyToCategoryMap.set("AM0065", "Other");
  methodologyToCategoryMap.set("AM0066", "Other");
  methodologyToCategoryMap.set("AM0069", "Other");
  methodologyToCategoryMap.set("AM0070", "Other");
  methodologyToCategoryMap.set("AM0070", "Other");
  methodologyToCategoryMap.set("AM0072", "Other");
  methodologyToCategoryMap.set("AM0073", "Other");
  methodologyToCategoryMap.set("AM0074", "Other");
  methodologyToCategoryMap.set("AM0075", "Other");
  methodologyToCategoryMap.set("AM0076", "Other");
  methodologyToCategoryMap.set("AM0077", "Other");
  methodologyToCategoryMap.set("AM0078", "Other");
  methodologyToCategoryMap.set("AM0079", "Other");
  methodologyToCategoryMap.set("AM0080", "Other");
  methodologyToCategoryMap.set("AM0081", "Other");
  methodologyToCategoryMap.set("AM0082", "Other");
  methodologyToCategoryMap.set("AM0083", "Other");
  methodologyToCategoryMap.set("AM0084", "Other");
  methodologyToCategoryMap.set("AM0086", "Other");
  methodologyToCategoryMap.set("AM0088", "Other");
  methodologyToCategoryMap.set("AM0089", "Other");
  methodologyToCategoryMap.set("AM0090", "Other");
  methodologyToCategoryMap.set("AM0093", "Other");
  methodologyToCategoryMap.set("AM0094", "Other");
  methodologyToCategoryMap.set("AM0097", "Other");
  methodologyToCategoryMap.set("AM0098", "Other");
  methodologyToCategoryMap.set("AM0100", "Other");
  methodologyToCategoryMap.set("AM0104", "Other");
  methodologyToCategoryMap.set("AM0107", "Other");
  methodologyToCategoryMap.set("AM0108", "Other");
  methodologyToCategoryMap.set("AM0109", "Other");
  methodologyToCategoryMap.set("AM0110", "Other");
  methodologyToCategoryMap.set("AM0112", "Other");
  methodologyToCategoryMap.set("AM0122", "Other");
  methodologyToCategoryMap.set("VM0013", "Other");
  methodologyToCategoryMap.set("VM0040", "Other");
  methodologyToCategoryMap.set("VMR0004", "Other");
  methodologyToCategoryMap.set("VM0014", "Other");
  methodologyToCategoryMap.set("VM0016", "Other");
  methodologyToCategoryMap.set("VM0023", "Other");
  methodologyToCategoryMap.set("VM0030", "Other");
  methodologyToCategoryMap.set("VM0031", "Other");
  methodologyToCategoryMap.set("VM0040", "Other");
  methodologyToCategoryMap.set("VM0043", "Other");
  methodologyToCategoryMap.set("VM0039", "Other");
  methodologyToCategoryMap.set("VMR0004", "Other");
  methodologyToCategoryMap.set("VMR0001", "Other");
  methodologyToCategoryMap.set("VMR0002", "Other");
  methodologyToCategoryMap.set("ACM0001", "Other");
  methodologyToCategoryMap.set("ACM0006", "Other");
  methodologyToCategoryMap.set("AM0029", "Other");
  methodologyToCategoryMap.set("AM0001", "Other");
  methodologyToCategoryMap.set("AMS-III.G.", "Other");
  methodologyToCategoryMap.set("AM0009", "Other");
  methodologyToCategoryMap.set("AMS-III.H.", "Other");

  return methodologyToCategoryMap;
};

export const getCategoryFromMethodology = (
  methodology: string
): CategoryName => {
  const methodologyArray = methodology.split(","); // take the first, ignore the rest
  const firstMethod = methodologyArray[0].trim();

  const map = getMap();

  if (!map) {
    throw new Error("Map cannot be null");
  }

  return map.get(firstMethod) || "Other"; // fallback to Other not found, CarbonMark API does the same!
};

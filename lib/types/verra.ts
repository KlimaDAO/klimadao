export interface Value {
  program: string;
  resourceIdentifier: string;
  resourceName: string;
  proponent: string;
  operator: null | string;
  designee: null | string;
  protocolCategories: string;
  protocolSubCategories: null | string;
  protocols: string;
  resourceStatus: string;
  country: string;
  estAnnualEmissionReductions: number;
  region: string;
  version: string;
  compatibleProgramScenarioTypeName: null | string;
  inputTypes: null | string;
  programObjectives: null | string;
  creditingPeriodStartDate: string;
  creditingPeriodEndDate: string;
  createDate: string;
}

export interface VerraProjectDetails {
  totalCount: number;
  countExceeded: boolean;
  "@count": number;
  value: Value[];
}

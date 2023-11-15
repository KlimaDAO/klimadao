export type IcrProject = {
  acceptedTerms: boolean;
  _id: string;
  additionalLevels: AdditionalLevel[];
  areaSpan: any[];
  carbonCredits: CarbonCredit[];
  city: string | null;
  projectStatus: { id: string; title: string };
  contactPerson: ContactPerson[];
  countryCode: string;
  createdAt: string;
  creditingPeriodNumYears: number;
  creditingPeriodRenewal: boolean;
  creditingPeriodStartDate: string;
  startDate: string;
  icrDocuments: icrDocument[];
  email: string | null;
  estimatedAnnualMitigations: EstimatedAnnualMitigation[];
  fullName: string;
  gallery: GalleryItem[];
  geographicalRegion: GeographicalRegion | null;
  geoLocation: GeoLocation;
  ghgProgram: GHGProgram;
  headline: string;
  isCriteriaForValidation: boolean;
  isCriteriaForVerification: boolean;
  isDeviatesFromMethodology: boolean;
  isGroupedProject: boolean;
  isHostCountryApproval: boolean;
  isInformationUpdatedRegularly: boolean;
  isInReview: boolean;
  isMethodology: boolean;
  isSpanArea: boolean;
  isTransitioningFromOtherGHGProgram: boolean;
  linkToProject: string | null;
  media: MediaItem[];
  methodology: Methodology;
  methodologyDeviationDescription: string | null;
  mrvCycle: any | null;
  num: number;
  onChainId: string;
  otherBenefits: OtherBenefit[];
  owner: Owner;
  participants: any[];
  projectContracts: ProjectContract[];
  projectType: ProjectType;
  sector: Sector;
  sequestrationPermanenceInYears: number;
  shortDescription: string;
  state: string | null;
  statusState: string;
  streetName: string | null;
  updatedAt: string;
  status: string;
  validationCriteria: any[];
  verificationCriteria: any[];
  website: string;
  zip: string | null;
};

export type CarbonCredit = {
  serialization: string;
  tokenId: string;
  ticker: string;
  type: string;
  vintage: string;
};

type GeographicalRegion = {
  id: string;
  title: string;
  content: null;
  extraTitle: null;
};

type AdditionalLevel = {
  title: string;
  checked: boolean;
  description: string;
  additionalityId: number;
};

type ContactPerson = {
  email: string;
  fullName: string;
  roles: any[];
  userRef: any;
};

type icrDocument = {
  _id: string;
  createdAt: string;
  description: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  isPublic: boolean;
  mimetype: string;
  type: string;
  updatedAt: string;
  fileRef: any;
  uri: string;
};

type EstimatedAnnualMitigation = {
  date: string;
  vintage: string;
  estimatedMitigation: number;
};

type GalleryItem = {
  _id: string;
  createdAt: string;
  description: string | null;
  fileName: string;
  fileSize: number;
  fileType: string;
  isPublic: boolean;
  mimetype: string;
  updatedAt: string;
  fileRef: any;
  uri: string;
};

type GeoLocation = {
  lat: number;
  lng: number;
};

type GHGProgram = {
  id: string;
  title: string;
  content: string;
  extraTitle: string | null;
};

type MediaItem = {
  _id: string;
  createdAt: string;
  description: string | null;
  fileName: string;
  fileSize: number;
  fileType: string;
  isPublic: boolean;
  mimetype: string;
  updatedAt: string;
  fileRef: any;
  uri: string;
};

type Methodology = {
  id: string;
  title: string;
};

type OtherBenefit = {
  title: string;
  checked: boolean;
  benefitId: number;
  description: string;
};

type Owner = {
  fullName: string;
  ref: OwnerRef;
};

type OwnerRef = {
  type: any[];
  termsAccepted: boolean;
  _id: string;
  id: string;
  city: string;
  website: string;
  isPublic: boolean;
  companyLogo: any;
  companyType: string;
  countryCode: string;
  fullName: string;
  physicalAddress: string;
  registrationNumber: string;
};

type ProjectContract = {
  address: string;
  chainId: string;
  projectId: string;
};

type ProjectType = {
  id: string;
  title: string;
  content: string;
  extraTitle: string | null;
};

type Sector = {
  id: number;
  title: string;
};

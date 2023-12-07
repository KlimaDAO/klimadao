import { omit } from "lodash";
import { UserProfile } from "../src/utils/helpers/users.utils";

export const DEV_URL = "http://localhost:3003";
export const MOCK_ADDRESS = "0x0123456789012345678901234567890123456789";

export const ERROR = {
  message: "Graph error occurred",
  locations: [{ line: 6, column: 7 }],
  path: ["graph", 1],
};

export const CATEGORIES = [
  {
    id: "Blue Carbon",
  },
  {
    id: "Forestry",
  },
  {
    id: "A Random Category",
  },
];

export const COUNTRIES = [
  {
    id: "Canada",
  },
  {
    id: "Mozambique",
  },
  {
    id: "A Random Country",
  },
  {
    id: "China",
  },
  {
    id: "Spain",
  },
  {
    id: "United Kingdom",
  },
  {
    id: "Iceland",
  },
  {
    id: "Ukraine",
  },
  {
    id: "Vietnam",
  },
];

export const COUNTRY_CODES = ["CN", "ES", "GB", "IS", "UA", "VN"];

export const VINTAGES = ["2020", "2021", "2022", "2023"];

export const mockICRProject = {
  acceptedTerms: true,
  _id: "9c4e2311-005c-419a-a334-1bc331b137c8",
  additionalLevels: [],
  areaSpan: [],
  carbonCredits: [
    {
      serialization: "ICR-GRC-30-5-3-A-0-2023",
      tokenId: "1",
      ticker: "ICC",
      type: "ExPost",
      vintage: "2023",
    },
    {
      serialization: "ICR-GRC-30-5-3-A-0-2024",
      tokenId: "2",
      ticker: "ICC",
      type: "ExPost",
      vintage: "2024",
    },
    {
      serialization: "ICR-GRC-30-5-3-A-0-2025",
      tokenId: "3",
      ticker: "ICC",
      type: "ExPost",
      vintage: "2025",
    },
  ],
  city: null,
  projectStatus: {
    id: "under development",
    title: "under development",
  },
  contactPerson: [
    {
      email: "bjorn@mojoflower.io",
      fullName: "Björn Halldór Helgason",
      roles: [],
      userRef: {
        _id: "afd528c7-012a-4e24-b140-a72f7919eeca",
        keys: [],
        stellarAccounts: {
          issuerAccount: {},
          distributionAccount: {},
        },
      },
    },
    {
      email: "thor@mojoflower.io",
      fullName: "Þórður Ágústsson",
      roles: [],
      userRef: {
        _id: "7b3c4b78-fcbf-4c26-a168-8cbe220da9b3",
        keys: [],
        stellarAccounts: {
          issuerAccount: {},
          distributionAccount: {},
        },
      },
    },
    {
      email: "bjorn+789@mojoflower.io",
      fullName: null,
      roles: [],
      userRef: {
        _id: "6e264b07-e3ed-4d31-a204-6ad651334fcd",
        keys: [],
        stellarAccounts: {
          issuerAccount: {},
          distributionAccount: {},
        },
      },
    },
  ],
  countryCode: "GR",
  createdAt: "2023-03-02T10:14:49.621Z",
  creditingPeriodNumYears: 2,
  creditingPeriodRenewal: false,
  creditingPeriodStartDate: "2023-07-14T00:00:00.000Z",
  startDate: "2023-03-07T00:00:00.000Z",
  documents: [
    {
      _id: "1568",
      createdAt: "2023-09-16T22:21:51.665Z",
      description: null,
      fileName: "receipt-0953e128-faac-4606-87ca-8fbd4ce58d1a (1).pdf",
      fileSize: 225317,
      fileType: "unknown",
      isPublic: true,
      mimetype: null,
      updatedAt: "2023-09-16T22:21:51.665Z",
      fileRef: {
        _id: "8428387c-46bc-45d8-8aeb-0ae68cad8cc2",
      },
      uri: "https://mojo-development.fra1.digitaloceanspaces.com/users/63ff52d1fcb6fcb31d7e46c4/files/1686913173700-receipt-0953e128-faac-4606-87ca-8fbd4ce58d1a%20%281%29.pdf",
    },
  ],
  email: null,
  estimatedAnnualMitigations: [
    {
      date: "Fri, 14 Jul 2023 00:00:00 GMT",
      vintage: "2023",
      estimatedMitigation: 50000,
    },
    {
      date: "Sun, 14 Jul 2024 00:00:00 GMT",
      vintage: "2024",
      estimatedMitigation: 50000,
    },
    {
      date: "Mon, 14 Jul 2025 00:00:00 GMT",
      vintage: "2025",
      estimatedMitigation: 50000,
    },
  ],
  fullName: "A Magnificient Project",
  gallery: [
    {
      _id: "1910",
      createdAt: "2023-09-21T13:45:15.406Z",
      description: "Thisimage is HUGE",
      fileName: "hugeImageTesting.webp",
      fileSize: 747044,
      fileType: "image",
      isPublic: true,
      mimetype: "image/webp",
      updatedAt: "2023-09-21T13:45:15.406Z",
      fileRef: {
        _id: "202e6a48-3d26-4f02-9486-184bd4987f24",
      },
      uri: "https://mojo-development.fra1.digitaloceanspaces.com/users/afd528c7-012a-4e24-b140-a72f7919eeca/files/1695303910713-hugeImageTesting.webp",
    },
  ],
  geographicalRegion: null,
  geoLocation: {
    lat: 52.5170365,
    lng: 13.3888599,
  },
  ghgProgram: {
    id: "icr",
    title: "International Carbon Registry",
    content:
      "The International Carbon Registry operates an international greenhouse gas program for the registration of climate projects and issuance of high-integrity carbon credits.",
    extraTitle: null,
  },
  headline: "",
  isCriteriaForValidation: true,
  isCriteriaForVerification: true,
  isDeviatesFromMethodology: false,
  isGroupedProject: false,
  isHostCountryApproval: false,
  isInformationUpdatedRegularly: false,
  isInReview: true,
  isMethodology: true,
  isSpanArea: false,
  isTransitioningFromOtherGHGProgram: false,
  linkToProject: null,
  media: [
    {
      _id: "1570",
      createdAt: "2023-09-16T22:21:51.665Z",
      description: "aaaaaa",
      fileName: "001_435_boerderij-image-1543868.jpeg",
      fileSize: 2052473,
      fileType: "image",
      isPublic: true,
      mimetype: "image/jpeg",
      updatedAt: "2023-09-16T22:21:51.665Z",
      fileRef: {
        _id: "bdcf7539-2515-4287-86b1-5dad15d94639",
      },
      uri: "https://mojo-development.fra1.digitaloceanspaces.com/users/63ff52d1fcb6fcb31d7e46c4/files/1686501415195-001_435_boerderij-image-1543868.jpeg",
    },
    {
      _id: "1910",
      createdAt: "2023-09-21T13:45:15.406Z",
      description: "Thisimage is HUGE",
      fileName: "hugeImageTesting.webp",
      fileSize: 747044,
      fileType: "image",
      isPublic: true,
      mimetype: "image/webp",
      updatedAt: "2023-09-21T13:45:15.406Z",
      fileRef: {
        _id: "202e6a48-3d26-4f02-9486-184bd4987f24",
      },
      uri: "https://mojo-development.fra1.digitaloceanspaces.com/users/afd528c7-012a-4e24-b140-a72f7919eeca/files/1695303910713-hugeImageTesting.webp",
    },
  ],
  methodology: {
    id: "AMS-III.AP.",
    title: "AMS-III.AP.",
  },
  methodologyDeviationDescription: "asdasdasdasd",
  mrvCycle: null,
  num: 5,
  onChainId:
    "101505019018752555554820562566524838698013395512834243783522224345889386792767",
  otherBenefits: [
    {
      title: "SDG 2: No Poverty",
      checked: true,
      benefitId: 1,
      description: "So many nice things",
    },
    {
      title: "SDG 5: Gender Equality",
      checked: true,
      benefitId: 4,
      description: "You know it man!",
    },
    {
      title: "SDG 9: Industry, Innovation and Infrastructure",
      checked: true,
      benefitId: 8,
      description: "Skerny berny",
    },
  ],
  owner: {
    fullName: "The Industry Incorporated",
    ref: {
      type: [],
      termsAccepted: true,
      _id: "3844ff2e-9a7f-48b4-ab57-b7c02f2dc9dd",
      id: "3844ff2e-9a7f-48b4-ab57-b7c02f2dc9dd",
      city: "Reykjavik",
      website: "carbonics.com",
      isPublic: false,
      companyLogo: {
        uri: "https://mojo-development.fra1.digitaloceanspaces.com/users/63ff52d1fcb6fcb31d7e46c4/files/1686501359525-compLogo.svg",
      },
      companyType: "regular",
      countryCode: "FI",
      fullName: "The Industry Incorporated",
      physicalAddress: "Glacier Boulevard 12",
      registrationNumber: "",
    },
  },
  participants: [
    {
      email: "gummi11+65@gmail.com",
      fullName: "Guðmundur Sigbergsson",
      roles: [],
      userRef: {
        _id: "418cfb09-f61d-44c9-b7a7-6471065c8c17",
        keys: [],
        stellarAccounts: {
          issuerAccount: {},
          distributionAccount: {},
        },
      },
    },
    {
      email: "omar@konstant.is",
      fullName: "omaroskars",
      roles: [],
      userRef: {
        _id: "0494a023-9ec2-4c75-ba50-8d1c250bfe2f",
        keys: [],
        stellarAccounts: {
          issuerAccount: {},
          distributionAccount: {},
        },
      },
    },
    {
      email: "thor+44@mojoflower.io",
      fullName: "Þórður Ágústsson",
      roles: [],
      userRef: {
        _id: "49225ed5-1a3c-4fad-b324-d3bb39e261a3",
        keys: [],
        stellarAccounts: {
          issuerAccount: {},
          distributionAccount: {},
        },
      },
    },
    {
      email: "oli+1@mojoflower.io",
      fullName: "Oli Torfason",
      roles: [],
      userRef: {
        _id: "e519f50b-c03d-4934-b66f-6354b8a63c7c",
        keys: [],
        stellarAccounts: {
          issuerAccount: {},
          distributionAccount: {},
        },
      },
    },
  ],
  projectContracts: [
    {
      address: "0xb3eba1a2472d431ad0a34b725118a6c898ce1052",
      chainId: "",
      projectId: "9c4e2311-005c-419a-a334-1bc331b137c8",
    },
  ],
  projectType: {
    id: "avoidance",
    title: "Avoidance / Reduction",
    content:
      "Avoiding or reducing GHG emissions via direct GHG avoidance/reduction measures.",
    extraTitle: null,
  },
  sector: {
    id: "7",
    title: "Transport",
  },
  sequestrationPermanenceInYears: null,
  shortDescription: "",
  state: null,
  statusState: "accepted",
  streetName: null,
  updatedAt: "2023-07-03T08:39:06.934Z",
  validationBody: {
    fullName: "Skjaldböku Project",
  },
  status: "under development",
  validationCriteria: [
    {
      title: "ISO 14064-2:2019",
      checked: true,
      criteriaId: 0,
      description: "",
    },
    {
      title: "Forest carbon code",
      checked: true,
      criteriaId: 3,
      description: "",
    },
  ],
  verificationCriteria: [
    {
      title: "ICR requirements v4.0",
      checked: true,
      criteriaId: 2,
      description: "",
    },
    {
      title: "Applied methodology",
      checked: true,
      criteriaId: 5,
      description: "",
    },
  ],
  website: "",
  zip: null,
};

export const MOCK_USER_PROFILE: UserProfile = {
  address: MOCK_ADDRESS,
  createdAt: new Date("1970-01-01T00:00:00Z").getTime(),
  description: "Some description",
  handle: "SomeHandle",
  updatedAt: new Date("2023-11-11T15:05:08Z").getTime(),
  username: "someusername",
  profileImgUrl: null,
};

export const EXPECTED_USER_RESPONSE = {
  ...omit(MOCK_USER_PROFILE, ["address", "updatedAt", "createdAt"]),
  updatedAt: 1699715108,
  createdAt: 0,
  wallet: MOCK_USER_PROFILE.address,
  listings: [],
  activities: [],
  assets: [],
};

import PDFKit from "pdfkit";
import { StaticImageData } from "next/legacy/image";
import { trimWithLocale } from "@klimadao/lib/utils";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";
import { RetirementToken } from "@klimadao/lib/constants";
// import { urls } from "@klimadao/lib/constants";

// import KlimaLogo from "public/logo-klima.png";
import { bgImageNCT } from "./images/bgImageNCT";

// import bctBackground from "public/bg_bct.jpeg";
// import nctBackground from "public/bg_nct.jpeg";
// import nboBackground from "public/bg_nbo.jpeg";
// import uboBackground from "public/bg_ubo.jpeg";
// import mco2Background from "public/bg_mco2.jpeg";

import { PoppinsExtraLight } from "./poppinsExtraLightbase64";
import { PoppinsBold } from "./poppinsBoldbase64";

type Params = {
  beneficiaryName: string;
  beneficiaryAddress: string;
  projectDetails?: VerraProjectDetails;
  retirement: KlimaRetire;
  retirementIndex: string;
  retirementMessage: string;
  retirementUrl: string;
  tokenData: {
    key: string;
    icon: StaticImageData;
    label: Uppercase<RetirementToken>;
  };
};

const KLIMA_GREEN = "#00cc33";
const PRIMARY_FONT_COLOR = "#313131";
// const SECONDARY_FONT_COLOR = "#767676";
const spacing = {
  margin: 42.5,
  mainTextWidth: 160,
  beneficiaryName: 81,
  transactionDetails: 358,
  projectDetails: 419,
  tokenImage: { x: 145, y: 158 },
  retirementLink: 555,
};

// type FeatureImageMappingKey = keyof typeof featureImageMap;
// const featureImageMap = {
//   bct: bctBackground,
//   nct: nctBackground,
//   ubo: uboBackground,
//   nbo: nboBackground,
//   mco2: mco2Background,
// };

// const getImageDataURI = async (url: string) => {
//   const response = await fetch(url);
//   const arrayBuffer = await response.arrayBuffer();
//   // const base64 = Buffer.from(new Uint8Array(arrayBuffer)).toString("base64");
//   // console.log(arrayBuffer);

//   const image = await axios.get(url, { responseType: "arraybuffer" });
//   // console.log(image.data);
//   return image.data;
// };

export const generateCertificate = (params: Params): PDFKit.PDFDocument => {
  const isMossRetirement = params.retirement.offset.bridge === "Moss";
  const fileName = `retirement_${params.retirementIndex}_${params.beneficiaryAddress}`;

  const doc = new PDFKit({
    layout: "landscape",
    size: "LETTER",
    compress: true,
    info: { Title: `${fileName}.pdf` },
    margin: 0,
  });

  const setupFonts = () => {
    doc.registerFont("Bold", Buffer.from(PoppinsBold, "base64"));
    doc.registerFont("Normal", Buffer.from(PoppinsExtraLight, "base64"));
  };

  // TODO need more spacing between header text
  const printHeader = (): void => {
    // doc.image("public/logo-klima.png", spacing.margin, spacing.margin, {
    //   width: 170,
    //   height: 28,
    // });

    doc.font("Bold");
    doc.fontSize(24);
    doc.text("Certificate for On-chain", spacing.margin, 77);
    doc.text("Carbon Retirement", spacing.margin, 105);

    doc.lineWidth(3);
    doc.moveTo(spacing.margin, 148);
    doc.lineTo(490, 148);
    doc.strokeColor(KLIMA_GREEN);
    doc.stroke();
  };

  const printFeatureImage = async (): Promise<void> => {
    try {
      // const featureImagePath =
      //   featureImageMap[params.tokenData.key as FeatureImageMappingKey].src;

      // const featureImageArrayBuffer = await getImageDataURI(
      //   "http://www.klimadao.finance/bg_nct.jpeg"
      // );

      const image = Buffer.from(bgImageNCT, "base64");
      doc.image(image, spacing.margin, 0, {
        width: doc.page.width / 3,
        height: doc.page.height,
      });
      // doc.image("public/bg_mco2.jpeg", spacing.margin + 490, 0, {
      //   width: doc.page.width / 3,
      //   height: doc.page.height,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const printRetirementDetails = (): void => {
    const retirementAmount =
      Number(params.retirement.amount) < 0.01
        ? "< 0.01"
        : trimWithLocale(params.retirement.amount, 2, "en");

    doc.fontSize(28);
    doc.font("Normal");
    doc.text(`${retirementAmount} tonnes`, spacing.margin, 169);

    doc.font("Bold");
    const beneficaryText = params.beneficiaryName || params.beneficiaryAddress;
    doc.lineGap(-13);
    // const beneficaryText = "Mark Cubano Companiessssss Worldwide Corporation";
    doc.text(beneficaryText, spacing.margin, 200, { width: 450 });

    const beneficiaryNameBlockHeight = doc.heightOfString(beneficaryText, {
      width: 450,
    });

    // const retirementMessage = params.retirementMessage;
    const retirementMessage =
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas";
    doc.font("Normal");
    doc.fontSize(12);
    doc.lineGap(-1);
    doc.text(
      retirementMessage,
      spacing.margin,
      200 + beneficiaryNameBlockHeight + 16,
      { width: 450 }
    );
  };

  const printTransactionDetails = (): void => {
    doc.fontSize(11);
    doc.font("Bold");
    doc.text(
      "Beneficiary Address:",
      spacing.margin,
      spacing.transactionDetails
    );
    doc.font("Normal");
    doc.text(
      params.beneficiaryAddress,
      spacing.margin,
      spacing.transactionDetails + 15
    );

    doc.font("Bold");
    doc.text(
      "Transaction ID:",
      spacing.margin,
      spacing.transactionDetails + 30
    );
    doc.font("Normal");
    doc.text(
      params.retirement.transaction.id,
      spacing.margin,
      spacing.transactionDetails + 45,
      {
        link: `https://polygonscan.com/tx/${params.retirement.transaction.id}`,
      }
    );
  };

  const printProjectDetails = (): void => {
    const project = params.projectDetails?.value[0];
    const retirementDate = new Date(Number(params.retirement.timestamp) * 1000);
    const formattedRetirementDate = `${retirementDate.getDate()}/${
      retirementDate.getMonth() + 1
    }/${retirementDate.getFullYear()}`;
    let projectDetails = [
      {
        label: "Project",
        value: project?.resourceName,
      },
      {
        label: "Asset Retired",
        value: params.tokenData.label,
      },
      {
        label: "Retired on",
        value: formattedRetirementDate,
      },
      {
        label: "Methodology",
        value: params.retirement.offset.methodology,
      },
      {
        label: "Type",
        value: params.retirement.offset.methodologyCategory,
      },
      {
        label: "Country/Region",
        value:
          params.retirement.offset.country || params.retirement.offset.region,
      },
      {
        label: "Vintage",
        value: new Date(Number(params.retirement.offset.vintage) * 1000)
          .getFullYear()
          .toString(),
      },
    ];

    if (isMossRetirement) {
      projectDetails = [
        {
          label: "Asset Retired",
          value: params.tokenData.label,
        },
        {
          label: "Retired on",
          value: formattedRetirementDate,
        },
      ];
    }

    // const tokenImage = new Image();
    // tokenImage.src = params.tokenData.icon.src;
    // doc.addImage(
    //   tokenImage,
    //   "JPEG",
    //   spacing.tokenImage.x,
    //   spacing.tokenImage.y,
    //   28,
    //   28
    // );

    let startPosition = spacing.projectDetails;
    projectDetails.forEach((detail) => {
      const label = `${detail.label}:`;
      doc.font("Bold");
      doc.text(label, spacing.margin, startPosition);

      doc.font("Normal");
      doc.text(
        `${detail.value}`,
        spacing.margin + doc.widthOfString(label) + 9,
        startPosition
      );

      startPosition += 16;
    });
  };

  const printRetirementLink = (): void => {
    const text = "View this retirement on ";
    doc.font("Bold");
    doc.text(text, spacing.margin, spacing.retirementLink);
    doc.fillColor(KLIMA_GREEN);
    doc.text(
      "klimadao.finance",
      spacing.margin + doc.widthOfString(text),
      spacing.retirementLink,
      { link: params.retirementUrl }
    );
    doc.fillColor(PRIMARY_FONT_COLOR);
  };

  setupFonts();
  printHeader();
  printFeatureImage();
  printRetirementDetails();
  printTransactionDetails();
  printProjectDetails();
  printRetirementLink();

  return doc;
};

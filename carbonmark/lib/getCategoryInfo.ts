import { CategoryName, CategoryNames } from "@klimadao/lib/types/carbonmark";
import { t } from "@lingui/macro";

import Agriculture from "public/category/Agriculture.png";
import EnergyEfficiency from "public/category/Energy_Efficiency.jpeg";
import Forestry from "public/category/Forestry.jpeg";
import IndustrialProcessing from "public/category/Industrial_Processing.jpeg";
import Others from "public/category/Others.png";
import OtherNatureBased from "public/category/Other_Nature_Based.png";
import RenewableEnergy from "public/category/Renewable_Energy.jpeg";

import AgricultureOutlinedIcon from "@mui/icons-material/AgricultureOutlined";
import BatterySaverIcon from "@mui/icons-material/BatterySaver";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import SvgIcon from "@mui/material/SvgIcon";

import { StaticImageData } from "next/legacy/image";

type CategoryInfoMap = {
  [key in CategoryName]: {
    key: CategoryName;
    imageSrc: StaticImageData;
    label: string;
    icon: typeof SvgIcon;
    color: string;
  };
};

export const categoryInfoMap: CategoryInfoMap = {
  "Renewable Energy": {
    key: "Renewable Energy",
    imageSrc: RenewableEnergy,
    label: t({
      id: "project.category.renewable_energy",
      message: "Renewable Energy",
    }),
    color: "#66E185",
    icon: BatterySaverIcon,
  },
  Forestry: {
    key: "Forestry",
    imageSrc: Forestry,
    label: t({
      id: "project.category.forestry",
      message: "Forestry",
    }),
    color: "#6EC6FF",
    icon: ParkOutlinedIcon,
  },
  "Other Nature-Based": {
    key: "Other Nature-Based",
    imageSrc: OtherNatureBased,
    label: t({
      id: "project.category.other_nature_based",
      message: "Other Nature-Based",
    }),
    color: "#CEC2FF",
    icon: TerrainOutlinedIcon,
  },
  Other: {
    key: "Other",
    imageSrc: Others,
    label: t({
      id: "project.category.other",
      message: "Other",
    }),
    color: "#4F5555",
    icon: EmojiNatureIcon,
  },
  "Energy Efficiency": {
    key: "Energy Efficiency",
    imageSrc: EnergyEfficiency,
    label: t({
      id: "project.category.energy_efficiency",
      message: "Energy Efficiency",
    }),
    color: "#FFCA66",
    icon: BoltOutlinedIcon,
  },
  Agriculture: {
    key: "Agriculture",
    imageSrc: Agriculture,
    label: t({
      id: "project.category.agriculture",
      message: "Agriculture",
    }),
    color: "#FFB8A3",
    icon: AgricultureOutlinedIcon,
  },
  "Industrial Processing": {
    key: "Industrial Processing",
    imageSrc: IndustrialProcessing,
    label: t({
      id: "project.category.industria_processing",
      message: "Industrial Processing",
    }),
    color: "#FF99BC",
    icon: PrecisionManufacturingOutlinedIcon,
  },
};

export const getFirstCategory = (
  categories: CategoryNames | CategoryName
): CategoryName => {
  const categoryArray = categories.split(",");
  return categoryArray[0].trim() as CategoryName;
};

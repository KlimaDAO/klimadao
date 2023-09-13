import { t } from "@lingui/macro";
import AgricultureOutlinedIcon from "@mui/icons-material/AgricultureOutlined";
import BatterySaverIcon from "@mui/icons-material/BatterySaver";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import Agriculture from "public/category/Agriculture.jpg";
import BlueCarbon from "public/category/BlueCarbon.jpg";
import EnergyEfficiency from "public/category/EnergyEfficiency.jpg";
import Forestry from "public/category/Forestry.jpg";
import IndustrialProcessing from "public/category/Industrial.jpg";
import Other from "public/category/Other.jpg";
import OtherNatureBased from "public/category/OtherNatureBased.jpg";
import RenewableEnergy from "public/category/RenewableEnergy.jpg";

export const CATEGORY_INFO = {
  "Renewable Energy": {
    key: "Renewable Energy",
    imageSrc: RenewableEnergy,
    label: t`Renewable Energy`,
    icon: BatterySaverIcon,
  },
  Forestry: {
    key: "Forestry",
    imageSrc: Forestry,
    label: t`Forestry`,
    icon: ParkOutlinedIcon,
  },
  "Other Nature-Based": {
    key: "Other Nature-Based",
    imageSrc: OtherNatureBased,
    label: t`Other Nature-Based`,
    icon: TerrainOutlinedIcon,
  },
  Other: {
    key: "Other",
    imageSrc: Other,
    label: t`Other`,
    icon: EmojiNatureIcon,
  },
  "Energy Efficiency": {
    key: "Energy Efficiency",
    imageSrc: EnergyEfficiency,
    label: t`Energy Efficiency`,
    icon: BoltOutlinedIcon,
  },
  Agriculture: {
    key: "Agriculture",
    imageSrc: Agriculture,
    label: t`Agriculture`,
    icon: AgricultureOutlinedIcon,
  },
  "Industrial Processing": {
    key: "Industrial Processing",
    imageSrc: IndustrialProcessing,
    label: t`Industrial Processing`,
    icon: PrecisionManufacturingOutlinedIcon,
  },
  "Blue Carbon": {
    key: "Blue Carbon",
    imageSrc: BlueCarbon,
    label: t`Blue Carbon`,
    icon: WaterDropOutlinedIcon,
  },
} as const;

export const getCategoryInfo = (category: keyof typeof CATEGORY_INFO) =>
  CATEGORY_INFO[category] ?? CATEGORY_INFO.Other;

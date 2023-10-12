import Image, { StaticImageData } from "next/image";

export default function OverviewCardIcon(props: {
  alt: string;
  icon: StaticImageData;
}) {
  return (
    <Image src={props.icon} width={32} height={32} alt={`${props.alt} icon`} />
  );
}

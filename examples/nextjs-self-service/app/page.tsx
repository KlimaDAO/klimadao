import { CurrentPoolPrice } from "@/components/PoolPrice";
import Hydropower from "@/public/hydropower.jpg";
import Mongolia from "@/public/mongolia.jpg";
import { Pool } from "@/types";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

/*
  Default projects
  BCT - https://www.carbonmark.com/projects/VCS-191-2008 - 0xb139c4cc9d20a3618e9a2268d73eff18c496b991
  NCT - https://www.carbonmark.com/projects/VCS-1529-2012 - 0x6362364a37f34d39a1f4993fb595dab4116daf0d
  UBO - https://www.carbonmark.com/projects/VCS-1140-2015 - 0xd6ed6fae5b6535cae8d92f40f5ff653db807a4ea
  NBO - https://www.carbonmark.com/projects/VCS-981-2014 - 0xb6ea7a53fc048d6d3b80b968d696e39482b7e578
*/

interface ProjectCard {
  id: string;
  name: string;
  address: string;
  pool: Pool;
  imageSrc: StaticImageData;
  poolDefault: boolean;
}

/** These are the default (oldest vintage) projects in each pool */
const defaultProjects: ProjectCard[] = [
  {
    id: "VCS-191-2008",
    name: "4×50 MW Dayingjiang-3 Hydropower",
    address: "0xb139c4cc9d20a3618e9a2268d73eff18c496b991",
    pool: "bct",
    imageSrc: Hydropower,
    poolDefault: true,
  },
  {
    id: "VCS-1529-2012",
    name: "Chao’Er Improved Forest Management",
    address: "0x6362364a37f34d39a1f4993fb595dab4116daf0d",
    pool: "nct",
    imageSrc: Mongolia,
    poolDefault: true,
  },
  {
    id: "VCS-1140-2015",
    name: "Henan Xinxiang 24MW Biomass Based Cogeneration",
    address: "0xd6ed6fae5b6535cae8d92f40f5ff653db807a4ea",
    pool: "ubo",
    imageSrc: Hydropower,
    poolDefault: true,
  },
  {
    id: "VCS-981-2014",
    name: "Pacajai REDD+ Project",
    address: "0xb6ea7a53fc048d6d3b80b968d696e39482b7e578",
    pool: "nbo",
    imageSrc: Hydropower,
    poolDefault: true,
  },
];

/**
 * Featured projects
 * https://www.carbonmark.com/projects/VCS-1258-2019 - Saint Nikola Wind Farm - 0x9732344d41d48b0b11d11bce29095e45bda6081f
 * https://www.carbonmark.com/projects/VCS-674-2014 - Rimba Raya Biodiversity Reserve - 0x62896f42cf1371b268db56e50d67c34f3eb1ad7a
 * https://www.carbonmark.com/projects/VCS-292-2020 - Wind Power Generation Project In Gujarat, India - 0xcced78964f1dbbf0b1c65b2068dbda2f103a8d79
 */

const featuredProjects: ProjectCard[] = [
  {
    id: "VCS-1258-2019",
    name: "Saint Nikola Wind Farm",
    address: "0x9732344d41d48b0b11d11bce29095e45bda6081f",
    pool: "bct",
    imageSrc: Hydropower,
    poolDefault: false,
  },
  {
    id: "VCS-674-2014",
    name: "Rimba Raya Biodiversity Reserve",
    address: "0x62896f42cf1371b268db56e50d67c34f3eb1ad7a",
    pool: "nct",
    imageSrc: Mongolia,
    poolDefault: false,
  },
  {
    id: "VCS-292-2020",
    name: "Wind Power Generation Project In Gujarat, India",
    address: "0xcced78964f1dbbf0b1c65b2068dbda2f103a8d79",
    pool: "bct",
    imageSrc: Hydropower,
    poolDefault: false,
  },
];

const ProjectCardRow = (props: {
  projects: ProjectCard[];
  title: string;
  description: string;
}) => {
  return (
    <>
      <div className="flex items-center justify-between space-x-4 mt-12">
        <div>
          <h2 className="text-lg font-medium text-gray-900">{props.title}</h2>
          <p className="text-md">{props.description}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
        {props.projects.map((project) => (
          <div key={project.id} className="group relative">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              <Image
                placeholder="blur"
                width={600}
                height={600}
                src={project.imageSrc}
                alt="Generic project image"
                className="object-cover object-center"
              />
              <div
                className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                aria-hidden="true"
              >
                <div className="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                  View project
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
              <h3>
                <Link href={`/${project.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {project.id}
                </Link>
              </h3>
              {/* @ts-expect-error Async Server Component */}
              <CurrentPoolPrice
                pool={project.pool}
                mode={project.poolDefault ? "default" : "selective"}
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">{project.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default function Example() {
  return (
    <div className="flex-grow">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-medium">Carbon Retirement API Demo</h1>
        <p className="text-sm max-w-3xl mt-2">
          This application demonstrates how easy it is to add carbon credit
          retirements to any frontend or backend application. In fact, it's
          possible for anyone to build a complete carbon offset retail
          storefront using only public, open-source infrastructure. To learn
          more about how it works, check out the{" "}
          <a
            className="font-semibold text-indigo-700 underline"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/KlimaDAO/klimadao/tree/staging/examples/nextjs-self-service"
          >
            source code and README
          </a>{" "}
          and be sure to view our{" "}
          <a
            className="font-semibold text-indigo-700 underline"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/KlimaDAO/klimadao/tree/staging/examples"
          >
            other examples
          </a>
          .
        </p>
        <p className="text-sm max-w-3xl mt-2">
          All prices shown are the real-time market-rates for real carbon
          assets. Select a project to continue 👇
        </p>
        <ProjectCardRow
          projects={defaultProjects}
          title="Default projects"
          description="These projects can be retired for zero additional fee."
        />
        <ProjectCardRow
          projects={featuredProjects}
          title="Featured projects"
          description="These projects have newer vintages, but will incur a project selection fee."
        />
      </div>
    </div>
  );
}

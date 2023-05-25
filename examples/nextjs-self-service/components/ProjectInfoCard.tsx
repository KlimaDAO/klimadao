import { Pool } from "@/types";
import { fetchPoolPrice } from "@/utils/fetchPoolPrice";
import { fetchProjectInfo } from "@/utils/fetchProjectInfo";
import { isDefaultProjectAddress } from "@/utils/isDefaultProjectAddress";
import Image from "next/image";
import { ReactNode } from "react";

const InfoCard = (props: {
  name: ReactNode;
  badges: ReactNode;
  prices: ReactNode;
}) => {
  return (
    <div className="mt-10 lg:mt-0">
      <h2 className="text-lg font-medium text-gray-900">Project info</h2>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="flex px-4 py-6 sm:px-6">
            <div className="flex-shrink-0">
              <Image
                src="/sapling.jpg"
                alt="placeholder image"
                width={80}
                height={120}
                className="w-20 rounded-md"
              />
            </div>

            <div className="ml-6 flex flex-1 flex-col">
              <div className="flex">
                <div className="min-w-0 flex-1">
                  {props.name}
                  <div className="flex gap-1 mt-2">{props.badges}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
          {props.prices}
        </dl>
      </div>
    </div>
  );
};

export function ProjectInfoCardSkeleton() {
  return (
    <InfoCard
      name={<div className="w-full h-5 bg-gray-200 rounded animate-pulse" />}
      badges={
        <>
          <div className="bg-gray-200 rounded w-14 h-5 animate-pulse" />
          <div className="bg-gray-200 rounded w-16 h-5 animate-pulse" />
          <div className="bg-gray-200 rounded w-20 h-5 animate-pulse" />
        </>
      }
      prices={
        <>
          <div className="w-full h-5 animate-pulse rounded bg-gray-200" />
          <div className="w-full h-5 animate-pulse rounded bg-gray-200" />
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="w-full bg-gray-200 rounded animate-pulse h-6" />
          </div>
        </>
      }
    />
  );
}

export async function ProjectInfoCard(props: {
  projectKey: string;
  quantity: number;
}) {
  const projectInfo = await fetchProjectInfo(props.projectKey);

  /* The carbonmark API is in beta, at this time the prices data is unsorted */
  const cheapestPoolPrice = projectInfo.prices.sort(
    (a, b) => Number(a.singleUnitPrice) - Number(b.singleUnitPrice)
  )[0];

  const cheapestPool = cheapestPoolPrice.name.toLowerCase() as Pool;

  const latestPoolPrice = await fetchPoolPrice({
    pool: cheapestPool,
    quantity: 1,
    mode: isDefaultProjectAddress(projectInfo.projectAddress)
      ? "default"
      : "selective",
  });

  const total = (props.quantity * Number(latestPoolPrice)).toFixed(4);
  return (
    <InfoCard
      name={<h4 className="text-sm font-semibold">{projectInfo.name}</h4>}
      badges={
        <>
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            {projectInfo.key}
          </span>
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            {projectInfo.methodologies[0].id}
          </span>
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            {projectInfo.methodologies[0].category}
          </span>
        </>
      }
      prices={
        <>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-500">Market price (incl. fees)</dt>
            <dd className="text-sm font-semibold text-gray-900">
              ${Number(latestPoolPrice).toFixed(2)}{" "}
              <span className="font-medium text-gray-500">/ Tonne</span>
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-500">Remaining supply</dt>
            <dd className="text-sm font-semibold text-gray-900">
              {Number(cheapestPoolPrice.leftToSell).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              <span className="font-medium text-gray-500">Tonnes</span>
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-500">Quantity to retire</dt>
            <dd className="text-sm font-semibold text-gray-900">
              {props.quantity}{" "}
              <span className="font-medium text-gray-500">Tonnes</span>
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base font-medium">Total retirement cost</dt>
            <dd className="text-base font-semibold text-gray-900">${total}</dd>
          </div>
        </>
      }
    />
  );
}

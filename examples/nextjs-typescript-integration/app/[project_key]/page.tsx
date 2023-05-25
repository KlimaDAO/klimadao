import {
  ProjectInfoCard,
  ProjectInfoCardSkeleton,
} from "@/components/ProjectInfoCard";
import { RetireCarbonForm } from "@/components/RetireCarbonForm";
import { Pool } from "@/types";
import { fetchProjectInfo } from "@/utils/fetchProjectInfo";
import { Suspense } from "react";

const QUANTITY = 0.001;

interface Props {
  params: {
    project_key: string;
  };
}

export const revalidate = 120;
export default async function Example(props: Props) {
  const projectInfo = await fetchProjectInfo(props.params.project_key);

  /* The carbonmark API is in beta, at this time the prices data is unsorted */
  const cheapestPoolPrice = projectInfo.prices.sort(
    (a, b) => Number(a.singleUnitPrice) - Number(b.singleUnitPrice)
  )[0];

  const cheapestPool = cheapestPoolPrice.name.toLowerCase() as Pool;

  return (
    <div className="flex-grow">
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Retirement details
                </h2>
                <p className="text-sm mt-3">
                  All retirement details are written to a blockchain as
                  permanent public record. Do not expose any personal or
                  sensitive information.
                </p>
                <RetireCarbonForm
                  defaultQuantity={QUANTITY}
                  pool={cheapestPool}
                  projectTokenAddress={projectInfo.projectAddress}
                />
              </div>
            </div>
            {/* Project info */}
            <Suspense fallback={<ProjectInfoCardSkeleton />}>
              {/* @ts-expect-error Async Server Component */}
              <ProjectInfoCard
                projectKey={props.params.project_key}
                quantity={QUANTITY}
              />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

// Hioghly inspired by https://github.com/fountainhead/action-wait-for-check

import { getOctokit } from "@actions/github";
import { STATUS_PENDING, StatusApiResult } from "./status-api.result";
import { wait } from "./wait";

export interface Options {
  octokit: ReturnType<typeof getOctokit>;
  log: (message: string) => void;

  statusURL: string;
  timeoutSeconds: number;
  intervalSeconds: number;
  owner: string;
  repo: string;
  ref: string;
}

export const poll = async (options: Options): Promise<string> => {
  const {
    octokit,
    log,
    statusURL,
    timeoutSeconds,
    intervalSeconds,
    owner,
    repo,
    ref,
  } = options;

  let now = new Date().getTime();
  const deadline = now + timeoutSeconds * 1000;

  while (now <= deadline) {
    log(`Retrieving status checks for URL ${statusURL}...`);

    const result: StatusApiResult = await octokit.request(`GET ${statusURL}`, {
      owner,
      repo,
      ref,
    });

    log(`GET request status code: ${result.status}`);

    if (result.status !== 200) {
      return Promise.reject(`Not a valid GET request to URL: ${statusURL}`);
    }

    const { data } = result;

    log(`Status check result: ${data.state}`);

    if (data.state === STATUS_PENDING && !data.statuses.length) {
      return Promise.reject(
        "No external service found for this reference. Please check your implementation for the Status API https://docs.github.com/en/rest/reference/commits#commit-statuses"
      );
    }

    if (data.state !== STATUS_PENDING && data.statuses.length) {
      log(
        `ALL EXTERNAL CHECKS SUCCESSFULLY COMPLETED WITH STATUS: ${data.state}`
      );
      return data.state;
    }

    log(
      `Status checks are still pending, waiting for ${intervalSeconds} seconds...`
    );

    // wait
    await wait(intervalSeconds * 1000);
    // start loop again with new time
    now = new Date().getTime();
  }

  log(`No completed status checks found after ${timeoutSeconds} seconds`);

  return Promise.reject(
    `ALL REQUESTS TIMED OUT until defined seconds: ${timeoutSeconds}`
  );
};

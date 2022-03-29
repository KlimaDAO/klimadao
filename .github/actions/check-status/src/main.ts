import * as core from "@actions/core";
import * as github from "@actions/github";
import { poll } from "./poll";

async function run(): Promise<void> {
  try {
    const githubWorkspacePath = process.env["GITHUB_WORKSPACE"];
    if (!githubWorkspacePath) {
      throw new Error("Not running on Github");
    }

    const token: string = core.getInput("GH_TOKEN");
    core.info(`token found`);
    // create octokit
    const octokit = github.getOctokit(token);

    const context = github.context;
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    core.info(`owner ${owner}`);
    core.info(`repo ${repo}`);
    core.info(`sha ${context.sha}`);

    const ref: string = core.getInput("ref") || context.sha;
    core.info(`ref: ${ref}`);

    const statusURL = `/repos/${owner}/${repo}/commits/${ref}/status`;
    core.info(`Status URL: ${statusURL}`);

    const finalStatus = await poll({
      octokit,
      log: (msg) => core.info(msg),
      statusURL,
      owner,
      repo,
      ref,

      timeoutSeconds: parseInt(core.getInput("timeoutSeconds") || "600"),
      intervalSeconds: parseInt(core.getInput("intervalSeconds") || "10"),
    });

    core.setOutput("status", finalStatus);
  } catch (error) {
    core.setFailed(error);
  }
}

run();

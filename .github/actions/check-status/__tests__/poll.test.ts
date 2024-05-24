import { poll } from "../src/poll";

const octokit = {
  request: jest.fn(),
};

const run = () =>
  poll({
    octokit: octokit as any,
    log: () => {},
    statusURL: "repos/owner/repo-name/commits/ref/status",
    owner: "owner",
    repo: "repo-name",
    ref: "ref",
    timeoutSeconds: 3,
    intervalSeconds: 1,
  });

describe("poll", () => {
  test("calls octokit with correct args", async () => {
    octokit.request.mockResolvedValueOnce({
      status: 200,
      data: {
        state: "failure",
        statuses: [{ id: "some-data" }],
      },
    });

    const result = await run();

    expect(result).toBe("failure");
    expect(octokit.request).toHaveBeenCalledWith(
      `GET repos/owner/repo-name/commits/ref/status`,
      {
        owner: "owner",
        repo: "repo-name",
        ref: "ref",
      }
    );
  });

  test("returns failure", async () => {
    octokit.request.mockResolvedValueOnce({
      status: 200,
      data: {
        state: "failure",
        statuses: [{ id: "some-data" }],
      },
    });

    const result = await run();

    expect(result).toBe("failure");
  });

  test("returns success", async () => {
    octokit.request.mockResolvedValueOnce({
      status: 200,
      data: {
        state: "success",
        statuses: [{ id: "some-data" }],
      },
    });

    const result = await run();

    expect(result).toBe("success");
  });

  test("polls until check is completed", async () => {
    octokit.request
      .mockResolvedValueOnce({
        status: 200,
        data: {
          state: "pending",
          statuses: [{ id: "some-data" }],
        },
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          state: "pending",
          statuses: [{ id: "some-data" }],
        },
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          state: "failure",
          statuses: [{ id: "some-data" }],
        },
      });

    const result = await run();

    expect(result).toBe("failure");
    expect(octokit.request).toHaveBeenCalledTimes(3);
  });

  test(`rejects if request status is not 200`, async () => {
    octokit.request.mockResolvedValueOnce({
      status: 404,
      data: {},
    });

    await expect(run).rejects.toStrictEqual(
      "Not a valid GET request to URL: repos/owner/repo-name/commits/ref/status"
    );
  });

  test(`rejects if data statuses is empty`, async () => {
    octokit.request.mockResolvedValueOnce({
      status: 200,
      data: {
        state: "pending",
        statuses: [],
      },
    });

    await expect(run).rejects.toStrictEqual(
      "No external service found for this reference. Please check your implementation for the Status API https://docs.github.com/en/rest/reference/commits#commit-statuses"
    );
  });

  test(`rejects if is exceeding deadline`, async () => {
    octokit.request.mockResolvedValue({
      status: 200,
      data: {
        state: "pending",
        statuses: [{ id: "some" }],
      },
    });

    await expect(run).rejects.toStrictEqual(
      "ALL REQUESTS TIMED OUT until defined seconds: 3"
    );
  });
});

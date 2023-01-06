export const pollUntil = async <T>(params: {
  fn: () => Promise<T>;
  validate: (value: T) => boolean;
  ms: number;
  maxAttempts: number;
}) => {
  let attempts = 0;
  let result = await params.fn();
  attempts++;

  if (params.maxAttempts && attempts === params.maxAttempts) {
    return Promise.reject(new Error("Exceeded max attempts"));
  }

  while (!params.validate(result)) {
    await wait(params.ms);
    result = await params.fn();
  }

  return result;
};

const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

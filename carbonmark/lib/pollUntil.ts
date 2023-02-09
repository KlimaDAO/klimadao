export const pollUntil = async <T>(params: {
  fn: () => Promise<T>;
  validate: (value: T) => boolean;
  ms: number;
  maxAttempts: number;
}) => {
  let attempts = 0;
  let result = await params.fn();

  while (!params.validate(result) && attempts < params.maxAttempts) {
    await wait(params.ms);
    result = await params.fn();
    attempts++;
  }

  if (!params.validate(result)) {
    throw new Error(`Polling failed after ${attempts} attempts`);
  } else {
    return result;
  }
};

const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

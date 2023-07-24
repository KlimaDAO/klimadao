// This function polls a given function until it returns a valid result or the maximum number of attempts is reached.
// It takes an object as a parameter with the following properties:
// - fn: The function to be polled. It should return a promise.
// - validate: A function to validate the result of the polled function.
// - ms: The interval between each poll in milliseconds.
// - maxAttempts: The maximum number of attempts before throwing an error.
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

// This function creates a promise that resolves after a specified number of milliseconds.
// It takes the number of milliseconds to wait as a parameter.
const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

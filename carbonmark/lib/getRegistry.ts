export const getRegistry = (projectKey: string): string | null => {
  if (projectKey && projectKey.startsWith("VCS")) {
    return "Verra";
  } else if (projectKey && projectKey.startsWith("TCO2")) {
    return "Toucan";
  } else {
    return null;
  }
};

import { subgraphs } from "@klimadao/lib/constants";

export const getProjectTokenInfo = async (address: string) => {
  try {
    const result = await fetch(subgraphs.carbonmark, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query ProjectTokenInfo($address: String) {
          projects(where: {projectAddress: $address}) {
            id
            projectID
            projectAddress
            methodology
            name
            projectType
            region
            registry
            updatedAt
            vintage
            key
          }
        }
                `,
        variables: {
          address: address.toLowerCase(),
        },
      }),
    });

    if (!result.ok) {
      const { message, name } = await result.json();
      const e = new Error(message);
      e.name = name;
      throw e;
    }

    const data = await result.json();
    return data.data.projects;
  } catch (error) {
    console.error("Error fetching project token info:", error);
    return null;
  }
};

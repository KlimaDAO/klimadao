/** Provide an id from subgraph, and the standard from subgraph, to make sure we have the correct prefix. */
export const normalizeProjectId = (params: {
  id: string;
  standard: string;
}) => {
  if (params.id.startsWith("VCS-") || params.id.startsWith("GS-"))
    return params.id;
  return `${params.standard}-${params.id}`;
};

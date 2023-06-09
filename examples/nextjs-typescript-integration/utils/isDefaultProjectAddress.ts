const knownDefaultProjects = [
  "0xb139c4cc9d20a3618e9a2268d73eff18c496b991", // bct
  "0x6362364a37f34d39a1f4993fb595dab4116daf0d", // nct
  "0xd6ed6fae5b6535cae8d92f40f5ff653db807a4ea", // ubo
  "0xb6ea7a53fc048d6d3b80b968d696e39482b7e578", // nbo
].map((addr) => addr.toLowerCase());

export const isDefaultProjectAddress = (projectAddress: string): boolean =>
  knownDefaultProjects.includes(projectAddress.toLowerCase());

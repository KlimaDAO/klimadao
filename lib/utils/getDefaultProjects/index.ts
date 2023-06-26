/* Default projects
BCT - https://www.carbonmark.com/projects/VCS-191-2008 - 0xb139c4cc9d20a3618e9a2268d73eff18c496b991
NCT - https://www.carbonmark.com/projects/VCS-1529-2012 - 0x6362364a37f34d39a1f4993fb595dab4116daf0d
UBO - https://www.carbonmark.com/projects/VCS-1140-2015 - 0xd6ed6fae5b6535cae8d92f40f5ff653db807a4ea
NBO - https://www.carbonmark.com/projects/VCS-981-2014 - 0xb6ea7a53fc048d6d3b80b968d696e39482b7e578
*/

/** These are the default (oldest vintage) projects in each pool */
export const defaultProjects = [
  {
    id: "VCS-191-2008",
    address: "0xb139c4cc9d20a3618e9a2268d73eff18c496b991",
    pool: "bct",
  },
  {
    id: "VCS-1529-2012",
    address: "0x6362364a37f34d39a1f4993fb595dab4116daf0d",
    pool: "nct",
  },
  {
    id: "VCS-1140-2015",
    address: "0xd6ed6fae5b6535cae8d92f40f5ff653db807a4ea",
    pool: "ubo",
  },
  {
    id: "VCS-981-2014",
    address: "0xb6ea7a53fc048d6d3b80b968d696e39482b7e578",
    pool: "nbo",
  },
];

const knownDefaultProjects = defaultProjects
  .map((p) => p.address)
  .map((addr) => addr.toLowerCase());

export const isDefaultProjectAddress = (projectAddress: string): boolean =>
  knownDefaultProjects.includes(projectAddress.toLowerCase());

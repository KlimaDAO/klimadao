export const operations = {
  get_activities: { path: "/activities", method: "get" },
  get_categories: { path: "/categories", method: "get" },
  get_countries: { path: "/countries", method: "get" },
  get_projects: { path: "/projects", method: "get" },
  "get_users-walletorhandle": { path: "/users/:walletOrHandle", method: "get" },
  post_users: { path: "/users", method: "post" },
  "put_users-wallet": { path: "/users/:wallet", method: "put" },
  get_vintages: { path: "/vintages", method: "get" },
  "get_projects-id": { path: "/projects/:id", method: "get" },
  "get_purchases-id": { path: "/purchases/:id", method: "get" },
  "post_users-login": { path: "/users/login", method: "post" },
  "get_projects-id-activity": { path: "/projects/:id/activity", method: "get" },
  "get_retirements-id-provenance": {
    path: "/retirements/:id/provenance",
    method: "get",
  },
  "post_users-login-verify": { path: "/users/login/verify", method: "post" },
  "get_retirements-klima-account-id-retirement-index": {
    path: "/retirements/klima/:account_id/:retirement_index",
    method: "get",
  },
  "get_retirements-klima-account-id-retirement-index-provenance": {
    path: "/retirements/klima/:account_id/:retirement_index/provenance",
    method: "get",
  },
} as const;

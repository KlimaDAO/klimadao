export const operations = {
  get_activities: { path: "/activities", method: "get" },
  get_categories: { path: "/categories", method: "get" },
  post_login: { path: "/login", method: "post" },
  get_projects: { path: "/projects", method: "get" },
  get_countries: { path: "/countries", method: "get" },
  get_vintages: { path: "/vintages", method: "get" },
  post_users: { path: "/users", method: "post" },
  get_purchases: { path: "/purchases", method: "get" },
  "post_login-verify": { path: "/login/verify", method: "post" },
  "get_projects-id": { path: "/projects/:id", method: "get" },
  "get_users-walletorhandle": { path: "/users/:walletOrHandle", method: "get" },
  "put_users-wallet": { path: "/users/:wallet", method: "put" },
  "get_purchases-id": { path: "/purchases/:id", method: "get" },
  "get_projects-id-activity": { path: "/projects/:id/activity", method: "get" },
} as const;

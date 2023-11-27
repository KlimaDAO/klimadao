export const operations = {
  get_categories: { path: "/categories", method: "get" },
  post_login: { path: "/login", method: "post" },
  get_projects: { path: "/projects", method: "get" },
  get_countries: { path: "/countries", method: "get" },
  get_vintages: { path: "/vintages", method: "get" },
  post_users: { path: "/users", method: "post" },
  "post_login-verify": { path: "/login/verify", method: "post" },
  "get_projects-id": { path: "/projects/:id", method: "get" },
  "get_purchases-id": { path: "/purchases/:id", method: "get" },
  "get_users-walletorhandle": { path: "/users/:walletOrHandle", method: "get" },
  "put_users-wallet": { path: "/users/:wallet", method: "put" },
} as const;

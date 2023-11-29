export const operations = {
  get_countries: { path: "/countries", method: "get" },
  post_login: { path: "/login", method: "post" },
  post_users: { path: "/users", method: "post" },
  get_projects: { path: "/projects", method: "get" },
  get_categories: { path: "/categories", method: "get" },
  get_vintages: { path: "/vintages", method: "get" },
  "get_purchases-id": { path: "/purchases/:id", method: "get" },
  "post_login-verify": { path: "/login/verify", method: "post" },
  "get_users-walletorhandle": { path: "/users/:walletOrHandle", method: "get" },
  "put_users-wallet": { path: "/users/:wallet", method: "put" },
  "get_projects-id": { path: "/projects/:id", method: "get" },
} as const;

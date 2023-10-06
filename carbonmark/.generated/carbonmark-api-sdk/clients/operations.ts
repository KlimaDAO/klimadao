export const operations = {
  get_countries: { path: "/countries", method: "get" },
  get_categories: { path: "/categories", method: "get" },
  get_projects: { path: "/projects", method: "get" },
  "get_users-walletorhandle": { path: "/users/:walletOrHandle", method: "get" },
  post_users: { path: "/users", method: "post" },
  "put_users-wallet": { path: "/users/:wallet", method: "put" },
  get_vintages: { path: "/vintages", method: "get" },
  "get_purchases-id": { path: "/purchases/:id", method: "get" },
  "get_projects-id": { path: "/projects/:id", method: "get" },
  "post_users-login": { path: "/users/login", method: "post" },
  "post_users-login-verify": { path: "/users/login/verify", method: "post" },
} as const;

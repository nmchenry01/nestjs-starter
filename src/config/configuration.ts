export const configuration = {
  // Default
  [process.env.NODE_ENV]: {
    database: {},
    server: {},
    jwt: {},
    logger: {},
  },
  development: {
    database: {},
    server: {},
    jwt: {},
    logger: {},
  },
  production: {
    database: {},
    server: {},
    jwt: {},
    logger: {},
  },
}[process.env.NODE_ENV];

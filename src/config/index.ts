import pkg from "../../package.json";

// https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const CONFIG = {
  APP: {
    NAME: pkg.name,
    VERSION: pkg.version,
    VER: `v${pkg.version[0]}`,
    DESCRIPTION: pkg.description,
    AUTHORS: pkg.authors,
    HOST: process.env.APP_HOST,
    BASE_URL: process.env.API_BASE_URL,
    PORT: process.env.NODE_ENV === "test" ? 8888 : process.env.PORT || 8080,
    ENV: process.env.NODE_ENV,
  },
  SERVER: {
    TIMEOUT: 60000, // 1m
  },
  LOG: {
    PATH: process.env.LOGGING_DIR || "logs",
    LEVEL: process.env.LOGGING_LEVEL || "info",
    MAX_FILES: process.env.LOGGING_MAX_FILES || 5,
  },
  AUTH: {
    SALT_ROUNDS: process.env.SALT_ROUNDS || "11",
    ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_DURATION || "300000",
    REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_DURATION || "86400000",
    ACCESS_TOKEN_SALT: process.env.ACCESS_TOKEN_SALT,
    REFRESH_TOKEN_SALT: process.env.REFRESH_TOKEN_SALT,
  },
  AWS: {
    ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    SECRET_KEY: process.env.AWS_SECRET_KEY,
    REGION: process.env.AWS_REGION,
    S3: {
      PATH: process.env.S3_BUCKET_PATH,
      BUCKET_NAME: process.env.S3_BUCKET_NAME,
    },
    COGNITO: {
      USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
      CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    },
  },
  EXTERNAL: {
    API_KEY: process.env.API_KEY,
  },
  ORM_CONFIG: {
    TYPE: process.env.ORM_TYPE || "mysql",
    HOST: process.env.ORM_HOST || "localhost",
    PORT: process.env.ORM_PORT || 3306,
    USERNAME: process.env.ORM_USERNAME || "root",
    PASSWORD: process.env.ORM_PASSWORD || "",
    DATABASE: process.env.ORM_DATABASE || "eCommerce",
    SYNCHRONIZE: process.env.ORM_SYNCHRONIZE || false,
    LOGGING: process.env.ORM_LOGGING || true,
    MIGRATIONTABLENAME: process.env.ORM_MIGRATIONTABLENAME || "migrations",
    ENTITY: process.env.ORM_ENTITY || ["src/db/entity/*{.ts,.js}"],
    MIGRATIONS: process.env.ORM_MIGRATIONS || ["src/db/migration/*{.ts,.js}"],
    SUBSCRIBERS: process.env.ORM_SUBSCRIBERS || [
      "src/db/subscriber/*{.ts,.js}",
    ],
    CLI: {
      entitiesDir: process.env.ORM_ENTITIES_PATH || "src/db/entity",
      migrationsDir: process.env.ORM_MIGRATIONS_PATH || "src/db/migration",
      subscribersDir: process.env.ORM_SUBSCRIBERS_PATH || "src/db/subscriber",
    },
  },
} as const;

export default CONFIG;

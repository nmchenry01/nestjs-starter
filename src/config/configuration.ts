import { Configuration } from '../interfaces/configuration.interface';
import { LogLevels } from '../modules/logger/enums/loggerLevels.enum';

export default (): Configuration =>
  ({
    // Default
    [process.env.NODE_ENV]: {
      database: {
        host: process.env.DATABASE_HOST || 'postgres',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME || 'nestjs-starter',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE) || true,
      },
      server: {
        logLevel: [
          LogLevels.DEBUG,
          LogLevels.ERROR,
          LogLevels.LOG,
          LogLevels.VERBOSE,
          LogLevels.WARN,
        ],
        port: parseInt(process.env.SERVER_PORT, 10) || 3000,
      },
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      },
    },
    development: {
      database: {
        host: process.env.DATABASE_HOST || 'postgres',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME || 'nestjs-starter',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE) || true,
      },
      server: {
        logLevel: [
          LogLevels.DEBUG,
          LogLevels.ERROR,
          LogLevels.LOG,
          LogLevels.VERBOSE,
          LogLevels.WARN,
        ],
        port: parseInt(process.env.SERVER_PORT, 10) || 3000,
      },
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      },
    },
    production: {
      database: {
        host: process.env.DATABASE_HOST || 'postgres',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME || 'nestjs-starter',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE) || false,
      },
      server: {
        logLevel: [LogLevels.ERROR, LogLevels.LOG],
        port: parseInt(process.env.SERVER_PORT, 10) || 3000,
      },
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      },
    },
  }[process.env.NODE_ENV]);

import { LogLevel } from '@nestjs/common';

export interface Configuration {
  database: {
    host: string;
    username: string;
    password: string;
    name: string;
    port: number;
    synchronize: boolean;
  };
  server: {
    logLevel: LogLevel[];
    port: number;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

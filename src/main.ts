import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { LoggerContext } from './enums/loggerContext.enum';

const APP_NAME = process.env.npm_package_name;
const APP_VERSION = process.env.npm_package_version;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger(LoggerContext.BOOTSTRAP);
  const configService = app.get(ConfigService);

  const port = configService.get('server.port');
  await app.listen(port);

  logger.log(`${APP_NAME} version ${APP_VERSION} running on ${port}`);
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(
    `Failed to bootstrap ${APP_NAME}/root level error: ${error.stack}`,
  );
  process.exit(1);
});

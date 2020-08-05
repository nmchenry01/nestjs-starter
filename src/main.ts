import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { LoggerContext } from './modules/logger/enums/loggerContext.enum';
import { LoggerService } from './modules/logger/logger.service';

const APP_NAME = process.env.npm_package_name;
const APP_VERSION = process.env.npm_package_version;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });

  const loggerService = await app.resolve(LoggerService);
  loggerService.setContext(LoggerContext.BOOTSTRAP);

  const configService = app.get(ConfigService);

  const port = configService.get('server.port');
  await app.listen(port);

  loggerService.log(`${APP_NAME} version ${APP_VERSION} running on ${port}`);
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(
    `Failed to bootstrap ${APP_NAME}/root level error: ${error.stack}`,
  );
  process.exit(1);
});

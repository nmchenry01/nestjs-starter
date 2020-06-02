import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { LoggerContext } from './enums/loggerContext.enum';
import configuration from './config/configuration';

async function bootstrap(): Promise<void> {
  // Can't access config service prior to initialization, hence using configuration object
  const app = await NestFactory.create(AppModule, {
    logger: configuration().server.logLevel,
  });

  const logger = new Logger(LoggerContext.BOOTSTRAP);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('server.port');

  await app.listen(port);

  logger.log(`Server online and listening on port ${port}`);
}
bootstrap();

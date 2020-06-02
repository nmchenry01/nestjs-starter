import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerContext } from './enums/loggerContext.enum';

async function bootstrap(): Promise<void> {
  const logger = new Logger(LoggerContext.BOOTSTRAP);

  // TODO: Add logging level configuration from env/config vars
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);

  // TODO: Swap this out with configuration variable
  logger.log(`Server online and listening on port ${3000}`);
}
bootstrap();

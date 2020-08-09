import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './repository/user.respository';
import { LoggerService } from '../logger/logger.service';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const mockLogger = new Logger();
    mockLogger.debug = jest.fn();
    mockLogger.error = jest.fn();
    mockLogger.log = jest.fn();
    mockLogger.verbose = jest.fn();
    mockLogger.warn = jest.fn();
    mockLogger.setContext = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserRepository,
        { provide: JwtService, useValue: {} },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

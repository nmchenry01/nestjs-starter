import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from './repository/user.respository';
import { LoggerService } from '../logger/logger.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockLogger = new Logger();
    mockLogger.debug = jest.fn();
    mockLogger.error = jest.fn();
    mockLogger.log = jest.fn();
    mockLogger.verbose = jest.fn();
    mockLogger.warn = jest.fn();
    mockLogger.setContext = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserRepository,
        { provide: JwtService, useValue: {} },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

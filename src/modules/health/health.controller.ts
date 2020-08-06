import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { HealthResponse } from './dto/healthResponse.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @ApiOperation({
    summary: 'Get server status',
    description: 'Check the health of the server',
  })
  @ApiOkResponse({
    description: 'Server is ok',
    type: HealthResponse,
  })
  @Get()
  checkHealth(): HealthResponse {
    return { status: 'ok' };
  }
}

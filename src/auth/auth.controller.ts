import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from './entities/auth-user.entity';
import { AuthToken } from './entities/auth-token.entity';
import { UserToken } from './entities/user-token.entity';
import { AuthDataDto } from './dto/auth-data.dto';
import { AuthMethod } from './entities/auth.types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/:authMethod')
  @ApiOperation({ summary: 'Авторизовать пользователя или отправить ссылку на авторизацию.' })
  @ApiParam({ name: 'authMethod', description: 'Метод авторизации.', enum: ['password', 'email', 'google', 'facebook'], required: false, example: 'password' })
  @ApiBody({ description: 'Данные для авторизации', type: AuthDataDto })
  @ApiResponse({ status: HttpStatus.FOUND, description: 'В случае успешной авторизации методом "password" будет выдан authToken и произойдет перенаправление на адрес GET /auth/login. ' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Error Server' })
  @ApiOkResponse({ 
    description: 'Токен сгенерирован направлен пользователю методом, указанным в authMethod (за исключением метода "password", который отдает токен прямо в JSON ответа).',
    type: AuthToken
  })
  login(@Param('authMethod') authMethod: AuthMethod, @Body() authData: AuthDataDto, @Res() res) {
  }

  @Get('login/:authToken')
  @ApiOperation({ summary: 'Авторизовать пользователя по полученному токену (отправка токена может быть осуществлена методом POST /auth/login)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Пользователь авторизован', type: AuthUser })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async loginWithToken(@Param('authToken') authToken: string) {
  }

  @Post('logout')
  @ApiBearerAuth('bearerAuth')
  @ApiOperation({ summary: 'Завершение сессии текущего пользователя' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string', description: 'Refresh token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdhZWM1MWNjLTlmMTItNDg0NC05YjcxLTM4ZTk2MGQ2ZjUyZiJ9.q1Bm-KytrkltAUBR13xr03QRMsJHA62Y4cuUFJAM31w' },
      },
    },
    description: 'Данные сеанса пользователя'
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Error Server' })
  @ApiOkResponse({ 
    description: 'Возвращает true в случае успешного завершения сессии',
    type: Boolean
  })
  logout(@Body('refreshToken') refreshToken: string) {
  }

  @Post('verify/:authMethod')
  @ApiBearerAuth('bearerAuth')
  @ApiOperation({ summary: 'Отправить ссылку для подтверждения метода авторизации.' })
  @ApiParam({ name: 'authMethod', description: 'Метод авторизации.', enum: ['email'], required: true, example: 'email' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Токен сгенерирован направлен пользователю методом, указанным в authMethod.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.TOO_MANY_REQUESTS, description: 'Too many requests' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @HttpCode(HttpStatus.OK)
  async sendVerifyLink(@Param('authMethod') authMethod: AuthMethod, @Request() request): Promise<void> {
  }

  @Get('verify/:authToken')
  @ApiBearerAuth('bearerAuth')
  @ApiOperation({ summary: 'Верифицировать метод авторизации пользователя по полученному токену (отправка токена может быть осуществлена методом POST /auth/verify)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Метод авторизации пользователя верифицирован', type: AuthUser })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @HttpCode(HttpStatus.OK)
  async verifyWithToken(@Param('authToken') authToken: string) {
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Обновить refresh-token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string', description: 'Refresh token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdhZWM1MWNjLTlmMTItNDg0NC05YjcxLTM4ZTk2MGQ2ZjUyZiJ9.q1Bm-KytrkltAUBR13xr03QRMsJHA62Y4cuUFJAM31w' },
      },
    },
    description: 'Данные refreshToken завершаемого сеанса',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorization' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiOkResponse({ 
    description: 'Обновленные токены пользователя для текущей сессии',
    type: UserToken
  })
  async refreshToken(@Body('refreshToken') refreshToken: string) {
  }

}

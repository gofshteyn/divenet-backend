import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query,Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserPreview } from './entities/user-preview.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserImageDto } from './dto/update-user-image.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiBody({ description: 'Данные для создания пользователя', type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiOkResponse({ 
    description: 'Информация о созданном пользователе',
    type: User
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @Get()
  @ApiBearerAuth('bearerAuth')
  @ApiOperation({ summary: 'Получить список пользователей' })
  @ApiQuery({ 
    name: 'page', 
    required: false,
    default: 1,
    type: Number,
    description: 'Номер страницы (по умолчанию 1)' 
  })

  @ApiQuery({ 
    name: 'limit', 
    required: false,
    default: 1,
    type: Number,
    description: 'Количество элементов на странице (по умолчанию 10)' 
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiOkResponse({ 
    description: 'Список пользователей',
    type: [UserPreview]
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('bearerAuth')
  @ApiOperation({ summary: 'Получить информацию по выбранному пользователю' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiOkResponse({ 
    description: 'Информация о выбранном пользователе',
    type: User
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('bearerAuth')
  @ApiOperation({ summary: 'Обновить информацию по выбранному пользователю' })
  @ApiBody({ description: 'Данные для обновления пользователя', type: UpdateUserDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiOkResponse({ 
    description: 'Информация об обновленном пользователе',
    type: User
  })
  update(@Body() updateUserDto: UpdateUserDto,  @Request() request) {
    return this.usersService.update(request.user.id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth('bearerAuth')
  @ApiOperation({ summary: 'Удалить выбранного пользователя' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiOkResponse({
    description: 'Возвращает true в случае успешного удаления',
    type: Boolean
  })
  remove(@Request() request) {
    return this.usersService.remove(request.user.id);
  }

  @Patch('image')
  @ApiBearerAuth('bearerAuth')
  @ApiOperation({ summary: 'Обновляет изображение пользователя (в случае успешной загрузки старое изображение удаляется с сервера)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateUserImageDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiOkResponse({
    description: 'URL к загруженному изображению',
    example: '/images/users/7aec51cc-9f12-4844-9b71-38e960d6f52f.jpg'
  })
  uploadImage() {
  }

  @Delete('image')
  @ApiBearerAuth('bearerAuth')
  @ApiOperation({ summary: 'Удалить изображение пользователя' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiOkResponse({
    description: 'Возвращает true в случае успешного удаления',
    type: Boolean
  })
  removeImage() {

  }

  @Patch('password')
  @ApiBearerAuth('bearerAuth')
  @ApiOperation({ summary: 'Сменить пароль текущего пользователя' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Пароль установлен', type: Boolean })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorization' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() request) {
  }

  @Get('username-exists')
  @ApiOperation({ summary: 'Проверить существует ли пользователь с указанным username' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Получен ответ', type: Boolean })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiOkResponse({
    description: 'Возвращает true в случае существования пользователя с указанным username и false если он отсутствует.'
  })
  async usernameExists(@Query('username') username: string) {
  }

  @Get('email-exists')
  @ApiOperation({ summary: 'Проверить существует ли пользователь с указанным email' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Получен ответ', type: Boolean })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiOkResponse({
    description: 'Возвращает true в случае существования пользователя с указанным email и false если он отсутствует.'
  })
  async emailExists(@Query('email') email: string) {
  };
}

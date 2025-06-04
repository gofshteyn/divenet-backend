import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserPreview } from './entities/user-preview.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiCreatedResponse({ 
    description: 'Информация о выбранном пользователе',
    type: User
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @ApiBearerAuth('JWT-auth')
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
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Получить информацию по выбранному пользователю' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiOkResponse({ 
    description: 'Информация о выбранном пользователе',
    type: User
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Обновить информацию по выбранному пользователю' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiOkResponse({ 
    description: 'Информация об обновленном пользователе',
    type: User
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Удалить выбранного пользователя' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiOkResponse({
    description: 'Возвращает true в случае успешного удаления',
    type: Boolean
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Обновляет изображение пользователя (в случае успешной загрузки старое изображение удаляется с сервера)' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiOkResponse({
    description: 'URL к загруженному изображению',
    type: String,
    example: '/images/users/7aec51cc-9f12-4844-9b71-38e960d6f52f.jpg'
  })
  @Patch('image')
  uploadImage() {
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Удалить изображение пользователя' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 500, description: 'Internal Error Server' })
  @ApiOkResponse({
    description: 'Возвращает true в случае успешного удаления',
    type: Boolean
  })
  @Delete()
  removeImage() {

  }
}

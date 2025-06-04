import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class AuthDataDto {
  @ApiProperty({ example: 'elfix', description: 'Имя пользователя' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'sword', description: 'Пароль' })
  @IsString()
  @IsOptional()
  password: string;
}
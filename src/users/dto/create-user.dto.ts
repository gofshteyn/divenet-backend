import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsJSON, IsString } from "class-validator";
import { Gender } from "../entities/user.entity";
import { Type } from "class-transformer";

export class CreateUserDto {

    @ApiProperty({ example: 'elfix', required: true, description: 'username пользователя' })
    @IsString()
    username: string;

    @IsString()
    @ApiProperty({ example: 'Иван', required: false, description: 'Имя пользователя' })
    firstName: string;
    
    @IsString()
    @ApiProperty({ example: 'Иванов', required: false, description: 'Фамилия пользователя' })
    lastName: string;

    @IsJSON()
    @ApiProperty({ example: { ru: 'Иван', en: 'Ivan' }, required: false, description: 'Имя пользователя в доступных локализациях' })
    firstNameLocales: JSON;

    @IsJSON()
    @ApiProperty({ example: { ru: 'Иванов', en: 'Ivanov' }, required: false, description: 'Фамилия пользователя в доступных локализациях' })
    lastNameLocales: JSON;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({ example: '1985-11-12', required: false, description: 'Дата рождения пользователя' })
    birthday: Date;

    @IsString()
    @ApiProperty({ example: Gender.MALE, required: false, description: 'Пол пользователя' })
    gender: Gender;

    @ApiProperty({ example: 'info@divenet.org', required: true, description: 'Электронная почта пользователя' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'ru', required: false, description: 'Локализация' })
    @IsString()
    localeId: string;
    
    @ApiProperty({ example: 'USDT', required: false, description: 'Валюта' })
    @IsString()
    currencyId: string;

}

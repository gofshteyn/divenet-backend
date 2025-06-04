import { ApiProperty } from "@nestjs/swagger";
import { UserPreview } from "./user-preview.entity";
import { Exclude, Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsJSON, IsOptional, IsString } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export class User extends UserPreview {

    @Expose()
    @IsString()
    @ApiProperty({ example: 'Иван', required: false, description: 'Имя пользователя' })
    firstName: string;

    @Expose()
    @IsString()
    @ApiProperty({ example: 'Иванов', required: false, description: 'Фамилия пользователя' })
    lastName: string;

    @Expose()
    @IsJSON()
    @ApiProperty({ example: { ru: 'Иван', en: 'Ivan' }, required: false, description: 'Имя пользователя в доступных локализациях' })
    firstNameLocales: JSON;

    @Expose()
    @IsJSON()
    @ApiProperty({ example: { ru: 'Иванов', en: 'Ivanov' }, required: false, description: 'Фамилия пользователя в доступных локализациях' })
    lastNameLocales: JSON;

    @Expose()
    @IsDate()
    @Type(() => Date)
    @ApiProperty({ example: '1985-11-12', required: false, description: 'Дата рождения пользователя' })
    birthday: Date;

    @Expose()
    @IsString()
    @ApiProperty({ example: Gender.MALE, required: false, description: 'Пол пользователя' })
    gender: Gender;

    @Expose()
    @IsEmail()
    @ApiProperty({ example: 'info@divenet.org', required: true, description: 'Электронная почта пользователя' })
    email: string;

    @Expose()
    @IsBoolean()
    @ApiProperty({ example: true, required: true, description: 'Email верифицирован' })
    emailVerified: boolean;

    @Expose()
    @IsString()
    @ApiProperty({ example: 'ru', required: false, description: 'Локализация' })
    localeId: string;

    @Expose()
    @IsString()
    @ApiProperty({ example: 'USDT', required: false, description: 'Валюта' })
    currencyId: string;

    @Exclude()
    @IsString()
    passwordHash: string;

    @Exclude()
    @IsBoolean()
    deleted: boolean;

}

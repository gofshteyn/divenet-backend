import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChangePasswordDto {

    @ApiProperty({ example: 'sword', required: true, description: 'Пароль пользователя' })
    @IsString()
    password: string;

}
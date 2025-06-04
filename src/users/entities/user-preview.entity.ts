import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsJSON, IsString, IsUrl, isURL, IsUUID } from "class-validator";

export class UserPreview {

    @Expose()
    @IsUUID()
    @ApiProperty({ example: '7aec51cc-9f12-4844-9b71-38e960d6f52f', required: true, description: 'id пользователя' })
    id: string;

    @Expose()
    @IsString()
    @ApiProperty({ example: 'elfix', required: true, description: 'username пользователя' })
    username: string;

    @Expose()
    @IsUrl()
    @ApiProperty({ example: '/images/users/7aec51cc-9f12-4844-9b71-38e960d6f52f.jpg', required: false, description: 'Ссылка на изображение пользователя' })
    imageUrl: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;

}

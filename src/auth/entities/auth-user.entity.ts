import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class AuthUser extends User {

    @Expose()
    @IsString()
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdhZWM1MWNjLTlmMTItNDg0NC05YjcxLTM4ZTk2MGQ2ZjUyZiJ9.q1Bm-KytrkltAUBR13xr03QRMsJHA62Y4cuUFJAM31w', required: true, description: 'accessToken содержит только идентификатор пользователя.' })
    accessToken: string;

    @Expose()
    @IsString()
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdhZWM1MWNjLTlmMTItNDg0NC05YjcxLTM4ZTk2MGQ2ZjUyZiJ9.q1Bm-KytrkltAUBR13xr03QRMsJHA62Y4cuUFJAM31w', required: true, description: 'refreshToken содержит только идентификатор пользователя.' })
    refreshToken: string;

}
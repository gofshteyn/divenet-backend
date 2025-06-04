import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserImageDto {
  @ApiProperty({ 
    type: 'string',
    format: 'binary',
    description: 'Файл',
    required: true
  })
  file: Express.Multer.File;
}
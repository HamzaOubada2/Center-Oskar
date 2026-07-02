import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @ApiProperty({example: 'teacher@centerOskar.ma',  description: 'The registred email address'})
    @IsEmail({},{message: 'Please Enter a valid Email address'})
    @IsNotEmpty()
    email:string;


    @ApiProperty({ example: 'password123', description: 'The user password' })
    @IsString()
    @IsNotEmpty()
    password: string;
}

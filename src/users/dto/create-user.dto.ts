import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from 'enum/user.enum';


export class CreateUserDto {
    @ApiProperty({example: 'teacher@school.com', description: 'This Email of User'})
    @IsEmail({}, {message: 'Please Enter a valid Email address'})
    @IsNotEmpty()
    email:string;


    @ApiProperty({example: 'password123', description: 'The Password (min 6 char)'})
    @IsString()
    @MinLength(6, {message: 'Password Must be at least 6 characters long'})
    @IsNotEmpty()
    password: string;


    @ApiProperty({example:'Professor Hamza', description:'The Full Name of the User'})
    @IsString()
    @IsNotEmpty()
    name:string;

    
    @ApiProperty({example: 'STUDENT', enum: UserRole, required: false})
    @IsEnum(UserRole, {message: 'Invalid role Type'})
    @IsOptional()
    role?: UserRole;
}

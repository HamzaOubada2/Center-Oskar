import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users & Registration')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({summary: 'Register a new user (student/Teacher/Admin)'})
  @ApiResponse({status: 201, description: 'User Successfully created', type: User})
  @ApiResponse({status: 409, description: 'Email already Exists. '})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get('findByEmail')
  @ApiOperation({ summary: 'Find a user by their email address' })
  @ApiQuery({ name: 'email', required: true, example: 'teacher@school.com', description: 'The email of the user to search for' })
  @ApiResponse({ status: 200, description: 'User found successfully.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })

  async findByEmail(@Query('email') email:string) {
    const user = await this.usersService.findByEmail(email);

    if(!user) {
      throw new NotFoundException(`User with email ${email} not Found`)
    }

    delete (user as any).password;
    return user;
  }

}

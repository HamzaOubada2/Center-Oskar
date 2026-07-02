import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/create-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  @ApiOperation({summary: 'Login user and return JWT access Token'})
  @ApiResponse({status: 200, description: 'Successfully logged in , Retuens JWT token.'})
  @ApiResponse({status: 401, description: 'Unauthorized. Invalid credentials'})
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }
}

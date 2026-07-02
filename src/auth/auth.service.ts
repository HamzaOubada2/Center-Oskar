import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}


  async login(loginDto: LoginDto): Promise<{accessToken: string}> {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email)
    if(!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid Email or Password');
    }

    const payload = {sub: user.id, email: user.email, role: user.role};
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}

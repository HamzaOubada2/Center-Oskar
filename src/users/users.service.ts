import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
    ) {}


    async create(createUserDto: CreateUserDto): Promise<User> {
      const {email, password, name, role} = createUserDto;

      const existingUser = await this.usersRepository.findOne({where: {email}})
      if(existingUser) {
        throw new ConflictException('This Email is already registred!');
      }

      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);


      const user = this.usersRepository.create({
        email,
        password: hashPassword,
        name,
        role
      })

      const savedUser = await this.usersRepository.save(user);

      // remove password before returning (cast to any to satisfy TS delete operand constraints)
      delete (savedUser as any).password;
      return savedUser;
    }


    async findByEmail(email:string): Promise<User | null> {
      return this.usersRepository.findOne({where: {email}});
    }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAuthDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createAuthDto);
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail || 'El usuario ya existe');
    }
    console.log(error);
    throw new InternalServerErrorException(
      'Error al crear el usuario, consulte los logs',
    );
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto) {
    const findByEmail = await this.findOneByEmail(createUserDto.email);
    if (findByEmail) {
      throw Error('Email address already exist');
    }
    const user = new User(createUserDto);

    const result = await this.entityManager.save(user);
    delete result.password;

    return result;
  }

  async findAll() {
    return this.usersRepository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('user.email', 'email')
      .getRawMany();
  }

  async showOne(id: number) {
    const user = await this.findOne(id);
    delete user.password;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user) {
      user.email = updateUserDto.email;
      await this.entityManager.save(user);
    }
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const rounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, rounds);

    const user = await this.prismaService.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = this.prismaService.user.findFirst({ where: { email: email } });

    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async getUserById(id: string) {
    const user = this.prismaService.user.findFirst({ where: { id: id } });

    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }
}

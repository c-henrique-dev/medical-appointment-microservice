import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @MessagePattern({ cmd: 'createUser' })
  async login(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @MessagePattern({ cmd: 'getUserByEmail' })
  getUserByEmail(email: string): Promise<CreateUserDto> {
    return this.userService.getUserByEmail(email);
  }

  @Get()
  @MessagePattern({ cmd: 'getUserById' })
  getUserById(id: string): Promise<CreateUserDto> {
    return this.userService.getUserById(id);
  }

  @Get()
  @MessagePattern({ cmd: 'getAllUsers' })
  findAll(): Promise<CreateUserDto[]> {
    return this.userService.findAll();
  }
}

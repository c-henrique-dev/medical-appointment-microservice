import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userProxy: ClientProxy,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    const pattern = { cmd: 'createUser' };
    const payload = createUserDto;
    return this.userProxy.send<CreateUserDto>(pattern, payload).pipe(
      map((user) => ({
        ...user,
      })),
    );
  }

  getAllUsers() {
    const pattern = { cmd: 'getAllUsers' };
    const payload = {};
    return firstValueFrom(
      this.userProxy.send<CreateUserDto[]>(pattern, payload),
    );
  }
}

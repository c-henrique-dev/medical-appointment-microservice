import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/auth/user.interface';

@Injectable()
export class UserProxy {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userProxy: ClientProxy,
  ) {}

  async getUserByEmail(email: string) {
    const pattern = { cmd: 'getUserByEmail' };
    const payload = email;
    return firstValueFrom(this.userProxy.send<User>(pattern, payload));
  }

  async getUserById(id: string) {
    const pattern = { cmd: 'getUserById' };
    const payload = id;
    return firstValueFrom(this.userProxy.send<User>(pattern, payload));
  }
}

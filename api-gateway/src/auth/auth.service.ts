import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthDto, AuthTokenInfo } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authProxy: ClientProxy,
  ) {}

  getToken(authDto: AuthDto) {
    const pattern = { cmd: 'getToken' };
    const payload = authDto;
    return firstValueFrom(this.authProxy.send<AuthTokenInfo>(pattern, payload));
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserProxy } from 'src/proxy/user.proxy';
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface AuthTokenInfo {
  accessToken: string;
  id: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userProxy: UserProxy,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto): Promise<AuthTokenInfo> {
    const user = await this.userProxy.getUserByEmail(authDto.email);

    if (!user || !(await bcrypt.compare(authDto.password, user.password))) {
      throw new UnauthorizedException(
        'Credenciais inválidas. Certifique-se de que o e-mail e a senha estão corretos.',
      );
    }

    const dataInToken = {
      name: user.name,
    };

    const payload = { sub: user.id, user: dataInToken };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      id: user.id,
      name: user.name,
    };
  }
}

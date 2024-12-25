import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth')
  createUser(@Body() authDto: AuthDto) {
    return this.authService.getToken(authDto);
  }
}

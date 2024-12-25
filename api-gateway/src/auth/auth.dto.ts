export class AuthDto {
  email: string;
  password: string;
}

export interface AuthTokenInfo {
  accessToken: string;
  id: string;
  name: string;
}

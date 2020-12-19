import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    this.logger.verbose(`User "${createUserDto.username}" was signed up.`);
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  logIn(
    @Body(ValidationPipe) authCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.validateUserPassword(authCredentialsDto);
  }
}

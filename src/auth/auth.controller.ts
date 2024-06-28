import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, loginUserDto } from '../users/dto/User.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  loginUser(@Body() UserDto: loginUserDto) {
    const { email, password } = UserDto;
    return this.authService.loginUser(email, password);
  }
}

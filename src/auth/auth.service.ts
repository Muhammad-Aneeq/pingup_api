import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schemas/User.schema';
import { CreateUserDto } from '../users/dto/User.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async registerUser(createUserDto: CreateUserDto) {
    const { email, password, cpassword } = createUserDto;

    // Check if user already exists
    const existingUser = await this.usersModel.findOne({ email });
    if (existingUser) {
      throw new HttpException('User with this email already exists', 404);
    }

    // Check if passwords match
    if (password !== cpassword) {
      throw new HttpException('Passwords do not match', 404);
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user object with the hashed password
    const newUser = new this.usersModel({
      ...createUserDto,
      email,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async loginUser(email: string, password: string): Promise<any> {
    const user = await this.usersModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // here we can also create token and send it to frontend
    return {
      user,
    };
  }
}

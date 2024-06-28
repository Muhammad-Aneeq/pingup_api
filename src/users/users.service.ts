import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schemas/User.schema';
import { CreateUserDto } from './dto/User.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  getUsers() {
    return this.usersModel.find();
  }

  getUserById(id: string) {
    return this.usersModel.findById(id);
  }
  updateUser(id: string, updateUserDto: CreateUserDto) {
    return this.usersModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.usersModel.findByIdAndDelete(id);
  }
}

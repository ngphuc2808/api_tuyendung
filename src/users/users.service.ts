import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteModel<UserDocument>,
  ) {}

  handleHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  isValidPassword = (password: string, hash: string) => {
    return compareSync(password, hash);
  };

  async create(createUserDto: CreateUserDto) {
    const newPassword = this.handleHashPassword(createUserDto.password);

    let user = await this.userModel.create({
      email: createUserDto.email,
      password: newPassword,
      name: createUserDto.name,
    });

    return user;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Data not found!';
    }

    let user = await this.userModel.findOne({
      _id: id,
    });

    return user;
  }

  async findOneByUsername(username: string) {
    let user = await this.userModel.findOne({
      email: username,
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async update(updateUserDto: UpdateUserDto) {
    let user = await this.userModel.updateOne(
      { _id: updateUserDto.id },
      updateUserDto,
    );

    return user;
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Data not found!';
    }

    await this.userModel.softDelete({ _id: id });

    return { message: 'Deleted!' };
  }
}

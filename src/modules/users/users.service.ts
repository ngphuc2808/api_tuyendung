import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';

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

  async create(createUserDto: CreateUserDto, user: IUser) {
    const { name, email, password, age, gender, address, role, company } =
      createUserDto;

    const isExistEmail = await this.userModel.findOne({
      email,
    });

    if (isExistEmail) {
      throw new BadRequestException(`Email: ${email} already exists!`);
    }

    const newPassword = this.handleHashPassword(password);

    let newUser = await this.userModel.create({
      name,
      email,
      password: newPassword,
      age,
      gender,
      address,
      role,
      company,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });

    return {
      _id: newUser?.id,
      createdAt: newUser?.createdAt,
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const { name, email, password, age, gender, address } = registerUserDto;

    const isExistEmail = await this.userModel.findOne({
      email,
    });

    if (isExistEmail) {
      throw new BadRequestException(`Email: ${email} already exists!`);
    }
    const newPassword = this.handleHashPassword(password);

    let user = await this.userModel.create({
      name,
      email,
      password: newPassword,
      age,
      gender,
      address,
      role: 'USER',
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

  async update(updateUserDto: UpdateUserDto, user: IUser) {
    let updatedUser = await this.userModel.updateOne(
      { _id: updateUserDto._id },
      {
        ...updateUserDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );

    return updatedUser;
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Data not found!';
    }

    await this.userModel.softDelete({ _id: id });

    return { message: 'Deleted!' };
  }
}

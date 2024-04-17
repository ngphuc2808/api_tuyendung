import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';
import aqp from 'api-query-params';

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

    let user = await this.userModel
      .findOne({
        _id: id,
      })
      .select('-password');

    return user;
  }

  async findOneByUsername(username: string) {
    let user = await this.userModel.findOne({
      email: username,
    });

    return user;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);

    delete filter.page;

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .select('-password')
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query total: totalItems // tổng số phần tử (số bản ghi)
        total: totalItems,
      },
      result, //kết quả query
    };
  }

  async update(updateUserDto: UpdateUserDto, user: IUser) {
    try {
      const { password, ...rest } = updateUserDto;

      let updatedUser = await this.userModel.updateOne(
        { _id: updateUserDto._id },
        {
          ...rest,
          updatedBy: {
            _id: user._id,
            email: user.email,
          },
        },
      );

      return updatedUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${error.keyValue.email} already exist!`);
      }
    }
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Data not found!';
    }

    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );

    await this.userModel.softDelete({
      _id: id,
    });

    return { message: 'Deleted!' };
  }
}

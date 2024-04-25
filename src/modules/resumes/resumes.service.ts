import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from '../users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name)
    private readonly resumeModel: SoftDeleteModel<ResumeDocument>,

    @InjectModel(User.name)
    private readonly userModel: SoftDeleteModel<UserDocument>,
  ) {}

  async create(createResumeDto: CreateResumeDto, user: IUser) {
    const { url, companyId, jobId } = createResumeDto;
    const { email, _id } = user;

    const newCV = await this.resumeModel.create({
      url,
      companyId,
      jobId,
      email,
      userId: _id,
      status: 'PENDING',
      history: [
        {
          status: 'PENDING',
          updatedAt: new Date(),
          updatedBy: {
            _id,
            email,
          },
        },
      ],
      createdBy: {
        _id,
        email,
      },
    });

    return {
      _id: newCV?._id,
      createdAt: newCV?.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string, user: IUser) {
    const findUserWithRole = await this.findUserById(user._id.toString());

    let checkCompany;
    if (findUserWithRole?.company?._id && user.role.name === 'HR') {
      checkCompany = {
        companyId: findUserWithRole?.company?._id,
      };
    } else {
      checkCompany = {};
    }

    const { filter, sort, population, projection } = aqp(qs);

    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.resumeModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.resumeModel
      .find({
        ...filter,
        ...checkCompany,
      })
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .select(projection as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  async findUserById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`User not found with id=${id}!`);
    }

    const user = await this.userModel.findById(id);

    return user;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Resume not found with id=${id}!`);
    }

    const resume = await this.resumeModel.findById(id);

    return resume;
  }

  async findByUsers(user: IUser) {
    const resumes = await this.resumeModel
      .find({
        userId: user._id,
      })
      .sort('-createdAt')
      .populate([
        {
          path: 'companyId',
          select: { name: 1 },
        },
        {
          path: 'jobId',
          select: { name: 1 },
        },
      ]);

    return resumes;
  }

  async update(_id: string, status: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Resume not found with id=${_id}!`);
    }

    const updatedCV = await this.resumeModel.updateOne(
      { _id: _id },
      {
        status,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
        $push: {
          history: {
            status,
            updatedAt: new Date(),
            updatedBy: {
              _id: user._id,
              email: user.email,
            },
          },
        },
      },
    );

    return updatedCV;
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Resume not found with id=${id}!`);
    }

    await this.resumeModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );

    await this.resumeModel.softDelete({
      _id: id,
    });

    return { message: 'Deleted!' };
  }
}

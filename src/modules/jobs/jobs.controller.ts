import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  Public,
  ResponseMessage,
  SkipCheckPermission,
  User,
} from 'src/decorator/customize';
import { IUser } from 'src/modules/users/users.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @SkipCheckPermission()
  @ResponseMessage('Fetch list job with paginate')
  findAllByAdmin(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
    @User() user: IUser,
  ) {
    return this.jobsService.findAll(+currentPage, +limit, qs, user);
  }

  @Get('by-user')
  @Public()
  @ResponseMessage('Fetch list job with paginate')
  findAllByUser(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.jobsService.findAllByUser(+currentPage, +limit, qs);
  }

  @Post()
  @ResponseMessage('Create job')
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Find job')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update job')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser,
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete job')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}

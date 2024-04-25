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
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import {
  ResponseMessage,
  SkipCheckPermission,
  User,
} from 'src/decorator/customize';
import { IUser } from '../users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Get()
  @ResponseMessage('Fetch list subscribers with paginate')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.subscribersService.findAll(+currentPage, +limit, qs);
  }

  @Post()
  @ResponseMessage('Create subscriber')
  create(
    @Body() createSubscriberDto: CreateSubscriberDto,
    @User() user: IUser,
  ) {
    return this.subscribersService.create(createSubscriberDto, user);
  }

  @Get(':id')
  @ResponseMessage('Find subscriber')
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Post('skills')
  @SkipCheckPermission()
  @ResponseMessage("Get subscriber's skill'")
  getUserSkills(@User() user: IUser) {
    return this.subscribersService.getSkills(user);
  }

  @Patch()
  @SkipCheckPermission()
  @ResponseMessage('Update subscriber')
  update(
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @User() user: IUser,
  ) {
    return this.subscribersService.update(updateSubscriberDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete subscriber')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.subscribersService.remove(id, user);
  }
}

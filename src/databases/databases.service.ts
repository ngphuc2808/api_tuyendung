import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  Permission,
  PermissionDocument,
} from 'src/modules/permissions/schemas/permission.schema';
import { Role, RoleDocument } from 'src/modules/roles/schemas/role.schema';
import { User, UserDocument } from 'src/modules/users/schemas/user.schema';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class DatabasesService implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Permission.name)
    private readonly permissionModel: SoftDeleteModel<PermissionDocument>,
    @InjectModel(Role.name)
    private readonly roleModel: SoftDeleteModel<RoleDocument>,

    private configService: ConfigService,
    private userService: UsersService,
  ) {}

  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
}

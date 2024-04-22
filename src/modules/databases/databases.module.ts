import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { DatabasesController } from './databases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/users/schemas/user.schema';
import {
  Permission,
  PermissionSchema,
} from 'src/modules/permissions/schemas/permission.schema';
import { Role, RoleSchema } from 'src/modules/roles/schemas/role.schema';
import { UsersService } from 'src/modules/users/users.service';

@Module({
  controllers: [DatabasesController],
  providers: [DatabasesService, UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
})
export class DatabasesModule {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/modules/roles/schemas/role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop()
  isDeleted: boolean;

  @Prop({ type: Object })
  company: { _id: mongoose.Schema.Types.ObjectId; email: string };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Role.name })
  @IsMongoId({
    message: 'Role is a mongo id!',
  })
  role: Role;

  @Prop()
  refreshToken: string;

  @Prop({ type: Object })
  createdBy: { _id: mongoose.Schema.Types.ObjectId; email: string };

  @Prop({ type: Object })
  updatedBy: { _id: mongoose.Schema.Types.ObjectId; email: string };

  @Prop({ type: Object })
  deletedBy: { _id: mongoose.Schema.Types.ObjectId; email: string };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

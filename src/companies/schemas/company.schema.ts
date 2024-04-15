import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop()
  isDeleted: boolean;

  @Prop({ type: Object })
  createdBy: { _id: string; email: string };

  @Prop({ type: Object })
  updatedBy: { _idL: string; email: string };

  @Prop({ type: Object })
  deletedBy: { _id: string; email: string };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
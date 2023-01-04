import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
export type UserDocument = Categories & Document;

@Schema({ timestamps: false, collection: 'Categories' })
export class Categories {
  @Prop({ required: true })
  userId?: string;

  @Prop()
  businessId?: string;

  @Prop()
  name?: string;

  @Prop()
  slug?: string;

  @Prop({ default: 0 })
  type?: string;

  @Prop({ default: 0 })
  parentId?: string;

  @Prop({ default: now() })
  createdAt: string;

  @Prop({ default: now() })
  updatedAt: Date;
}
export const CategoriesSchema = SchemaFactory.createForClass(Categories);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

export type BusinessCategoryDocument = BusinessCategory & Document;

@Schema({ timestamps: true, collection: 'businessCategory' })
export class BusinessCategory {
  //General Settings/update settings
  @Prop({ required: false })
  name: string;

  //   @Prop({ default: now() })
  //   createdAt: Date;

  //   @Prop({ default: now() })
  //   updatedAt: Date;
}

export const BusinessCategorySchema =
  SchemaFactory.createForClass(BusinessCategory);

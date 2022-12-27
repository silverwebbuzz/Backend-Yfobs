import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
export type UserDocument = Business & Document;

@Schema({ timestamps: false, collection: 'Business' })
export class Business {
  @Prop()
  businessName?: string;

  @Prop()
  businessCategory?: string;

  @Prop()
  userId?: string;

  @Prop({ default: 1 })
  businessType?: string;

  @Prop({ default: now() })
  createdAt: string;
}
export const BusinessSchema = SchemaFactory.createForClass(Business);

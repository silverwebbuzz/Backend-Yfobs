import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
export type UserDocument = Product & Document;

@Schema({ timestamps: false, collection: 'Product' })
export class Product {
  @Prop()
  userId?: string;

  @Prop()
  businessId?: string;

  @Prop()
  name?: string;

  @Prop()
  slug?: string;

  @Prop()
  price?: string;

  @Prop()
  hsnCode?: string;

  @Prop()
  details?: string;

  @Prop({ default: 0 })
  isSell?: string;
  @Prop({ default: 0 })
  isBuy?: string;

  @Prop({ default: 0 })
  incomeCategory?: string;

  @Prop({ default: 0 })
  expenseCategory?: string;

  @Prop({ default: now() })
  createdAt: string;

  @Prop({ default: now() })
  updatedAt: Date;
}
export const productSchema = SchemaFactory.createForClass(Product);

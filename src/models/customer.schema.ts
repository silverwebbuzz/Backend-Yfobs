import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
export type UserDocument = Customer & Document;

@Schema({ timestamps: false, collection: 'Customer' })
export class Customer {
  @Prop()
  userId?: string;

  @Prop()
  businessId?: string;

  @Prop()
  name?: string;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop()
  thumb?: string;

  @Prop()
  address?: string;

  @Prop()
  country?: string;
  @Prop()
  countryCode?: string;

  @Prop()
  state?: string;

  @Prop()
  currency?: string;

  @Prop()
  customerName?: string;

  @Prop()
  customerNumber?: string;

  @Prop()
  businessName?: string;

  @Prop()
  businessNumber?: string;

  @Prop()
  gstNumber?: string;

  @Prop()
  vatCode?: string;

  @Prop()
  city?: string;

  @Prop()
  postalCode?: string;

  @Prop()
  address1?: string;

  @Prop()
  address2?: string;

  @Prop()
  status?: string;

  @Prop({ default: now() })
  createdAt: string;

  @Prop({ default: now() })
  updatedAt: Date;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);

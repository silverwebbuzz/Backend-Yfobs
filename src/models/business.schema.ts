import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
export type UserDocument = Business & Document;

@Schema({ timestamps: false, collection: 'Business' })
export class Business {
  @Prop()
  randomBusinessnumber?: string;

  @Prop()
  businessName?: string;

  @Prop()
  businessCategory?: string;

  @Prop()
  userId?: string;

  @Prop()
  slug?: string;

  @Prop()
  businessTitle?: string;

  @Prop()
  businessNumber?: string;

  @Prop()
  amountType?: string;

  @Prop()
  vatCode?: string;

  @Prop()
  country?: string;

  @Prop()
  address?: string;

  @Prop()
  postCode?: string;

  @Prop()
  businesscategory?: string;

  @Prop()
  businessType?: string;

  @Prop()
  isRegisteredGst?: string;

  @Prop()
  stateId?: string;

  @Prop()
  city?: string;

  @Prop()
  logo?: string;

  @Prop()
  upiQRCode?: string;

  @Prop()
  bankName?: string;

  @Prop()
  accountNumber?: string;

  @Prop()
  branchName?: string;

  @Prop()
  bankIfscCode?: string;

  @Prop({ default: 0 })
  status?: string;

  @Prop()
  isPrimary?: string;

  @Prop()
  isAutoloadAmount?: string;

  @Prop()
  templateStyle?: string;

  @Prop()
  color?: string;

  @Prop()
  footerNote?: string;

  @Prop()
  customeFooterNote?: string;

  @Prop({ default: 1 })
  gstRegisterDate?: string;

  @Prop()
  custome_for?: string;

  @Prop({ default: now() })
  createdAt: string;

  @Prop({ default: now() })
  updatedAt: Date;
}
export const BusinessSchema = SchemaFactory.createForClass(Business);

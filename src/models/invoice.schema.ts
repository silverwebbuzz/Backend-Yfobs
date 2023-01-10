import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import { Type } from 'src/enum/invoice.enum';
export type UserDocument = Invoice & Document;

@Schema({ timestamps: true, collection: 'Invoice' })
export class Invoice {
  @Prop()
  userId?: string;

  @Prop()
  businessId?: string;

  @Prop()
  title?: string;

  @Prop({ default: Type.ESTIMATES })
  type?: string;

  @Prop({ default: 0 })
  recurring?: string;

  @Prop()
  parentId?: string;

  @Prop()
  summary?: string;

  @Prop()
  estimatesNumber?: string;
  @Prop()
  posoNumber?: string;

  @Prop()
  challanNo?: string;

  @Prop({ default: 0 })
  isBankdetails?: string;

  @Prop()
  customer?: string;

  @Prop()
  date?: string;

  @Prop()
  discount?: string;

  @Prop()
  paymentDue?: string;

  @Prop()
  expireOn?: string;

  @Prop()
  dueLimit?: string;

  @Prop()
  footerNote?: string;

  @Prop()
  subTotal?: string;

  @Prop()
  tax?: string;

  @Prop()
  grandTotal?: string;

  @Prop()
  convertTotal?: string;

  @Prop({ default: 1 })
  status?: string;

  @Prop()
  ccMail?: string;

  @Prop({ default: 0 })
  isAttchpdf?: string;

  @Prop({ default: 0 })
  isSent?: string;

  @Prop({ default: 0 })
  isCompleted?: string;

  @Prop()
  sentDate?: string;

  @Prop()
  recurringStart?: string;

  @Prop()
  recurringEnd?: string;

  @Prop()
  frequency?: string;

  @Prop()
  nextPayment?: string;

  @Prop({ default: 0 })
  frequencyCount?: string;

  @Prop({ default: 0 })
  autoSend?: string;

  @Prop()
  sendMyself?: string;

  @Prop({ default: now() })
  createdAt: string;

  @Prop({ default: now() })
  updatedAt: Date;
}
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

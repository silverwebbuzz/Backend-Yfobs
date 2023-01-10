import { type } from 'os';
import { Type } from 'src/enum/invoice.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class estimatesDto {
  userId: 'string';
  businessId: 'string';
  title: 'string';

  //   @IsEnum({ default: Type.ESTIMATES })
  type: 'string';
  recurring: 'string';
  parentId: 'string';
  summary: 'string';
  estimatesNumber: 'string';
  posoNumber: 'string';
  challanNo: 'string';
  isBankdetails: 'string';
  customerId: 'string';
  date: 'string';
  discount: 'string';
  //   paymentDue: 'string';
  expireOn: 'string';
  //   dueLimit: 'string';
  footerNote: 'string';
  subTotal: 'string';
  tax: 'string';
  grandTotal: 'string';
  convertTotal: 'string';
  status: 'string';
  ccMail: 'string';
  isAttchpdf: 'string';
  isSent: 'string';
  isCompleted: 'string';
  sentDate: 'string';
  //   recurringStart: 'string';
  //   recurringEnd: 'string';
  //   frequency: 'string';
  nextPayment: 'string';
  frequencyCount: 'string';
  autoSend: 'string';
  sendMyself: 'string';
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// export type RegistrationSchema = Registration;
export type UserDocument = User & Document;
@Schema({ timestamps: true, collection: 'user' })
export class User {
  @Prop({ default: 'User' })
  role: string;

  @Prop()
  name: string;

  @Prop()
  phone: number;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  otp: string;

  @Prop()
  user_type: string;

  @Prop()
  country_name: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  postcode: string;

  @Prop()
  address: string;

  @Prop()
  business_name: string;

  @Prop()
  business_category: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

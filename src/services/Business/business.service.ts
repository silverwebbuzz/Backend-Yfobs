import {
  Body,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Business } from 'src/models/business.schema';
import { businessDto } from 'src/dto/business/business.dto';
import { CommonMethods } from 'src/common/commonMethods';
@Injectable()
//user registration
export class BusinessService {
  constructor(
    @InjectModel('Business')
    private businessModel: Model<Business>,
  ) {}
  //   async hashPassword(password: string): Promise<string> {
  //     return await bcrypt.hash(password, 10);
  //   }
  public async business(
    @Res() res,
    @Body() businessDto: businessDto,
  ): Promise<Business> {
    const business = await this.businessModel.create(businessDto);
    return CommonMethods.success(res, 'success', business);
  }
}

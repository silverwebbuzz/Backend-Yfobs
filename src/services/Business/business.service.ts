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
import { BusinessCategory } from 'src/models/businessCategory.schema';
import { BusinessCategoryDto } from 'src/dto/businessCategory/businessCategory.dto';
import { CommonMethods } from 'src/common/commonMethods';
const base64ToImage = require('base64-to-image');
@Injectable()
//user registration
export class BusinessService {
  constructor(
    @InjectModel('Business')
    private businessModel: Model<Business>,
    @InjectModel('BusinessCategory')
    private businessCategoryModel: Model<BusinessCategory>,
  ) {}
  //   async hashPassword(password: string): Promise<string> {
  //     return await bcrypt.hash(password, 10);
  //   }

  public async BusinessuploadLogo(@Res() res, @Body() body, _id) {
    if (body.file) {
      const base64Str = body.file;
      const path = './uploads/businesslogo/';
      const optionalObj = {
        fileName: '',
        type: base64Str.split(';')[0].split('/')[1],
      };

      const imageInfo = base64ToImage(base64Str, path, optionalObj);

      const filePath = `http://${process.env.HOST}:${process.env.PORT}/business/uploads/businesslogo/${imageInfo.fileName}`;
      const newLogo = await this.businessModel.findByIdAndUpdate(
        _id,
        { logo: filePath },
        {
          new: true,
        },
      );
      return CommonMethods.success(
        res,
        'Image uploaded successfully',
        200,
        newLogo,
      );
    } else {
      return CommonMethods.error(res, 400, 'Image not uploaded');
    }
  }

  public async upiQRCodeImage(@Res() res, @Body() body, _id) {
    if (body.file) {
      const base64Str = body.file;
      const path = './uploads/QRcode/';
      const optionalObj = {
        fileName: '',
        type: base64Str.split(';')[0].split('/')[1],
      };

      const imageInfo = base64ToImage(base64Str, path, optionalObj);

      const filePath = `http://${process.env.HOST}:${process.env.PORT}/business/uploads/business/QRcode/${imageInfo.fileName}`;
      const newLogo = await this.businessModel.findByIdAndUpdate(
        _id,
        { upiQRCode: filePath },
        {
          new: true,
        },
      );
      return CommonMethods.success(
        res,
        'upiQRCode uploaded successfully',
        200,
        newLogo,
      );
    } else {
      return CommonMethods.error(res, 400, 'upiQRCode not uploaded');
    }
  }

  public async business(
    @Res() res,
    @Body() businessDto: businessDto,
  ): Promise<Business> {
    const val = Math.floor(100000 + Math.random() * 900000);
    const business = await new this.businessModel(businessDto)
      .$set({ randomBusinessnumber: val })
      .save();

    if (business) {
      return CommonMethods.success(res, 'success', 200, business);
    } else {
      return CommonMethods.error(res, 'Business Not Created', 400);
    }
  }

  // getAllCategory
  async getAllCategory(res: Response): Promise<BusinessCategory> {
    const getAllCategory = await this.businessCategoryModel
      .find()
      .sort({ created_at: -1 })
      .exec();
    if (getAllCategory) {
      return CommonMethods.success(
        res,
        'Categorys List fetched successfully',
        200,
        getAllCategory,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Category exists');
    }
  }
  // Get a single Category api
  async getCategoryById(res: Response, categoryID): Promise<BusinessCategory> {
    const user = await this.businessCategoryModel.findById(categoryID).exec();
    if (user) {
      return CommonMethods.success(res, 'Success', 200, user);
    } else {
      return CommonMethods.error(res, 400, 'Category does not exists');
    }
  }
}

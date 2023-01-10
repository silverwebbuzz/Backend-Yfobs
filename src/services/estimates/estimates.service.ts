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
import { Invoice } from 'src/models/invoice.schema';
import { estimatesDto } from 'src/dto/estimates/estimates.dto';
import { searchDto } from 'src/dto/search/search.dto';
import { CommonMethods } from 'src/common/commonMethods';

@Injectable()
export class EstimatesService {
  constructor(
    @InjectModel('Estimates')
    private EstimatesModel: Model<Invoice>,
  ) {}

  /* 
service function in Create Estimates 
**/

  async createEstimates(
    @Res() res,
    @Body() estimatesDto: estimatesDto,
  ): Promise<Invoice> {
    const newEstimates = new this.EstimatesModel(estimatesDto);

    if (newEstimates) {
      await newEstimates.save();
      return CommonMethods.success(
        res,
        'New Estimates Created',
        200,
        newEstimates,
      );
    } else {
      return CommonMethods.error(res, 400, 'Oops! Not Created');
    }
  }
  /* 
service function in get all Estimates and search 
**/
  async getAllEstimates(
    res: Response,
    searchDto: searchDto,
    body,
  ): Promise<Invoice> {
    const keyword = searchDto.keyword;
    const getAllEstimate = await this.EstimatesModel.find();
    if (body.keyword) {
      const getAllEstimates = await this.EstimatesModel.find({
        $or: [
          { status: { $regex: keyword } },
          { date: { $regex: keyword } },
          { estimatesNumber: { $regex: keyword } },
          { customer: { $regex: keyword } },
          { grandTotal: { $regex: keyword } },
        ],
      });
      if (getAllEstimates.length > 0) {
        return CommonMethods.success(
          res,
          'Estimates List fetched successfully',
          200,
          getAllEstimates,
        );
      }
      return CommonMethods.error(res, 'Estimates Not Found', 300);
    } else {
      return CommonMethods.success(
        res,
        'Estimates List fetched successfully',
        200,
        getAllEstimate,
      );
    }
  }
  /* 
service function in get single Estimates 
**/
  async getEstimatesById(res: Response, estimatesId: string): Promise<Invoice> {
    const singleEstimate = await this.EstimatesModel.findById(
      estimatesId,
    ).exec();
    if (singleEstimate) {
      return CommonMethods.success(
        res,
        'Single Estimate Get Successfully',
        200,
        singleEstimate,
      );
    } else {
      return CommonMethods.error(res, 400, 'Estimates Does Not Exists');
    }
  }
  /* 
service function in update Estimates 
**/
  async updateEstimates(
    res: Response,
    estimatesId: string,
    estimatesDto: estimatesDto,
  ): Promise<Invoice> {
    const editEstimates = await this.EstimatesModel.findByIdAndUpdate(
      estimatesId,
      estimatesDto,
      { new: true },
    );
    if (editEstimates) {
      return CommonMethods.success(
        res,
        'Estimates Edited Successfully',
        200,
        editEstimates,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Estimates Present');
    }
  }

  /* 
service function in delete Estimates 
**/
  async deleteEstimates(res: Response, estimatesId: string): Promise<any> {
    const deleteEstimates = await this.EstimatesModel.findByIdAndDelete(
      estimatesId,
    );
    if (deleteEstimates) {
      return CommonMethods.success(
        res,
        'Estimates Deleted successfully',
        200,
        [],
      );
    } else {
      return CommonMethods.error(res, 400, 'No Estimates Present');
    }
  }
}

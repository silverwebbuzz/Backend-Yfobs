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
import { Categories } from 'src/models/categories.schema';
import { CategoryDto } from 'src/dto/categories/categories.dto';
import { CommonMethods } from 'src/common/commonMethods';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categories')
    private CategoriesModel: Model<Categories>,
  ) {}

  //Create Categories

  async createCategories(
    @Res() res,
    @Body() CategoryDto: CategoryDto,
  ): Promise<Categories> {
    const newCategory = new this.CategoriesModel(CategoryDto);
    if (newCategory) {
      await newCategory.save();
      return CommonMethods.success(res, 'CategoryCreated', 200, newCategory);
    } else {
      return CommonMethods.error(res, 400, 'Category Not Created');
    }
  }

  //get All Categories
  async getAllCategories(res: Response): Promise<Categories> {
    const getAllCategory = await this.CategoriesModel.find()
      .sort({ created_at: -1 })
      .exec();
    if (getAllCategory) {
      ``;
      return CommonMethods.success(
        res,
        'Categories List fetched successfully',
        200,
        getAllCategory,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Categories exists');
    }
  }
  // Get a single Package
  async getPackageById(res: Response, CategoriesID): Promise<Categories> {
    const singleCategories = await this.CategoriesModel.findById(
      CategoriesID,
    ).exec();
    if (singleCategories) {
      return CommonMethods.success(res, 'Success', 200, singleCategories);
    } else {
      return CommonMethods.error(res, 400, 'Categories does not exists');
    }
  }
  //update  package
  async updatePackage(
    res: Response,
    CategoriesID,
    CategoryDto: CategoryDto,
  ): Promise<Categories> {
    const editCategories = await this.CategoriesModel.findByIdAndUpdate(
      CategoriesID,
      CategoryDto,
      { new: true },
    );
    if (editCategories) {
      return CommonMethods.success(
        res,
        'Categories edited successfully',
        200,
        editCategories,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Categories present');
    }
  }

  // Delete package
  async deleteCategories(res: Response, CategoriesID): Promise<any> {
    const deleteCategories = await this.CategoriesModel.findByIdAndDelete(
      CategoriesID,
    );
    if (deleteCategories) {
      return CommonMethods.success(
        res,
        'Categories Deleted successfully',
        200,
        [],
      );
    } else {
      return CommonMethods.error(res, 400, 'No Categories present');
    }
  }
}

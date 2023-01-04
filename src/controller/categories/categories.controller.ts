import {
  Body,
  Controller,
  Post,
  Res,
  Param,
  Get,
  Delete,
  Put,
} from '@nestjs/common';

import { CategoriesService } from 'src/services/categories/categories.service';
import { CategoryDto } from 'src/dto/categories/categories.dto';
@Controller('Categories')
export class CategoryController {
  constructor(private CategoriesService: CategoriesService) {}
  //createCategories Controller
  @Post('/createCategories')
  async createCategories(@Res() res, @Body() CategoryDto: CategoryDto) {
    await this.CategoriesService.createCategories(res, CategoryDto);
  }
  //getAllCategories Controller
  @Get('/getAllCategories')
  async getAllCategory(@Res() res) {
    await this.CategoriesService.getAllCategories(res);
  }
  //getCategoryById Controller
  @Get('/getCategory/:CategoriesID')
  async getCategoryById(@Res() res, @Param('CategoriesID') CategoriesID) {
    await this.CategoriesService.getPackageById(res, CategoriesID);
  }
  //UpdateCategoriesID Controller
  @Put('/updateCategories/:CategoriesID')
  async updateCategory(
    @Res() res,
    @Param('CategoriesID') CategoriesID,
    @Body() CategoryDto: CategoryDto,
  ) {
    await this.CategoriesService.updatePackage(res, CategoriesID, CategoryDto);
  }
  //deleteCategories Controller
  @Delete('/deleteCategories/:CategoriesID')
  async deleteCategory(@Res() res, @Param('CategoriesID') CategoriesID) {
    await this.CategoriesService.deleteCategories(res, CategoriesID);
  }
}

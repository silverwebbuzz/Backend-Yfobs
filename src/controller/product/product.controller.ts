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

import { ProductService } from 'src/services/product/product.service';
import { productDto } from 'src/dto/product/product.dto';
import { searchDto } from 'src/dto/search/search.dto';
@Controller('Product')
export class ProductController {
  constructor(private ProductService: ProductService) {}
  //createProduct Controller
  @Post('/createProduct')
  async createproduct(@Res() res, @Body() productDto: productDto) {
    await this.ProductService.createproduct(res, productDto);
  }
  //getAllProduct Controller
  @Post('/getAllProduct')
  async getAllProduct(@Res() res, @Body() searchDto: searchDto, @Body() body) {
    await this.ProductService.getAllproduct(res, searchDto, body);
  }
  //getProductById Controller
  @Get('/getProduct/:productID')
  async getProductById(@Res() res, @Param('productID') productID) {
    await this.ProductService.getProductById(res, productID);
  }
  //updateProduct Controller
  @Put('/updateProduct/:productID')
  async updateProduct(
    @Res() res,
    @Param('productID') productID,
    @Body() productDto: productDto,
  ) {
    await this.ProductService.updateProduct(res, productID, productDto);
  }
  //deleteCategories Controller
  @Delete('/deleteProduct/:productID')
  async deleteCategory(@Res() res, @Param('productID') productID) {
    await this.ProductService.deleteProduct(res, productID);
  }
}

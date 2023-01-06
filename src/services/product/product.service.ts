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
import { Product } from 'src/models/product.schema';
import { productDto } from 'src/dto/product/product.dto';
import { CommonMethods } from 'src/common/commonMethods';
import { Business } from 'src/models/business.schema';
import { searchDto } from 'src/dto/search/search.dto';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private ProductModel: Model<Product>,
    @InjectModel('Business')
    private BusinessModel: Model<Business>,
  ) {}

  //Create product

  async createproduct(
    @Res() res,
    @Body() productDto: productDto,
  ): Promise<Product> {
    const newProduct = new this.ProductModel(productDto);
    // const userid = newProduct.userId;
    // const business = await this.BusinessModel.findOne({ userId: userid });
    // const businessNumber = business.randomBusinessnumber;
    if (newProduct) {
      // $set({ businessId: businessNumber })
      await newProduct.save();
      return CommonMethods.success(res, 'New Product Created', 200, newProduct);
    } else {
      return CommonMethods.error(res, 400, 'Product Not Created');
    }
  }

  //get All Products
  // async getAllproduct(res: Response): Promise<Product> {
  //   const getAllproduct = await this.ProductModel.find()
  //     .sort({ created_at: -1 })
  //     .exec();
  //   if (getAllproduct) {
  //     return CommonMethods.success(
  //       res,
  //       'Product List fetched successfully',
  //       200,
  //       getAllproduct,
  //     );
  //   } else {
  //     return CommonMethods.error(res, 400, 'No product exists');
  //   }
  // }

  async getAllproduct(
    res: Response,
    searchDto: searchDto,
    body,
  ): Promise<Product> {
    const keyword = searchDto.keyword;
    const getAllProduct = await this.ProductModel.find();
    if (body.keyword) {
      const getAllProducts = await this.ProductModel.find({
        $or: [
          { name: { $regex: keyword } },
          { hsnCode: { $regex: keyword } },
          { price: { $regex: keyword } },
        ],
      });
      if (getAllProducts.length > 0) {
        return CommonMethods.success(
          res,
          'Products List fetched successfully',
          200,
          getAllProducts,
        );
      }
      return CommonMethods.error(res, 'data not found', 300);
    } else {
      return CommonMethods.success(
        res,
        'Products List fetched successfully',
        200,
        getAllProduct,
      );
    }
  }
  // Get a single Product
  async getProductById(res: Response, productID): Promise<Product> {
    const singleproduct = await this.ProductModel.findById(productID).exec();
    if (singleproduct) {
      return CommonMethods.success(res, 'Success', 200, singleproduct);
    } else {
      return CommonMethods.error(res, 400, 'Product does not exists');
    }
  }
  //update  product
  async updateProduct(
    res: Response,
    productID,
    productDto: productDto,
  ): Promise<Product> {
    const editCategories = await this.ProductModel.findByIdAndUpdate(
      productID,
      productDto,
      { new: true },
    );
    if (editCategories) {
      return CommonMethods.success(
        res,
        'product edited successfully',
        200,
        editCategories,
      );
    } else {
      return CommonMethods.error(res, 400, 'No product present');
    }
  }

  // Delete product
  async deleteProduct(res: Response, productID): Promise<any> {
    const deleteProduct = await this.ProductModel.findByIdAndDelete(productID);
    if (deleteProduct) {
      return CommonMethods.success(
        res,
        'Product Deleted successfully',
        200,
        [],
      );
    } else {
      return CommonMethods.error(res, 400, 'No Product present');
    }
  }
}

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
import { Customer } from 'src/models/customer.schema';
import { CustomerDto } from 'src/dto/customer/customer.dto';
import { CommonMethods } from 'src/common/commonMethods';
import { Business } from 'src/models/business.schema';
const base64ToImage = require('base64-to-image');
const csvtojson = require('csvtojson');

@Injectable()
export class customerService {
  constructor(
    @InjectModel('customer')
    private customerModel: Model<Customer>,
    @InjectModel('Business')
    private BusinessModel: Model<Business>,
  ) {}

  //createCustomer api
  async createCustomer(
    @Res() res,
    @Body() CustomerDto: CustomerDto,
  ): Promise<Customer> {
    const { email } = CustomerDto;
    const checkEmail = await this.customerModel.findOne({ email: email });
    console.log(checkEmail);

    if (!checkEmail) {
      const newUser = new this.customerModel(CustomerDto);
      if (newUser) {
        await newUser.save();
        return CommonMethods.success(res, 'Customer Created', 200, newUser);
      } else {
        return CommonMethods.error(res, 400, 'Oops! Not Created');
      }
    } else {
      return CommonMethods.error(res, 300, 'Email Already Exists');
    }
  }

  //getAllCustomer api
  async getAllCustomer(res: Response): Promise<Customer> {
    const getAllCustomer = await this.customerModel
      .find()
      .sort({ created_at: -1 })
      .exec();
    if (getAllCustomer) {
      return CommonMethods.success(
        res,
        'Customer List fetched successfully',
        200,
        getAllCustomer,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Customer exists');
    }
  }
  // Get a single Customer api
  async getcustomerById(res: Response, CustomerID): Promise<Customer> {
    const user = await this.customerModel.findById(CustomerID).exec();
    if (user) {
      return CommonMethods.success(res, 'Success', 200, user);
    } else {
      return CommonMethods.error(res, 400, 'customer does not exists');
    }
  }

  //updateCustomer api
  async updateCustomer(
    res: Response,
    CustomerID,
    CustomerDto: CustomerDto,
  ): Promise<Customer> {
    const editCustomer = await this.customerModel.findByIdAndUpdate(
      CustomerID,
      CustomerDto,
      { new: true },
    );
    if (editCustomer) {
      return CommonMethods.success(
        res,
        'Customer edited successfully',
        200,
        editCustomer,
      );
    } else {
      return CommonMethods.error(res, 400, 'No Customer present');
    }
  }
  //deleteCustomer api
  async deleteCustomer(res: Response, CustomerID): Promise<Customer> {
    const deletecustomer = await this.customerModel.findByIdAndDelete(
      CustomerID,
    );
    if (deletecustomer) {
      return CommonMethods.success(
        res,
        'Customer Deleted successfully',
        200,
        [],
      );
    } else {
      return CommonMethods.error(res, 400, 'No Faqs present');
    }
  }
  //upload csvfile  customer
  async uploadCSV(res, body) {
    if (body.file) {
      const base64Str = body.file;
      const path = './uploads/customercsv/';
      const optionalObj = {
        fileName: '',
        type: base64Str.split(';')[0].split('/')[1],
      };
      const imageInfo = base64ToImage(base64Str, path, optionalObj);
      const parsedData = [];
      const errorArry = [];
      await csvtojson()
        .fromFile(`uploads/customercsv/${imageInfo.fileName}`)
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i]['Name'] == '') {
              errorArry.push('Row: ' + (i + 2) + 'Name is Required');
            }
            if (data[i]['Address'] == '') {
              errorArry.push('Row: ' + (i + 2) + ' Address Required');
            }
            if (data[i]['Email'] == '') {
              errorArry.push('Row: ' + (i + 2) + ' Email Required');
            } else if (
              !data[i]['Email'].match(
                /^[0-9a-zA-Z]+(?:(\.|\_|\-)[0-9a-zA-Z]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,4}){1,2}$/,
              )
            ) {
              errorArry.push('Row: ' + (i + 2) + ' Invalid email');
            }

            if (data[i]['Phone'] == '') {
              errorArry.push('Row: ' + (i + 2) + ' Phone Required');
            }

            if (data[i]['Currency'] == '') {
              errorArry.push('Row: ' + (i + 2) + ' Currency Required');
            }

            if (data[i]['Business Number'] == '') {
              errorArry.push('Row: ' + (i + 2) + ' Business Number Required');
            }

            if (data[i]['Tax/vat Number'] == '') {
              errorArry.push('Row: ' + (i + 2) + ' Tax/vat Number Required');
            }

            if (data[i]['City'] == '') {
              errorArry.push('Row: ' + (i + 2) + 'City Required');
            }

            if (data[i]['Postal Code'] == '') {
              errorArry.push('Row: ' + (i + 2) + 'Postal Code Required');
            }

            if (data[i]['Country'] == '') {
              errorArry.push('Row: ' + (i + 2) + 'Country Required');
            }

            if (data[i]['State'] == '') {
              errorArry.push('Row: ' + (i + 2) + 'State Required');
            }
          }
        });

      if (errorArry.length > 0) {
        return CommonMethods.error(res, 400, `${errorArry}`);
      } else {
        await csvtojson()
          .fromFile(`uploads/customercsv/${imageInfo.fileName}`)
          .then((data) => {
            for (let i = 0; i < data.length; i++) {
              if (errorArry.length == 0) {
                const newcustomer = new this.customerModel({
                  name: data[i]['Name'],
                  address: data[i]['Address'],
                  email: data[i]['Email'],
                  phone: data[i]['Phone'],
                  currency: data[i]['Currency'],
                  businessNumber: data[i]['Business Number'],
                  vatCode: data[i]['Tax/vat Number'],
                  city: data[i]['City'],
                  postalCode: data[i]['Postal Code'],
                  country: data[i]['Country'],
                  state: data[i]['State'],
                  userId: body.userId,
                  businessId: body.businessId,
                });

                newcustomer.save();
                parsedData.push(newcustomer);
              }
            }
          });
        return CommonMethods.success(
          res,
          'Customerlist upload successfully',
          200,
          [],
        );
      }
    } else {
      return CommonMethods.error(res, 400, 'No Customerlist present');
    }
  }
}

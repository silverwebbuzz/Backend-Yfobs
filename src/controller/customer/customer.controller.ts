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
import { customerService } from 'src/services/customer/customer.service';
import { CustomerDto } from 'src/dto/customer/customer.dto';
@Controller('customer')
export class customerController {
  constructor(private customerService: customerService) {}
  //createCustomer Controller
  @Post('/createCustomer')
  async createCustomer(@Res() res, @Body() CustomerDto: CustomerDto) {
    await this.customerService.createCustomer(res, CustomerDto);
  }
  //getAllcustomer Controller
  @Get('/getAllCustomer')
  async getAllPackageFeatures(@Res() res) {
    await this.customerService.getAllCustomer(res);
  }
  //getCustomer by id Controller
  @Get('/getCustomer/:CustomerID')
  async getPackageFeaturesById(@Res() res, @Param('CustomerID') CustomerID) {
    await this.customerService.getcustomerById(res, CustomerID);
  }
  //updateCustomer Controller
  @Put('/updateController/:CustomerID')
  async updatePackageFeatures(
    @Res() res,
    @Param('CustomerID') CustomerID,
    @Body() CustomerDto: CustomerDto,
  ) {
    await this.customerService.updateCustomer(res, CustomerID, CustomerDto);
  }
  //deleteCustomer Controller
  @Delete('/deleteCustomer/:CustomerID')
  async deletePackageFeatures(@Res() res, @Param('CustomerID') CustomerID) {
    await this.customerService.deleteCustomer(res, CustomerID);
  }
  @Post('uploadCSV')
  async uploadCSV(@Res() res, @Body() body) {
    await this.customerService.uploadCSV(res, body);
  }
}

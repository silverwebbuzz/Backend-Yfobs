import { Body, Controller, Post, Get, Param, Res } from '@nestjs/common';
import { BusinessService } from 'src/services/Business/business.service';
import { businessDto } from 'src/dto/business/business.dto';
@Controller('business')
export class BusinessController {
  constructor(private BusinessService: BusinessService) {}

  @Post('/addBusiness')
  public async business(@Res() res, @Body() businessDto: businessDto) {
    return await this.BusinessService.business(res, businessDto);
  }

  //  getAllCategory Controller
  @Get('/getAllCategory')
  async getAllCategory(@Res() res) {
    await this.BusinessService.getAllCategory(res);
  }
  //getCategorybyid Controller
  @Get('/getCategory/:categoryID')
  async getCategoryById(@Res() res, @Param('categoryID') categoryID) {
    await this.BusinessService.getCategoryById(res, categoryID);
  }

  //upload BusinessuploadLogo Image
  @Post('uploadLogo/:_id')
  async BusinessuploadLogo(@Res() res, @Body() body, @Param('_id') _id) {
    await this.BusinessService.BusinessuploadLogo(res, body, _id);
  }
  //upload upiQRCodeImage Image
  @Post('upiQRCodeImage/:_id')
  async upiQRCodeImage(@Res() res, @Body() body, @Param('_id') _id) {
    await this.BusinessService.upiQRCodeImage(res, body, _id);
  }
  // get image
  @Get('uploads/logo/:filename')
  getProfileImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: 'uploads/logo' });
  }
  @Get('uploads/QRcode/:filename')
  getFaviconImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: 'uploads/QRcode' });
  }
}

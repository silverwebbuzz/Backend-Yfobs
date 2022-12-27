import { Body, Controller, Post, Param, Res } from '@nestjs/common';
import { BusinessService } from 'src/services/Business/business.service';
import { businessDto } from 'src/dto/business/business.dto';
@Controller('business')
export class BusinessController {
  constructor(private BusinessService: BusinessService) {}

  @Post('/addBusiness')
  public async business(@Res() res, @Body() businessDto: businessDto) {
    return await this.BusinessService.business(res, businessDto);
  }
}

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
import { EstimatesService } from 'src/services/estimates/estimates.service';
import { estimatesDto } from 'src/dto/estimates/estimates.dto';
import { searchDto } from 'src/dto/search/search.dto';
@Controller('Estimates')
export class EstimatesController {
  constructor(private estimatesService: EstimatesService) {}
  //createEstimates Controller
  @Post('/createEstimates')
  async createEstimates(@Res() res, @Body() estimatesDto: estimatesDto) {
    await this.estimatesService.createEstimates(res, estimatesDto);
  }
  //getAllEstimates  Controller
  @Get('/getAllEstimates')
  async getAllPackageFeatures(
    @Res() res,
    @Body() searchDto: searchDto,
    @Body() body,
  ) {
    await this.estimatesService.getAllEstimates(res, searchDto, body);
  }
  //getEstimates by id Controller
  @Get('/getEstimate/:estimatesId')
  async getEstimatesById(@Res() res, @Param('estimatesId') estimatesId) {
    await this.estimatesService.getEstimatesById(res, estimatesId);
  }
  //updateEstimates Controller
  @Put('/updateEstimates/:estimatesId')
  async updateEstimates(
    @Res() res,
    @Param('estimatesId') estimatesId,
    @Body() estimatesDto: estimatesDto,
  ) {
    await this.estimatesService.updateEstimates(res, estimatesId, estimatesDto);
  }
  //deleteEstimates Controller
  @Delete('/deleteEstimates/:estimatesId')
  async deleteEstimates(@Res() res, @Param('estimatesId') estimatesId) {
    await this.estimatesService.deleteEstimates(res, estimatesId);
  }
}

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
import { InvoiceService } from 'src/services/invoice/invoice.service';
import { InvoiceDto } from 'src/dto/invoice/invoice.dto';
import { searchDto } from 'src/dto/search/search.dto';
@Controller('Invoice')
export class InvoiceController {
  constructor(private InvoiceService: InvoiceService) {}
  //createEstimates Controller
  @Post('/createInvoice')
  async createInvoice(@Res() res, @Body() InvoiceDto: InvoiceDto) {
    await this.InvoiceService.createInvoice(res, InvoiceDto);
  }
  //   //getAllEstimates  Controller
  //   @Get('/getAllEstimates')
  //   async getAllPackageFeatures(
  //     @Res() res,
  //     @Body() searchDto: searchDto,
  //     @Body() body,
  //   ) {
  //     await this.estimatesService.getAllEstimates(res, searchDto, body);
  //   }
  //   //getEstimates by id Controller
  //   @Get('/getEstimate/:estimatesId')
  //   async getEstimatesById(@Res() res, @Param('estimatesId') estimatesId) {
  //     await this.estimatesService.getEstimatesById(res, estimatesId);
  //   }
  //   //updateEstimates Controller
  //   @Put('/updateEstimates/:estimatesId')
  //   async updateEstimates(
  //     @Res() res,
  //     @Param('estimatesId') estimatesId,
  //     @Body() estimatesDto: estimatesDto,
  //   ) {
  //     await this.estimatesService.updateEstimates(res, estimatesId, estimatesDto);
  //   }
  //   //deleteEstimates Controller
  //   @Delete('/deleteEstimates/:estimatesId')
  //   async deleteEstimates(@Res() res, @Param('estimatesId') estimatesId) {
  //     await this.estimatesService.deleteEstimates(res, estimatesId);
  //   }
}

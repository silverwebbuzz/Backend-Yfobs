import {
  Controller,
  Body,
  Post,
  Res,
  Get,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CommonMethods } from 'src/common/commonMethods';
import { LoginDto } from 'src/dto/auth/login.dto';
import { UserDto } from 'src/dto/auth/user.dto';
import { UserService } from 'src/services/auth/user.service';
// import { AuthService } from 'src/services/auth/auth.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ChangePasswordDto } from 'src/dto/auth/changePassword.dto';
import { ForgotPasswordDto } from 'src/dto/auth/forgotPassword.dto';

@Controller()
export class UserController {
  constructor(
    private userService: UserService, // private authService: AuthService,
  ) {}

  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }
  @Get('/anyone')
  async publicInformation() {
    return 'this can be seen by anyone';
  }

  @Post('/userRegistration')
  public async createuser(@Res() res, @Body() userDto: UserDto) {
    return await this.userService.createuser(res, userDto);
  }

  @Post('/userLogin')
  public async checkuser(@Res() res, @Body() loginDto: LoginDto) {
    return await this.userService.findByLogin(res, loginDto);
  }

  @Get('/getSingleUser/:userID')
  public async getuserdetails(@Res() res, @Param('userID') userID) {
    return await this.userService.getUserDetails(res, userID);
  }

  @Post('/updateProfile/:userID')
  public async updateProfile(
    @Res() res,
    @Param('userID') userID,
    @Body() userDto: UserDto,
  ) {
    return await this.userService.updateProfile(res, userID, userDto);
  }

  @Delete('/deleteUser/:userID')
  async deleteUser(@Res() res, @Param('userID') userID) {
    await this.userService.deleteUser(res, userID);
  }

  @Put('/changePassword/:userID')
  public async changePassword(
    @Res() res,
    @Param('userID') userID,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.userService.changePassword(
      res,
      userID,
      changePasswordDto,
    );
  }
  @Post('/forgotPassword')
  public async forgotPassword(
    @Res() res,
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ) {
    return await this.userService.forgotPassword(res, forgotPasswordDto);
  }
}

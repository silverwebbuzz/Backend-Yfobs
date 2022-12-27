import { Controller, Body, Post, Res, Get, Param, Query } from '@nestjs/common';
import { LoginDto } from 'src/dto/auth/login.dto';
import { UserDto } from 'src/dto/auth/user.dto';
import { UserService } from 'src/services/auth/user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/user')
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

  @Post('/updateProfile')
  public async updateProfile(
    @Res() res,
    @Query('userID') userID,
    @Body() userDto: UserDto,
  ) {
    return await this.userService.updateProfile(res, userID, userDto);
  }
}

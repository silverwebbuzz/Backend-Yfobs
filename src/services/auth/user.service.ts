import {
  Body,
  // ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.schema';
import { UserDto } from 'src/dto/auth/user.dto';
import { LoginDto } from 'src/dto/auth/login.dto';
import { CommonMethods } from 'src/common/commonMethods';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  //User Registration
  async createuser(res: Response, userDto: UserDto): Promise<User> {
    const { email } = userDto;
    const user = await this.userModel.findOne({ email });
    const newuser = await new this.userModel(userDto);
    if (!user) {
      await newuser.save();
      return CommonMethods.success(res, 'Registration Successfull', [newuser]);
    } else {
      return CommonMethods.error(res, 'User Already Exists');
    }
  }

  //User Login
  async findByLogin(res: Response, loginDto: LoginDto) {
    const { email, password, phone } = loginDto;
    const checkuser = await this.userModel.findOne({ email });
    const checkemail = await this.userModel.findOne({ phone });

    if (checkuser) {
      if (await bcrypt.compare(password, checkuser.password)) {
        return CommonMethods.success(res, 'Login Successfully', checkuser);
      } else {
        return CommonMethods.error(res, 'Invalid Credentials');
      }
    } else {
      if (await bcrypt.compare(password, checkemail.password)) {
        return CommonMethods.success(res, 'Login Successfully', checkemail);
      } else {
        return CommonMethods.error(res, 'Invalid Credentials');
      }
    }
  }
  //Get Single User
  async getUserDetails(@Res() res, userID) {
    const getuser = await this.userModel.findById(userID).exec();
    if (getuser) {
      return CommonMethods.success(res, 'User Get Successfully', getuser);
    } else {
      return CommonMethods.error(res, 'User Does Not Exists');
    }
  }

  //Update Profile
  async updateProfile(@Res() res, userID, userDto: UserDto): Promise<User> {
    const { email } = userDto;
    const checkUser = await this.userModel.findById(userID);
    const checkEmail = await this.userModel.findOne({ email });
    const data = checkEmail ? checkEmail.email : null;
    const data1 = checkUser ? checkUser.email : null;

    if (data1 === data) {
      if (checkUser) {
        const updatedUser = await this.userModel.findByIdAndUpdate(
          userID,
          userDto,
          {
            new: true,
          },
        );
        await updatedUser.save();

        return CommonMethods.success(
          res,
          'User Data Update Successfully',
          updatedUser,
        );
      } else {
        return CommonMethods.error(res, 'User Does Not Exists');
      }
    } else if (!checkUser) {
      return CommonMethods.error(res, 'User Does Not Exists');
    } else {
      if (!checkEmail) {
        const updatedUser = await this.userModel.findByIdAndUpdate(
          userID,
          userDto,
          {
            new: true,
          },
        );
        await await updatedUser.save();
        return CommonMethods.success(
          res,
          'User edited successfully',
          updatedUser,
        );
      } else {
        return CommonMethods.error(res, 'Email Already Exists');
      }
    }
  }
}

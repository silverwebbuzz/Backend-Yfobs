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
import { Payload } from 'src/interface/payload.interface';
// const jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';
import { ChangePasswordDto } from 'src/dto/auth/changePassword.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  //User Registration
  async createuser(res: Response, userDto: UserDto): Promise<User> {
    const { email } = userDto;
    const user = await this.userModel.findOne({ email });
    const newuser = await new this.userModel(userDto);
    if (!user) {
      await newuser.save();
      return CommonMethods.success(res, 'Registration Successfull', 200, [
        newuser,
      ]);
    } else {
      return CommonMethods.error(res, 'User Already Exists', 401);
    }
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  //User Login
  async findByLogin(res: Response, loginDto: LoginDto) {
    const { email, password, phone } = loginDto;
    const checkuser = await this.userModel.findOne({ email: email });
    const checkphone = await this.userModel.findOne({ phone: phone });
    console.log(checkuser, '123');
    const token = jwt.sign({ checkuser }, process.env.SECRET_KEY, {
      expiresIn: '7d',
    });
    const phonetoken = jwt.sign({ checkphone }, process.env.SECRET_KEY, {
      expiresIn: '7d',
    });
    if (!checkuser) {
      console.log(checkuser, 'checkuser');

      if (await bcrypt.compare(password, checkphone.password)) {
        return CommonMethods.auth(
          res,
          'Login Successfully',
          200,
          checkphone,
          phonetoken,
        );
      } else {
        return CommonMethods.error(res, 'Invalid Credentials', 401);
      }
    } else {
      console.log(checkphone, 'checkphone');
      if (await bcrypt.compare(password, checkuser.password)) {
        return CommonMethods.auth(
          res,
          'Login Successfully',
          200,
          checkuser,
          token,
        );
      } else {
        return CommonMethods.error(res, 'Invalid Credentials', 401);
      }
    }
  }
  //Get Single User
  async getUserDetails(@Res() res, userID) {
    const getuser = await this.userModel.findById(userID).exec();
    if (getuser) {
      return CommonMethods.success(res, 'User Get Successfully', 200, getuser);
    } else {
      return CommonMethods.error(res, 'User Does Not Exists', 401);
    }
  }

  //Update Profile
  async updateProfile(@Res() res, userID, userDto: UserDto): Promise<User> {
    const { email } = userDto;
    const checkUser = await this.userModel.findById(userID);
    console.log(checkUser);

    const checkEmail = await this.userModel.findOne({ email });
    const data = checkEmail ? checkEmail.email : null;
    const data1 = checkUser ? checkUser.email : null;

    if (data1 === data) {
      console.log('23456');

      if (checkUser) {
        console.log('123');

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
          200,
          updatedUser,
        );
      } else {
        return CommonMethods.error(res, 'User Does Not Exists', 401);
      }
    } else if (!checkUser) {
      return CommonMethods.error(res, 'User Does Not Exists', 401);
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
          200,
          updatedUser,
        );
      } else {
        return CommonMethods.error(res, 'Email Already Exists', 400);
      }
    }
  }

  //Delete User
  async deleteUser(@Res() res, userID) {
    const deleteUser = await this.userModel.findByIdAndDelete(userID);
    if (deleteUser) {
      return CommonMethods.success(res, 'User Deleted successfully', 200, []);
    } else {
      return CommonMethods.error(res, 'No User Exists', 401);
    }
  }
  //Change Password
  async changePassword(
    @Res() res,
    userID,
    changePasswordDto: ChangePasswordDto,
  ) {
    const password = changePasswordDto.oldPassword;
    const password1 = await this.hashPassword(changePasswordDto.newPassword);
    const user = await this.userModel.findById(userID);

    if (!user) {
      return CommonMethods.error(res, 'User does not exists', 401);
    } else {
      if (await bcrypt.compare(password, user.password)) {
        const changePassword = await this.userModel.findByIdAndUpdate(userID, {
          password: password1,
        });
        return CommonMethods.success(
          res,
          'Password Changed successfully',
          changePassword,
          200,
        );
      } else {
        return CommonMethods.error(res, 'Incorrect old password', 400);
      }
    }
  }

  //forgot password
}

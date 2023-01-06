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
import { ForgotPasswordDto } from 'src/dto/auth/forgotPassword.dto';
// import { MailerModule } from '@nestjs-modules/mailer';
import * as nodemailer from 'nodemailer';
import { SendGridService } from '../sendGridService/sendGrid.service';
// import mail from '@sendgrid/mail';
// import { forgotPasswordTemplate } from '../'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private sendGridService: SendGridService,
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
    const { userID } = loginDto;
    const { email, password, phone } = loginDto;
    const checkuser = await this.userModel.findOne({ email: email });
    const checkphone = await this.userModel.findOne({ phone: phone });
    // console.log(checkuser, '123');
    const token = jwt.sign({ userID }, process.env.SECRET_KEY, {
      expiresIn: '7d',
    });
    const phonetoken = jwt.sign({ userID }, process.env.SECRET_KEY, {
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
      // console.log(checkphone, 'checkphone');
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
    const password = changePasswordDto.password;
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

  // //Forgot Password
  async forgotPassword(@Res() res, forgotPasswordDto: ForgotPasswordDto) {
    const email = forgotPasswordDto.email;
    const data = await this.userModel.findOne({ email: email });
    const name = data.name;

    if (email) {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ashish.swb1234@gmail.com',
          pass: 'oveprfbiugcfpoin',
          secure: true,
        },
      });
      const mailOptions = {
        from: 'ashish.swb1234@gmail.com',
        to: email,
        subject: 'Otp',
        html: `<!DOCTYPE html>
        <html>
        <head>
        
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Password Reset</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
        
          <style type="text/css">
            body,
            table,
            td,
            a {
              -ms-text-size-adjust: 100%; /* 1 */
              -webkit-text-size-adjust: 100%; /* 2 */
            }
            table,
            td {
              mso-table-rspace: 0pt;
              mso-table-lspace: 0pt;
            }
            img {
              -ms-interpolation-mode: bicubic;
            }
            a[x-apple-data-detectors] {
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              color: inherit !important;
              text-decoration: none !important;
            }
            div[style*="margin: 16px 0;"] {
              margin: 0 !important;
            }
            body {
              width: 100% !important;
              height: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            table {
              border-collapse: collapse !important;
            }
            a {
              color: #1a82e2;
            }
            img {
              height: auto;
              line-height: 100%;
              text-decoration: none;
              border: 0;
              outline: none;
            }
          </style>
        
        </head>
        
        <body style="background-color: #f4f4f4; padding: 0 !important;text-align:center;margin:0 auto !important;">
        
          <!-- start body -->
          <table border="0" cellpadding="0" cellspacing="0" width="600px" style="max-width: 600px;">
        
            <!-- white space start -->
            <tr>
                <td bgcolor="" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 10px;"> </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- white space end -->
        
            <!-- start hero -->
            <tr>
               <td align="center">
                 <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                      <td align="center" bgcolor="#802886" style="padding: 5px;color: #111111;font-family: 'Lato', Helvetica, Arial, sans-serif;font-size: 30px;font-weight: 400;letter-spacing: 4px;line-height: 48px;">
                         <img src="https://yfobs.in/assets/fronts/img/logo-yFobs.png" style="display: block; border: 0px;" />
                      </td>
                    </tr>
                 </table>
               </td>
            </tr>
            <!-- end hero -->
        
            <!-- start hero -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="center" bgcolor="#ffffff" style="padding:20px;border-radius: 4px 4px 0px 0px;color: #111111;font-family: 'Lato', Helvetica, Arial, sans-serif;font-size: 30px;font-weight: 400;letter-spacing: 4px;line-height: 48px;">
                      <h1 style=" font-size: 30px; font-weight: 700; letter-spacing: -1px; line-height: 48px; text-align: center;">Your New Password</h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end hero -->
        
            <!-- start copy block -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;">Hii <b>${name}</b></p>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;">We have reset your password, Please use this <b>${otp}</b> code to login your account.</p>
                    </td>
                  </tr>
                  <!-- end copy -->
        
                  <!-- start button -->
        <!--           <tr>
                    <td align="left" bgcolor="#ffffff">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" bgcolor="#802886" style="border-radius: 6px;">
                                  <a href="https://sendgrid.com" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Reset your password</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr> -->
                  <!-- end button -->
        
                  <!-- start copy -->
        <!--           <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 10px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;">If that did not request a password reset, please ignore this email or reply to let us know. this password reset is only valid for the next 30 minutes.</p>
                    </td>
                  </tr> -->
                  <!-- end copy -->
        
                  <!-- start copy -->
        <!--         <tr> 
                    <td align="left" bgcolor="#ffffff" style="padding: 10px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                      <p style="margin: 0;"><a href="https://sendgrid.com" target="_blank">https://same-link-as-button.url/xxx-xxx-xxxx</a></p>
                    </td>
                  </tr> -->
                  <!-- end copy -->
        
                  <!-- start copy -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;">Thank You,<br> YFobs Team</p>
                    </td>
                  </tr>
                  <!-- end copy -->
        
                </table>
              </td>
            </tr>
            <!-- end copy block -->
        
            <!-- start footer -->
            <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;max-width: 600px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#802886" align="center" style="padding: 0px 30px 30px 30px; color: #fff; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                              <p style="margin: 0;">Powered by - <?php echo settings()->site_name ?> @ <?php echo date('Y'); ?>. All Rights Reserved</p>
                            </td>
                        </tr>
                    </table>
               </td>
                </tr>
            <!-- end footer -->
        
          </table>
          <!-- end body -->
        
        </body>
        </html>`,
      };
      transport.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return CommonMethods.error(res, 'Otp Not Send', 400);
        }
      });
      if (mailOptions) {
        const password1 = await this.hashPassword(otp);
        const savePassword = await this.userModel.findOneAndUpdate(
          { email },
          { password: password1 },
        );

        return CommonMethods.success(
          res,
          'Otp send Successfully',
          200,
          savePassword,
        );
      }
    } else {
      return CommonMethods.error(res, 'Incorrect user detail', 401);
    }
  }
}

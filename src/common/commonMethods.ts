import { HttpStatus, Res } from '@nestjs/common';

export class CommonMethods {
  static async success(@Res() res, message, data) {
    return res.status(HttpStatus.OK).json({
      message: message,
      status: true,
      data,
    });
  }

  static async auth(@Res() res, message, data, token) {
    return res.status(HttpStatus.OK).json({
      message: message,
      status: true,
      data,
      token,
    });
  }

  static async error(@Res() res, message) {
    return res.status(HttpStatus.OK).json({
      message: message,
      status: false,
    });
  }
}

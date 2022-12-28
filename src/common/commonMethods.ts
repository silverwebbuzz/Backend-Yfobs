import { HttpStatus, Res } from '@nestjs/common';

export class CommonMethods {
  static async success(@Res() res, message, code, data) {
    return res.status(HttpStatus.OK).json({
      message: message,
      status: true,
      code,
      data,
    });
  }

  static async auth(@Res() res, message, code, data, token) {
    return res.status(HttpStatus.OK).json({
      message: message,
      status: true,
      code,
      data,
      token,
    });
  }

  static async error(@Res() res, message, code) {
    return res.status(HttpStatus.OK).json({
      message: message,
      status: false,
      code,
    });
  }
}

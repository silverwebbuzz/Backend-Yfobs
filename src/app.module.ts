import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/auth/user.controller';
import { UserService } from './services/auth/user.service';
import { UserSchema } from './models/user.schema';
import { BusinessController } from './controller/business/business.controller';
import { BusinessService } from './services/Business/business.service';
import { BusinessSchema } from './models/business.schema';
// import { AuthService } from './services/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
// import { JwtStrategy } from './services/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://root:swb1234@cluster0.p8vw5.mongodb.net/yfobs',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Business', schema: BusinessSchema }]),
  ],
  controllers: [AppController, UserController, BusinessController],
  providers: [
    AppService,
    UserService,
    BusinessService,
    // AuthService,
    // JwtStrategy,
  ],
})
export class AppModule {}

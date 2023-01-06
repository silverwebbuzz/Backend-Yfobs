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
import { BusinessCategorySchema } from './models/businessCategory.schema';
import { CustomerSchema } from './models/customer.schema';
import { customerController } from './controller/customer/customer.controller';
import { customerService } from './services/customer/customer.service';
import { CategoriesService } from './services/categories/categories.service';
import { CategoriesSchema } from './models/categories.schema';
import { CategoryController } from './controller/categories/categories.controller';
import { ProductController } from './controller/product/product.controller';
import { ProductService } from './services/product/product.service';
import { productSchema } from './models/product.schema';
// import { AuthService } from './services/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
// import { JwtStrategy } from './services/auth/jwt.strategy';
import { SendGridService } from './services/sendGridService/sendGrid.service';

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
    MongooseModule.forFeature([
      { name: 'BusinessCategory', schema: BusinessCategorySchema },
    ]),
    MongooseModule.forFeature([{ name: 'customer', schema: CustomerSchema }]),
    MongooseModule.forFeature([
      { name: 'Categories', schema: CategoriesSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
  controllers: [
    AppController,
    UserController,
    BusinessController,
    customerController,
    CategoryController,
    ProductController,
  ],
  providers: [
    AppService,
    UserService,
    BusinessService,
    customerService,
    CategoriesService,
    ProductService,
    SendGridService,

    // AuthService,
    // JwtStrategy,
  ],
})
export class AppModule {}

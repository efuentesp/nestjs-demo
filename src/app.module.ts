import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/customer.module';
import { CustomerResolver } from './customer/customer.resolver';
import { AuthModule } from './auth/auth.module';
import * as config from 'config';

const mongodbConfig = config.get('mongodb');

@Module({
  imports: [
    MongooseModule.forRoot(mongodbConfig.uri, {
      useFindAndModify: false,
    }),
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    CustomerModule,
    AuthModule,
  ],
  controllers: [],
  providers: [CustomerResolver],
})
export class AppModule {}

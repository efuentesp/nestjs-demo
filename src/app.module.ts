import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/customer.module';
import { CustomerResolver } from './customer/customer.resolver';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nestjs:nestjs@cluster0.mbur4.mongodb.net/pdash?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    CustomerModule,
  ],
  controllers: [],
  providers: [CustomerResolver],
})
export class AppModule {}

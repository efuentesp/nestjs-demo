import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo/mongooseTestModule';
import { CustomerModule } from './customer.module';
import { CustomerService } from './customer.service';
import {
  Customer,
  CustomerDocument,
  CustomerSchema,
} from './schemas/customer.schema';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customerModel: Model<CustomerDocument>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Customer.name, schema: CustomerSchema },
        ]),
      ],
      providers: [CustomerService],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customerModel = module.get<Model<CustomerDocument>>('CustomerModel');
  });

  it('should be defined', () => {
    expect(customerService).toBeDefined();
  });

  describe('findAll', () => {
    it('get all Customer items', async () => {
      // arrange
      await customerModel.create({
        code: 'C001',
        name: 'Customer 01',
      });

      // act
      const result: Customer[] = await customerService.findAll();

      // assert
      expect(result.length).toEqual(1);
    });
  });

  afterEach(async () => {
    await customerModel.deleteMany({});
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});

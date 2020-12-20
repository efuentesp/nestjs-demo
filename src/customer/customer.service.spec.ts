import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo/mongooseTestModule';
import { CustomerService } from './customer.service';
import { Customer, CustomerSchema } from './schemas/customer.schema';

const mockCustomerModel = () => ({
  findAll: jest.fn(),
});

describe('CustomerService', () => {
  let customerService: CustomerService;

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
  });

  it('should be defined', () => {
    expect(customerService).toBeDefined();
  });

  // describe('findAll Customers', async () => {
  //   customerModel.find.mockResolvedValue('customer');
  //   expect(customerModel.findAll).not.toHaveBeenCalled();
  //   const result = customerService.findAll();
  //   expect(customerModel.findAll).toHaveBeenCalled();
  //   expect(result).toEqual('customer');
  // });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});

import { Model } from 'mongoose';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  private logger = new Logger('CustomerService');
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async findAll(): Promise<Customer[]> {
    const result = await this.customerModel.find().exec();

    return result.map((item) => ({
      id: item._id,
      code: item.code,
      name: item.name,
    }));
  }

  async findById(id: string): Promise<CustomerDocument> {
    let customer;

    try {
      customer = await this.customerModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not found Customer.');
    }

    if (!customer) {
      throw new NotFoundException('Could not found Customer.');
    }

    return customer;
  }

  async getById(id: string): Promise<Customer> {
    const customer = await this.findById(id);

    return { id: customer._id, code: customer.code, name: customer.name };
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDto);

    try {
      return createdCustomer.save();
    } catch (error) {
      this.logger.error(
        `Failed to save Customer: ${JSON.stringify(createCustomerDto)}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, customer: UpdateCustomerDto): Promise<Customer> {
    const foundCustomer = await this.findById(id);
    let updatedCustomer;

    if (customer.code) {
      foundCustomer.code = customer.code;
    }

    if (customer.name) {
      foundCustomer.name = customer.name;
    }

    try {
      updatedCustomer = await foundCustomer.save();
    } catch (error) {
      this.logger.error(
        `Failed to update Customer: ${JSON.stringify(customer)}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return {
      id: updatedCustomer._id,
      code: updatedCustomer.code,
      name: updatedCustomer.name,
    };
  }

  async delete(id: string) {
    try {
      const result = await this.customerModel.findByIdAndDelete(id);
      if (result == null) {
        this.logger.error(`Failed to delete Customer id: ${id}"`);
        throw new NotFoundException('Could not delete Customer.');
      }
    } catch (error) {
      this.logger.error(`Failed to delete Customer id: ${id}"`);
      throw new NotFoundException('Could not delete Customer.');
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/passport/get-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
@UseGuards(AuthGuard())
export class CustomerController {
  private logger = new Logger('CustomerController');
  constructor(private customerService: CustomerService) {}

  @Get()
  findAllCustomer() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findByIdCustomer(@Param('id') id: string) {
    return this.customerService.getById(id);
  }

  @Post()
  createCustomer(
    @Body(ValidationPipe) createCustomerDto: CreateCustomerDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(
      `User "${user.username}" created a new Customer ${JSON.stringify(
        createCustomerDto,
      )}.`,
    );
    return this.customerService.create(createCustomerDto);
  }

  @Patch(':id')
  updateCustomer(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    await this.customerService.delete(id);

    return null;
  }
}

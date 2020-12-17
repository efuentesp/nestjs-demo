import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CustomerType } from './customer.type';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Resolver(() => CustomerType)
export class CustomerResolver {
  // constructor(private customerService: CustomerService) {}

  @Query(() => CustomerType)
  customer() {
    return {
      id: 'jkfhksda74eh4r78',
      code: 'C0001',
      name: 'Cliente 1',
    };
  }

  // @Mutation((returns) => CustomerType)
  // createCustomer(@Args() createCustomerDto: CreateCustomerDto) {
  //   return this.customerService.create(createCustomerDto);
  // }
}

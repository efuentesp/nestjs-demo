import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType('Customer')
export class CustomerType {
  @Field((type) => ID)
  id: string;

  @Field()
  code: string;

  @Field()
  name: string;
}

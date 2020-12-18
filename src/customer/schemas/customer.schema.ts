import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ collection: 'customer' })
export class Customer {
  @Prop()
  id: string;

  @Prop()
  code: string;

  @Prop()
  name: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

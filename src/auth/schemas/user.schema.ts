import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type UserDocument = User & Document;

@Schema({ collection: 'user' })
export class User {
  @Prop()
  id: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(uniqueValidator);

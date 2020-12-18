import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  code: string;

  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name: string;
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findByUsername(username: string): Promise<UserDocument> {
    let user;

    try {
      user = await this.userModel.findOne({ username }).exec();
    } catch (error) {
      throw new UnauthorizedException('Invalid Auth Credentials.');
    }

    if (!user) {
      throw new UnauthorizedException('Invalid Auth Credentials.');
    }

    return user;
  }

  async validateUserPassword(
    authCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.findByUsername(username);
    const isValid =
      user.password === (await this.hashPassword(password, user.salt));

    if (!isValid) {
      throw new UnauthorizedException('Invalid Auth Credentials.');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    createUserDto.password = await this.hashPassword(
      createUserDto.password,
      salt,
    );
    createUserDto.salt = salt;

    const createdUser = new this.userModel(createUserDto);
    createdUser.save();
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

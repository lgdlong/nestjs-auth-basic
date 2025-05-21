import { Injectable, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const count = await this.userModel.countDocuments();
    if (count === 0) {
      const salt = genSaltSync(10);
      const hash = hashSync(
        this.configService.get<string>('INIT_USER_PASSWORD'),
        salt,
      );
      await this.userModel.insertMany([
        {
          name: 'Eric',
          email: 'admin@gmail.com',
          password: hash,
        },
        {
          name: 'User',
          email: 'user@gmail.com',
          password: hash,
        },
        {
          name: 'User 1',
          email: 'user1@gmail.com',
          password: hash,
        },
        {
          name: 'User 2',
          email: 'user2@gmail.com',
          password: hash,
        },
        {
          name: 'User 3',
          email: 'user3@gmail.com',
          password: hash,
        },
      ]);
    }
  }

  async create(user: User) {
    const salt = genSaltSync(this.SALT_ROUNDS);
    const hash = hashSync(user.password, salt);
    user.password = hash;
    return await this.userModel.create(user);
  }

  async findAll() {
    return await this.userModel.find({});
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  checkPassword(hash: string, plain: string) {
    return compareSync(hash, plain);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

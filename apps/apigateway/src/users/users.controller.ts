import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() request: CreateUserRequest) {
    console.log(request, 'request');

    // const obj = {
    //   firstName: faker.internet.displayName(),
    //   lastName: faker.internet.username(),
    //   about: faker.lorem.sentence(),
    //   avatar: faker.image.avatar(),
    //   email: faker.internet.email(),
    //   password: faker.internet.password(),
    // };
    return this.usersService.createUser(request);
  }
}

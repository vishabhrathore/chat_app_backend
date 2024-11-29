import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

import {
  UserServiceController,
  CreateUserRequest,
  UserServiceControllerMethods,
  UserResponse,
  GetUserByIdRequest,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(
    request: CreateUserRequest,
  ): Promise<UserResponse> | Observable<UserResponse> | UserResponse {
    return this.usersService.createUser(request);
  }


  getUserById(request: GetUserByIdRequest): Promise<UserResponse> | Observable<UserResponse> | UserResponse {
    console.log(request ,"request in controller")
    return this.usersService.getUserById(request)
  }



}

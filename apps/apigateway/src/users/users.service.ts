import {
  CreateUserRequest,
  GetUserByIdRequest,
  USER_SERVICE_NAME,
  UserResponse,
  UserServiceClient,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserServiceClient;
  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  createUser(request: CreateUserRequest): Observable<UserResponse> {
    return this.userService.createUser(request);
  }

  getUserById(request: GetUserByIdRequest): Observable<UserResponse>{
  return this.userService.getUserById(request)
  }

}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserRequest, UserResponse } from '@app/common';

import { faker } from '@faker-js/faker';
import { User } from '@app/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  private readonly users: User[] = [];
  onModuleInit() {
    for (let i = 0; i <= 10; i++) {
      this.createUser({
        firstName: faker.internet.displayName(),
        lastName: faker.internet.username(),
        about: faker.lorem.sentence(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }
  }

  /**
   * 
   *   id: string;
  firstName: string;
  lastName: string;
  about: string;
  avatar: string;
  email: string;
  verified: boolean;
  socketId: string;
  status: string;
  friends: string[];
  createdAt: string;
  updatedAt: string;
   */

  async createUser(request: CreateUserRequest): Promise<UserResponse> {
    console.log('request in ms', request);
    const createdUser = await this.databaseService.user.create({
      data: {
        firstName: request.firstName,
        lastName: request.lastName,
        about: request.about,
        avatar: request.avatar,
        email: request.email,
        // Other default values
        verified: false,
        status: 'offline',
        friends: [],
      },
    });

    const userResponse: User = {
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      about: createdUser.about,
      avatar: createdUser.avatar,
      email: createdUser.email,
      verified: createdUser.verified,
      socketId: createdUser.socketId || '',
      status: createdUser.status,
      friends: createdUser.friends || [],
      createdAt: createdUser.createdAt.toISOString(), // Convert Date to string
      updatedAt: createdUser.updatedAt.toISOString(), // Convert Date to string
    };

    return { user: userResponse };
  }
}

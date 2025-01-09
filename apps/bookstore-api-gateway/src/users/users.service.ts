import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_CLIENT } from './constants';

import {
  UserDto as ClientUserDto,
  CreateUserDto as ClientCreateUserDto,
  UpdateUserDto as ClientUpdateUserDto,
  USER_PATTERNS,
} from '@app/contracts/users';

import { UserDto } from './dto/user.dto';
import { map } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(USERS_CLIENT) private usersClient: ClientProxy) {}

  private mapUserDto(userDto: ClientUserDto): UserDto {
    return {
      id: userDto.id,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      age: userDto.age,
      email: userDto.email,
    };
  }

  create(createUserDto: CreateUserDto) {
    return this.usersClient
      .send<ClientUserDto, ClientCreateUserDto>(USER_PATTERNS.CREATE, createUserDto)
      .pipe(map(this.mapUserDto));
  }

  findAll() {
    return this.usersClient.send<ClientUserDto>(USER_PATTERNS.FIND_ALL, {});
  }

  findOne(id: number) {
    return this.usersClient.send<ClientUserDto>(USER_PATTERNS.FIND_ONE, id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersClient.send<ClientUserDto, ClientUpdateUserDto>(USER_PATTERNS.UPDATE, { id, ...updateUserDto });
  }

  remove(id: number) {
    return this.usersClient.send<ClientUserDto, number>(USER_PATTERNS.REMOVE, id);
  }
}

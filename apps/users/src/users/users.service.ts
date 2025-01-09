import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto, CreateUserDto, UpdateUserDto } from '@app/contracts/users';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
      email: 'john.doe@gmail.com',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      age: 26,
      email: 'jane.doe@gmail.com',
    },
  ];

  create(createUserDto: CreateUserDto) {
    const newUser: UserDto = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const updatedUser = { ...this.users[userIndex], ...updateUserDto };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const removedUser = this.users.splice(userIndex, 1);
    return removedUser[0];
  }
}

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UpdateUserDto, CreateUserDto, USER_PATTERNS } from '@app/contracts/users';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USER_PATTERNS.CREATE)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern(USER_PATTERNS.FIND_ALL)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(USER_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern(USER_PATTERNS.UPDATE)
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern(USER_PATTERNS.REMOVE)
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}

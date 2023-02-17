import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserModel } from './user.model';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  async CreateUserDto(@Body() dto: Pick<UserModel, 'login' | 'password'>) {
    return this.userService.createUser(dto);
  }

  @Put(':id')
  async updateUserPasword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}

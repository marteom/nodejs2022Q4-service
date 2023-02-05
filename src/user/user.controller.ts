import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserModel } from './user.model';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  @Get()
  async getAllUsers() {
    return [];
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return {};
  }

  @Post()
  async CreateUserDto(@Body() dto: Pick<UserModel, 'login' | 'password'>) {
    return {};
  }

  @Put(':id')
  async updateUserPasword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return {};
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return {};
  }
}

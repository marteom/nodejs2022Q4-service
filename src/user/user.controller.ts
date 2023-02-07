import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserModel } from './user.model';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { usersData } from './data/user.data';
import { getUser } from './utils/helper';
import { Response } from 'express';
import { isIdValid } from '../utils/common-utils';

@Controller('user')
export class UserController {
  @Get()
  async getAllUsers() {
    return usersData;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string, @Res() response: Response) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    const user: UserModel = usersData.find(
      (element: UserModel) => element.id === id,
    );

    if (user) {
      return response.status(HttpStatus.OK).send(user);
    }

    return response.status(HttpStatus.NOT_FOUND).send('User not found');
  }

  @Post()
  async CreateUserDto(
    @Body() dto: Pick<UserModel, 'login' | 'password'>,
    @Res() response: Response,
  ) {
    if (!dto.login) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "login" is missing');
    }

    if (!dto.password) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "password" is missing');
    }

    const newUser = await getUser(dto.login, dto.password);
    usersData.push(newUser);
    return response.status(HttpStatus.CREATED).send(newUser);
  }

  @Put(':id')
  async updateUserPasword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
    @Res() response: Response,
  ) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    if (!dto.oldPassword) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "oldPassword" is missing');
    }

    if (!dto.newPassword) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('required parameter "newPassword" is missing');
    }

    const putedUserIndex = usersData.findIndex(
      (element: UserModel) => element.id === id,
    );

    if (putedUserIndex === -1) {
      return response.status(HttpStatus.NOT_FOUND).send('User not found');
    }

    if (usersData[putedUserIndex].password !== dto.oldPassword) {
      return response
        .status(HttpStatus.FORBIDDEN)
        .send('oldPassword is incorrect');
    }

    usersData[putedUserIndex].password = dto.newPassword;
    usersData[putedUserIndex].version += 1;
    usersData[putedUserIndex].updatedAt = Date.now();

    return response.status(HttpStatus.OK).send(usersData[putedUserIndex]);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string, @Res() response: Response) {
    if (!(await isIdValid(id))) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('id parameter is invalid (not uuid)');
    }

    const deletedUserIndex = usersData.findIndex(
      (element: UserModel) => element.id === id,
    );

    if (deletedUserIndex === -1) {
      return response.status(HttpStatus.NOT_FOUND).send('User not found');
    }

    usersData.splice(deletedUserIndex, 1);

    return response
      .status(HttpStatus.NO_CONTENT)
      .send('User successfully deleted');
  }
}

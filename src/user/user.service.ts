import { Injectable } from '@nestjs/common';
import { usersData } from './data/user.data';
import { isIdValid } from '../utils/common-utils';
import { UserModel } from './user.model';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { getUser, getUserWithoutPassword } from './utils/helper';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  async getAllUsers() {
    return usersData;
  }

  async getUserById(id) {
    if (!(await isIdValid(id))) {
      throw new HttpException('id parameter is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    const user: UserModel = usersData.find(
      (element: UserModel) => element.id === id,
    );

    if (!user) {
      throw new HttpException(`User with id = ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return getUserWithoutPassword(user);
  }

  async createUser(dto: Pick<UserModel, 'login' | 'password'>) {
    if (!dto.login) {
      throw new HttpException('required parameter "login" is missing', HttpStatus.BAD_REQUEST);
    }

    if (!dto.password) {
      throw new HttpException('required parameter "password" is missing', HttpStatus.BAD_REQUEST);
    }

    const newUser = await getUser(dto.login, dto.password);
    usersData.push(newUser);

    return getUserWithoutPassword(newUser);
  }

  async updateUser(id: string, dto: UpdatePasswordDto) {
    if (!(await isIdValid(id))) {
      throw new HttpException('id parameter is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    if (!dto.oldPassword) {
      throw new HttpException('required parameter "oldPassword" is missing', HttpStatus.BAD_REQUEST);
    }

    if (!dto.newPassword) {
      throw new HttpException('required parameter "newPassword" is missing', HttpStatus.BAD_REQUEST);
    }

    const putedUserIndex = usersData.findIndex(
      (element: UserModel) => element.id === id,
    );

    if (putedUserIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (usersData[putedUserIndex].password !== dto.oldPassword) {
      throw new HttpException('oldPassword is incorrect', HttpStatus.FORBIDDEN);
    }

    usersData[putedUserIndex].password = dto.newPassword;
    usersData[putedUserIndex].version += 1;
    usersData[putedUserIndex].updatedAt = Date.now();

    return getUserWithoutPassword(usersData[putedUserIndex]);
  }

  async deleteUser(id) {
    if (!(await isIdValid(id))) {
      throw new HttpException('id parameter is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    const deletedUserIndex = usersData.findIndex(
      (element: UserModel) => element.id === id,
    );

    if (deletedUserIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return usersData.splice(deletedUserIndex, 1);
  }

}

import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import UserModel from '../models/UserModel';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface RequestDTO {
  user_id: string;
  avatarFileName: string;
}
class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFileName,
  }: RequestDTO): Promise<UserModel> {
    const usersRepository = getRepository(UserModel);

    // verificar se uuário é valido
    const user = await usersRepository.findOne(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    // verificar se o usuário já tem um avatar, se tiver, deletar
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;

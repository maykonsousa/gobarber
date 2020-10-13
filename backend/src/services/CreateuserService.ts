import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UserModel from '../models/UserModel';
import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: RequestDTO): Promise<UserModel> {
    const userRepository = getRepository(UserModel);

    // verificar se o usuário já existe
    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('The informed email already exists');
    }

    // criptografar a senha

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;

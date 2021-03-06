import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import AuthConfig from '../config/auth';
import AppError from '../errors/AppError';

interface RequestDTO {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({
    email,
    password,
  }: RequestDTO): Promise<{ user: UserModel; token: string }> {
    const userRepository = getRepository(UserModel);
    // verifica se o usuário existe
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('User not found', 401);
    }
    // verifica se a senha está correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Password incorrect', 401);
    }
    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    // gerar token de autenticação
    return { user, token };
  }
}

export default CreateSessionService;

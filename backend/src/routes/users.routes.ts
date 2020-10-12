import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateuserService';
import UserModel from '../models/UserModel';
import authMiddleware from '../middleware/AuthMiddleware';

const userRouter = Router();

// criar um usuário

userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createuser = new CreateUserService();
    const user = await createuser.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// listar todos os usuários
userRouter.get('/', async (req, res) => {
  const userRepository = getRepository(UserModel);
  const users = await userRepository.find();
  return res.json(users);
});

// atualizar avatar
userRouter.patch('/', authMiddleware, (req, res) => {
  return res.json({ ok: true });
});
export default userRouter;

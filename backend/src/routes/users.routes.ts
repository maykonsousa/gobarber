import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import CreateUserService from '../services/CreateuserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import UserModel from '../models/UserModel';
import authMiddleware from '../middleware/AuthMiddleware';
import uploadConfig from '../config/upload';

const userRouter = Router();
const upload = multer(uploadConfig);

// criar um usuário

userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const createuser = new CreateUserService();
  const user = await createuser.execute({
    name,
    email,
    password,
  });

  return res.json(user);
});

// listar todos os usuários
userRouter.get('/', async (req, res) => {
  const userRepository = getRepository(UserModel);
  const users = await userRepository.find();
  return res.json(users);
});

// atualizar avatar
userRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  async (req, res) => {
    const updateuserAvatar = new UpdateUserAvatarService();
    const user = await updateuserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    return res.json(user);
  },
);
export default userRouter;

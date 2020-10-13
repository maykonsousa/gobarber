import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const createSessionService = new CreateSessionService();
  const { user, token } = await createSessionService.execute({
    email,
    password,
  });
  return res.json({ user, token });
});

export default sessionRouter;

import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const createSessionService = new CreateSessionService();
    const { user, token } = await createSessionService.execute({
      email,
      password,
    });
    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

export default sessionRouter;

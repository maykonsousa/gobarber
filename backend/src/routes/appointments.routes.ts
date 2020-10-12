import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppoitmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AuthMiddleware from '../middleware/AuthMiddleware';

const appointmentsRouter = Router();
appointmentsRouter.use(AuthMiddleware);

// listar agendamentos
appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.findOne();
  return res.json(appointments);
});

// criar agendamento
appointmentsRouter.post('/', async (req, res) => {
  try {
    const { date, provider_id } = req.body;
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;

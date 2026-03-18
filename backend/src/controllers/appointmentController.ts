import { Request, Response } from 'express';
import Appointment from '../models/Appointment';

// Função para CRIAR agendamento
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { medico, dataHora } = req.body;
    const userId = (req as any).userId;

    const newAppointment = new Appointment({
      pacienteId: userId,
      medico,
      dataHora,
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao agendar consulta' });
  }
};

// Função para LISTAR as consultas do paciente
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const appointments = await Appointment.find({ pacienteId: userId }).sort({ dataHora: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar consultas' });
  }
  
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Só deleta se a consulta for do usuário que está logado
    const deleted = await Appointment.findOneAndDelete({ _id: id, pacienteId: userId });

    if (!deleted) return res.status(404).json({ error: 'Consulta não encontrada' });
    res.json({ message: 'Consulta removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar' });
  }
};
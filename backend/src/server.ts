import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { register, login } from './controllers/authController';
import { createAppointment, getAppointments, deleteAppointment } from './controllers/appointmentController';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();
const app = express(); // O app nasce aqui, uma única vez!

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI as string;
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Memory Card plugado! MongoDB conectado.'))
  .catch((err) => console.error('❌ Erro no MongoDB:', err));

// --- ROTAS DO SISTEMA ---

// Rotas Públicas
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Rotas Protegidas (JWT)
app.post('/api/appointments', authMiddleware, createAppointment);
app.get('/api/appointments', authMiddleware, getAppointments);
app.delete('/api/appointments/:id', authMiddleware, deleteAppointment);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Motor ligado na porta ${PORT}`);
});
import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  pacienteId: mongoose.Types.ObjectId;
  medico: string;
  dataHora: Date;
}

const AppointmentSchema: Schema = new Schema({
  pacienteId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  medico: { type: String, required: true },
  dataHora: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);
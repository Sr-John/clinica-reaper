import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  nome: string;
  email: string;
  senha: string;
  endereco?: string;
  tipo: string;
}

const UserSchema: Schema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  endereco: { type: String },
  tipo: { type: String, default: 'paciente' }
});

export default mongoose.model<IUser>('User', UserSchema);
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';// Isso aqui diz onde está a "tabela" de usuários

export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, tipo } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'E-mail já cadastrado!' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const newUser = new User({ nome, email, senha: hashedPassword, tipo });
    await newUser.save();
    res.status(201).json({ msg: 'Usuário criado com sucesso! 🎉' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ msg: 'Senha incorreta' });

    const token = jwt.sign(
      { id: user._id, tipo: user.tipo },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: { id: user._id, nome: user.nome, tipo: user.tipo }
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
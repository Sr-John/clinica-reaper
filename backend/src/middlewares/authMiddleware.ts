import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Nenhum token fornecido' });
  }

  // O token vem como "Bearer <token>", então separamos o texto do código real
  const parts = authHeader.split(' ');
  const [scheme, token] = parts;

  if (parts.length !== 2 || !/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformatado' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido' });

    // Se estiver tudo ok, salva o ID do usuário na requisição
    (req as any).userId = (decoded as any).id;
    return next();
  });
};
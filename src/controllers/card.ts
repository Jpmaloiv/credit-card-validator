import { Request, Response } from 'express';
import { validateCardNumber } from '../services/validateCardNumber'

export const validateCard = (req: Request, res: Response) => {
  const { cardNumber } = req.body;

  if (!cardNumber) {
    return res.status(400).json({ success: false, message: 'Card number is required' });
  }

  if (cardNumber.length < 13) {
    return res.status(400).json({ success: false, message: 'Card number too short' });
  }

  const valid = validateCardNumber(cardNumber);

  res.status(200).json({ success: true, valid });
};

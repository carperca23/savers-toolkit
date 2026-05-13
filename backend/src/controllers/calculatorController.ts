import { Request, Response } from 'express';
import { calculateCompoundGrowth } from '../services/interesCompuesto';

export const getCompoundInterest = (req: Request, res: Response) => {
  try {
    const { initialCapital, annualRate, years, monthlyContribution = 0 } = req.body;

    if (typeof initialCapital !== 'number' || typeof annualRate !== 'number' || typeof years !== 'number') {
      return res.status(400).json({ error: 'Faltan parámetros obligatorios o no son números.' });
    }

    const yearlyBreakdown = calculateCompoundGrowth(initialCapital, annualRate, years, monthlyContribution);
    
    const finalYear = yearlyBreakdown[yearlyBreakdown.length - 1];

    if (!finalYear) {
      return res.status(500).json({ error: 'Error en el motor de cálculo.' });
    }

    return res.status(200).json({
      summary: {
        totalInvested: finalYear.totalCapital,
        totalInterest: finalYear.totalInterest,
        finalBalance: finalYear.balance
      },
      chartData: yearlyBreakdown 
    });
    
  } catch (error) {
    return res.status(500).json({ error: 'Error calculando el interés compuesto.' });
  }
};
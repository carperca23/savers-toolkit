
export interface YearlyData {
  year: number;
  totalCapital: number;
  totalInterest: number;
  balance: number;
}

export const calculateCompoundGrowth = (
  initialCapital: number,
  annualRate: number,
  years: number,
  monthlyContribution: number = 0 
): YearlyData[] => {
  const data: YearlyData[] = [];
  
  const monthlyRate = (annualRate / 100) / 12;
  const totalMonths = years * 12;
  
  let currentBalance = initialCapital;
  let totalCapitalInvested = initialCapital;

  data.push({
    year: 0,
    totalCapital: totalCapitalInvested,
    totalInterest: 0,
    balance: currentBalance
  });

  for (let month = 1; month <= totalMonths; month++) {
    currentBalance += monthlyContribution;
    totalCapitalInvested += monthlyContribution;

    const interestEarnedThisMonth = currentBalance * monthlyRate;
    currentBalance += interestEarnedThisMonth;

    if (month % 12 === 0) {
      const currentYear = month / 12;
      const totalInterest = currentBalance - totalCapitalInvested;

      data.push({
        year: currentYear,
        totalCapital: Math.round(totalCapitalInvested * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        balance: Math.round(currentBalance * 100) / 100
      });
    }
  }

  return data;
};
import { create } from 'zustand';

export const useMetricsStore = create((set, get) => ({
  revenue: {
    amazon: 28500,
    ecommerce: 16734,
    tiktok: 8500
  },
  expenses: {
    adSpend: 8500,
    managementCompensation: 12000,
    shipping: 4500,
    software: 0 // Will be calculated dynamically
  },
  totalCogs: 26867,
  calculateSoftwareFee: () => {
    const { revenue, expenses } = get();
    const totalRevenue = Object.values(revenue).reduce((sum, val) => sum + val, 0);
    return (totalRevenue * 0.1) + (expenses.adSpend * 0.1); // 10% of total income + 10% of ad budget
  },
  getTotal: () => {
    const { revenue, expenses, totalCogs, calculateSoftwareFee } = get();
    const totalRevenue = Object.values(revenue).reduce((sum, val) => sum + val, 0);
    
    // Calculate software fee
    const softwareFee = calculateSoftwareFee();
    expenses.software = softwareFee; // Update software fee
    
    const totalExpenses = Object.values({
      ...expenses,
      shipping: 0 // Remove shipping from expenses as it's part of totalCost
    }).reduce((sum, val) => sum + val, 0);
    
    const totalCost = totalCogs + expenses.shipping;
    const grossProfit = totalRevenue - totalCost;
    const netProfit = grossProfit - totalExpenses;
    
    return {
      totalRevenue,
      totalExpenses,
      totalCogs,
      totalCost,
      grossProfit,
      netProfit
    };
  }
}));
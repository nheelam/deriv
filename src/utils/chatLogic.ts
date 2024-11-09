import { api } from '../services/api';
import { Message, RiskLevel } from '../types';

export const generateResponse = async (input: string): Promise<{ text: string; riskLevel: RiskLevel }> => {
  const lowercaseInput = input.toLowerCase();
  
  if (lowercaseInput.includes('pattern')) {
    const analysis = await api.analyzePattern(input);
    const riskLevel: RiskLevel = analysis.risk > 0.7 ? 'high' : analysis.risk > 0.3 ? 'medium' : 'low';
    return {
      text: analysis.explanation,
      riskLevel,
    };
  }

  if (lowercaseInput.includes('alert')) {
    const alerts = await api.getAlerts();
    if (alerts.length === 0) {
      return {
        text: 'No active alerts at the moment.',
        riskLevel: 'low',
      };
    }
    return {
      text: `Found ${alerts.length} active alert(s). Latest alert: ${alerts[0].description}`,
      riskLevel: alerts[0].severity,
    };
  }

  if (lowercaseInput.includes('suspicious')) {
    const transactions = await api.getRecentTransactions();
    const flaggedTx = transactions.filter(t => t.status === 'flagged');
    return {
      text: `Found ${flaggedTx.length} flagged transaction(s). Analyzing patterns...`,
      riskLevel: 'high',
    };
  }

  return {
    text: "I'm analyzing your request. Could you provide more specific details about the trading activity you'd like me to examine?",
    riskLevel: 'low',
  };
};
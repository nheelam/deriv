import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { RiskLevel } from '../types';

export const getRiskIcon = (level?: RiskLevel) => {
  switch (level) {
    case 'high':
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    case 'medium':
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case 'low':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    default:
      return null;
  }
};
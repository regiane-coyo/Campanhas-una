export interface CampaignPeriod {
  month: 'Abril' | 'Maio';
  reach: number;
  leads: number;
  qualifiedRate: number; // in percentage, e.g., 5 for 5%
  budget: number; // in R$
  cpl: number; // Cost Per Lead in R$
}

export interface PlatformData {
  name: 'Google Ads' | 'Meta Ads';
  description: string;
  repositioning: string;
  repositioningHighlights: string[];
  history: CampaignPeriod[];
  advantages: string[];
}

export interface SimulationResult {
  google: {
    budget: number;
    reach: number;
    leads: number;
    qualifiedLeads: number;
    cpl: number;
    cpql: number; // Cost per qualified lead
  };
  meta: {
    budget: number;
    reach: number;
    leads: number;
    qualifiedLeads: number;
    cpl: number;
    cpql: number;
  };
  totals: {
    budget: number;
    leads: number;
    qualifiedLeads: number;
    conversionRate: number;
    overallCpql: number;
  };
}

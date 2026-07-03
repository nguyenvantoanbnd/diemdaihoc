export interface Major {
  code: string;
  name: string;
  group: 'economics' | 'technology' | 'other';
  thptScore2024: number;
  tsaScore2024: number;
  thptScore2023: number;
  tsaScore2023: number;
  hasMainSubject: boolean; // Math is main subject, multiplied by 2
  tuitionFeeMillion: number; // Tuition fee in millions VND per year
  careerProspect: string; // Brief career description
}

export interface CertificateConversion {
  ielts: number;
  toefl: number;
  convertedEnglishScore: number;
}

export interface SatActConversion {
  satMin: number;
  actMin: number;
  converted30Score: number;
}

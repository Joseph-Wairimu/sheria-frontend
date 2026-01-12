
export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
  { code: 'sh', label: 'Sheng', flag: '🇰🇪' },
];

export const DOCUMENT_TYPES = [
  'National ID',
  'Passport',
  'Birth Certificate',
  'Land Title',
  'Business Permit',
  'Academic Certificate',
  'Marriage Certificate',
  'Death Certificate',
];

export const PREDICTION_DOMAINS = [
  { value: 'education', label: 'Education' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'governance', label: 'Governance' },
  { value: 'infrastructure', label: 'Infrastructure' },
];

export const MODULE_ROUTES = [
  { path: '/', label: 'Dashboard', icon: 'dashboard' },
  { path: '/digitize', label: 'Digitize', icon: 'scanner' },
  { path: '/verify', label: 'Verify', icon: 'verified' },
  { path: '/ask', label: 'Ask', icon: 'chat' },
  { path: '/predict', label: 'Predict', icon: 'insights' },
];

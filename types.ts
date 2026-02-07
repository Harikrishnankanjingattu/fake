
export interface PalmPrediction {
  prediction: string;
  remedy: string;
  kumbidiWisdom: string;
  rating: string;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

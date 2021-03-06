import { TimeSerials } from '../api/types';

export interface ExchangeRateState {
  loading: boolean;
  error: any;
  data: TimeSerials | null,
}
export const ExchangeRateStoreName = 'exchangeRate';
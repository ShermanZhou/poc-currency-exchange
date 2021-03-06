import { CombinedState } from 'redux';
import { ExchangeRateState, ExchangeRateStoreName } from './exchange-rate.store';

export type AppRootState = CombinedState<{
    [ExchangeRateStoreName]: ExchangeRateState
}>;
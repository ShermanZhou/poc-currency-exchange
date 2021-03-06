import { combineReducers } from 'redux';
import { reducer } from './exchange-rate.reducer';
import { ExchangeRateStoreName } from '../store/exchange-rate.store';
const rootReducer = combineReducers(
    {
        [ExchangeRateStoreName]: reducer
    });

export default rootReducer;
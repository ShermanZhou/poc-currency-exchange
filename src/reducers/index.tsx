import { combineReducers } from 'redux';
import { reducer } from './exchange-rate.reducer';

const rootReducer = combineReducers(
    {
        exchangeRate: reducer
    });

export default rootReducer;
import { Action, Dispatch} from 'redux';
import { getExchangeRateHistory } from '../api/exchange-rate.api';
import { TimeSerials } from '../api/types';

enum ExchangeActionTypes {
    Fetch = 'Fetch',
    FetchSuccess = 'FetchSuccess',
    FetchFailure = 'FetchFailure'
}

export interface FetchRateParam {
    date: string,
    from: string;
    to: string
}
export interface FetchAction extends Action {
    data: FetchRateParam
}

export interface FetchSuccessAction extends Action {
    data: TimeSerials
}
export interface FetchFailureAction extends Action {
    data: any
}

const fetchExchangeRate = (data: FetchRateParam) => (dispatch: Dispatch) => {
    dispatch({
        type: ExchangeActionTypes.Fetch,
        data: data
    });
    return getExchangeRateHistory(data.date, data.from, data.to).then(res => res.json())
        .then(res => {
            dispatch({
                type: ExchangeActionTypes.FetchSuccess,
                data: res
            });
        }).catch(error => {
            dispatch({
                type: ExchangeActionTypes.FetchFailure,
                data: error
            });
        });
}

export {
    ExchangeActionTypes,
    fetchExchangeRate
}
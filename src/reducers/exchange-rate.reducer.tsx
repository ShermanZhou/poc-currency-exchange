import { produce } from 'immer';
import { ExchangeActionTypes, FetchAction, FetchSuccessAction, FetchFailureAction} from '../actions/exchange-rate.action';
import { Action } from 'redux';
import { ExchangeRateState } from '../store/exchange-rate.store';

const initialState: ExchangeRateState = {
  loading: false,
  error: null,
  data: null,
};

const reducer = produce((draft: ExchangeRateState, action: Action) => {
  let act;
  switch (action.type) {
    case ExchangeActionTypes.Fetch:
      act = action as FetchAction;
      draft.loading = true;
      draft.error = null;
      draft.data = null;
      return draft;
    case ExchangeActionTypes.FetchSuccess:
      act = action as FetchSuccessAction;
      draft.loading = false;
      draft.error = null;
      draft.data = act.data;
      return draft;
    case ExchangeActionTypes.FetchFailure:
      act = action as FetchFailureAction;
      draft.loading = false;
      draft.error = act.data;
      draft.data = null;
      return draft;
    default:
      return draft;
  }
}, initialState);

export { reducer };

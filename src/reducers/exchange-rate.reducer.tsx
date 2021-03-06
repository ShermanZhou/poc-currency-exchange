import { produce } from 'immer';
import { ExchangeActionTypes, FetchAction, FetchSuccessAction, FetchFailureAction} from '../actions/exchange-rate.action';
import { Action } from 'redux';
import { TimeSerials } from '../api/types';
interface ExchangeRateState {
  loading: boolean;
  error: any;
  data: TimeSerials | null,
}

const initialState: ExchangeRateState = {
  loading: false,
  error: null,
  data: null,
};

const reducer = produce((draft: ExchangeRateState, action: Action) => {
  let act;
  switch (action.type) {
    case action.type === ExchangeActionTypes.Fetch:
      act = action as FetchAction;
      draft.loading = true;
      draft.error = null;
      draft.data = null;
      return draft;
    case action.type === ExchangeActionTypes.FetchSuccess:
      act = action as FetchSuccessAction;
      draft.loading = false;
      draft.error = null;
      draft.data = act.data;
      return draft;
    case action.type === ExchangeActionTypes.FetchFailure:
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

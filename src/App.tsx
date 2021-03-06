import logo from './logo.svg';
import './App.css';
import { fetchExchangeRate } from './actions/exchange-rate.action';
import { CURRENCIES } from './types/currency-names';
import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux'
import { getMedian, extractRateArray } from './services';
import { AppRootState } from './store';
import { Table } from 'react-bootstrap';
import { ButtonGroup, ToggleButton, Button} from 'react-bootstrap';

function App() {
  const fetchDays = 10;
  const dispatch = useDispatch();

  const startDate = getStartDate(fetchDays);

  useEffect(() => {
    dispatch(fetchExchangeRate({
      date: startDate.toISOString().split('T')[0],
      from: CURRENCIES.USD,
      to: CURRENCIES.CAD
    }))
  }, [startDate.getTime()]);

  const exState = useSelector((state: AppRootState) => state.exchangeRate);
  const isLoaded = !exState.loading && exState.data;
  const rateArray = isLoaded ? extractRateArray(exState.data!,CURRENCIES.CAD):[];
  const flag = isLoaded ? getBuySellFlag(rateArray):0;

  return (
    <div className="App">
      <h2>Currency Exchange Portal</h2>
      { !isLoaded && <div>
         Application is loading ...
        </div>}
      {isLoaded &&
      <div>
        <Table>
          <thead>
            <tr>
              <th>Canadian Dollar</th>
              <th>US Dollar</th>
              <th></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{rateArray[rateArray.length-1]}</td>
              <td>{1}</td>
              <td>
                {flag!==0 &&
                  <ButtonGroup toggle>
                    <ToggleButton type="radio" name="radio" value={flag} checked={flag==1}>Buy</ToggleButton>
                    <ToggleButton type="radio" name="radio" value={flag} checked={flag==-1}>Sell</ToggleButton>
                  </ButtonGroup>
                }
              </td>
              <td>
                 <Button variant="primary">Submit</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <div>
          Historical exchange rates: { rateArray.join(', ')}
        </div>
      </div>}
    </div>
  );
}

function getStartDate(numOfDays: number): Date {
  const currentDate = new Date();
  const offset = 1000 * 24 * 3600 * numOfDays;
  const startDateTime = currentDate.getTime() - offset;
  const startDate = new Date(startDateTime);
  startDate.setHours(0, 0, 0, 0);
  return startDate;
}

function getBuySellFlag(rateData: number[]) {
  const latestValue = rateData[rateData.length - 1];
  const median = getMedian(rateData);
  if (latestValue < median) {
    return 1;
  } else if (latestValue > median) {
    return -1;
  }
  return 0;
}

export default App;

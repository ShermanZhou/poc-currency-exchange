import logo from './logo.svg';
import './App.css';
import { fetchExchangeRate } from './actions/exchange-rate.action';
import { CURRENCIES } from './types/currency-names';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'



function App() {
  const fetchDays = 10;
  const startDate = getStartDate(fetchDays);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExchangeRate({
      date: startDate.toISOString().split('T')[0],
      from: CURRENCIES.USD,
      to: CURRENCIES.CAD
    }))
  }, [startDate]);

  return (
    <div className="App">
      start date: { startDate.toISOString()}
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

export default App;

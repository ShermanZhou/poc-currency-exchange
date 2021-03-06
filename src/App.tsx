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
    const fetch = fetchExchangeRate({
      date: startDate,
      from: CURRENCIES.USD,
      to: CURRENCIES.CAD
    });
    fetch(dispatch);

  return (
    <div className="App">
      start date: { startDate}
    </div>
  );
}

function getStartDate(fetchDays: number): string {
  const currentDate = new Date();
  const offset = 1000 * 24 * 3600 * fetchDays;
  const startDateTime = currentDate.getTime() - offset;
  const startDate = new Date(startDateTime);
  return startDate.toISOString().split('T')[0];
}

export default App;

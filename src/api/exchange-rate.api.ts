import { } from '../types/currency-names';

const ApiRoot = '/api/';

const headers = {
    'content-type': 'application/json',
    'accept': 'application/json'
}

function getExchangeRateHistory(date: string, fromCurrency: string, toCurrency: string) {
    return fetch(`${ApiRoot}${date}..?from=${fromCurrency}&to=${toCurrency}`,{
        headers
    });
}

export {
   getExchangeRateHistory
}
import { TimeSerials } from "../api/types";
import { get } from 'lodash';
import quickSort from './quicksort';

function extractRateArray(ts: TimeSerials, currency: string): number[] {
    const arr: number[] = [];
    if(ts?.rates){
        Object.keys(ts.rates).forEach((r: string) => {
            const currencyRate = get(ts.rates, r);
            const rate = get(currencyRate, currency);
            if (rate !== null && rate !== undefined) {
                arr.push(rate);
            } else {
                throw new Error(`Can not find rate for currency for ${currency} @ ${r}`)
            }
        })
    }
    return arr;
}

function getMedian(unsorted: number[]): number {
    if (unsorted === null || unsorted === undefined || unsorted.length === 0) {
        throw new Error('invalid data');
    }
    if (unsorted.length === 1) {
        return unsorted[0];
    }
    unsorted = unsorted.slice();
    const sorted = quickSort(unsorted);
    const len = sorted.length;
    const isEven = len % 2 === 0;
    const index = Math.floor(len / 2);
    if (isEven) {
        return (sorted[index] + sorted[index + 1]) / 2;
    } else {
        return sorted[index + 1];
    }
}

export {
    extractRateArray, getMedian
}
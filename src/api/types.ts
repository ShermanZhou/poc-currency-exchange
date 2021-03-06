export type TimeSerials = {
    amount: number;
    base: string;
    start_date: string;
    end_date: string;
    rates: Array<{ [date: string]: { [currency: string]: number } }>;
}

import { DateRange } from "./date-range";

export interface SeasonalRate {
    period: DateRange,
    price: number
}
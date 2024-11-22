export interface ChartReturnType {
  data: {
    timestamp: string
    [key: string]: string | number
  }[]
  topics: string[]
  timeRange: {
    min: string
    max: string
  }
}

export enum ChartRange {
  ONE_MINUTE = '1m',
  FIFTEEN_MINUTES = '15m',
  ONE_HOUR = '1h',
  SIX_HOURS = '6h',
  TWELVE_HOURS = '12h',
  ONE_DAY = '1d',
  ONE_WEEK = '1w',
  ONE_MONTH = '1M'
}

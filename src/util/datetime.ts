// TODO: this should be a separate package perhaps?
//       or at least requires some unit testing.

import { format } from 'date-and-time'
import { providerFromFunctions, Pipe } from '@tmplr/core'


export const createDatetimeProvider = () => providerFromFunctions({
  now: async () => new Date().toISOString(),
  date: async () => new Date().toLocaleDateString(),
  time: async () => new Date().toLocaleTimeString(),
  year: async () => new Date().getFullYear().toString(),
  month: async () => new Date().getMonth().toString(),
  day: async () => new Date().getDate().toString(),
  hour: async () => new Date().getHours().toString(),
  minute: async () => new Date().getMinutes().toString(),
  second: async () => new Date().getSeconds().toString(),
  millisecond: async () => new Date().getMilliseconds().toString(),
  day_of_week: async () => new Date().toLocaleDateString(undefined, { weekday: 'long' }),
  month_of_year: async () => new Date().toLocaleDateString(undefined, { month: 'long' }),
})


export const datetimeFormatPipe: Pipe = (value: string, pattern: string) => {
  const date = new Date(value)
  if (pattern.startsWith('locale ')) {
    return date.toLocaleString(pattern.slice(7).trim())
  } else {
    return format(date, pattern)
  }
}


export const dateFormatPipe: Pipe = (value: string, pattern: string)  => {
  const date = new Date(value)
  if (pattern.startsWith('locale ')) {
    return date.toLocaleDateString(pattern.slice(7).trim())
  } else {
    return format(date, pattern)
  }
}


export const timeFormatPipe: Pipe = (value: string, pattern: string)  => {
  const date = new Date(value)
  if (pattern.startsWith('locale ')) {
    return date.toLocaleTimeString(pattern.slice(7).trim())
  } else {
    return format(date, pattern)
  }
}


export const DATETIME_FORMAT_PIPES = {
  'datetime format': datetimeFormatPipe,
  'date format': dateFormatPipe,
  'time format': timeFormatPipe,
}

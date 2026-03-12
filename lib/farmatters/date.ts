import { addDays, formatDate as formatDateFns } from 'date-fns'
import dayjs from 'dayjs'

export function formatDate(date: string | Date | dayjs.Dayjs, formatter = 'MMMM D, YYYY'): string {
  if (!date) return ''
  return dayjs(date).format(formatter)
}

export function formatTimeAndDate(
  date: string | Date | dayjs.Dayjs,
  formatter = 'h.mm A, D MMM, YYYY',
): string {
  return dayjs(date).format(formatter)
}

export function addDaysBy(d: Date, by: number, formatter = 'yyyy-MM-dd') {
  return formatDateFns(addDays(d, by), formatter)
}

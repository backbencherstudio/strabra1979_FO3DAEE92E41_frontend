import dayjs from 'dayjs'

export function formatDate(date?: string | Date | dayjs.Dayjs, formatter = 'MMMM D, YYYY'): string {
  if (!date) return ''
  return dayjs(date).format(formatter)
}

export function formatTimeAndDate(
  date: string | Date | dayjs.Dayjs,
  formatter = 'h.mm A, D MMM, YYYY',
): string {
  return dayjs(date).format(formatter)
}

export function addDaysBy(d: Date, by: number, formatter = 'YYYY-MM-DD') {
  return dayjs(d).add(by, 'day').format(formatter)
}

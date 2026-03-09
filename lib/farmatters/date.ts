import dayjs from 'dayjs'

export function formatDate(date: string | Date | dayjs.Dayjs, formatter = 'MMMM D, YYYY'): string {
  return dayjs(date).format(formatter)
}

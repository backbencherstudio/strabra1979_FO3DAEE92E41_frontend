import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

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

export const formatTimeAgo = (date: string) => dayjs(date).fromNow()

// Override default strings
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1s',
    m: '1min',
    mm: '%dmin',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy',
  },
})

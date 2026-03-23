'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { isArrayEmpty } from '@/lib/utils'
import { IActivityLogListItem } from '@/types'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import ActivityLogListItem from '../activity-log/ActivityLogListItem'
import { Button } from '@/components/ui/button'
import { appRoutes } from '@/constant'

interface RecentActivityLogsProps {
  isLoading: boolean
  data?: IActivityLogListItem[]
}

export default function RecentActivityLogs({ isLoading, data }: RecentActivityLogsProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-foreground text-base font-semibold">Activity Log</CardTitle>
        </div>

        <Button asChild variant="link" size="link" theme="text">
          <Link href={appRoutes.admin.propertyList}>
            View All <ChevronRight />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col items-start gap-6">
          {isLoading || isArrayEmpty(data) ? (
            <li className="loading-text">
              {isLoading ? 'Loading activity logs...' : 'No activity logs found.'}
            </li>
          ) : (
            data.map((log) => <ActivityLogListItem hideRole key={log.id} log={log} />)
          )}
        </ul>
      </CardContent>
    </Card>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { defineColumns } from '../reusable/table/CustomTable'
import { IInspectionMediaFile2, IInspectionMediaFileItem } from '@/types'
import { formatDate, withNA } from '@/lib/farmatters'
import { formatFileSize } from '../reusable/FileInput/FileInput'

// ==================== DATE FORMATTER ====================
const formatUserDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  return `${day} ${month}, ${year}`
}

type DocumentsTableItem = {
  no: number
  id: string
  report: string
  size: string
  address: string
  updated_at: string
}

// ==================== Report COLUMNS CONFIGURATION ====================
export const DocumentsTableColumns = defineColumns<IInspectionMediaFile2>([
  {
    label: 'Name',
    accessor: 'fileName',
  },
  {
    label: 'Last Update',
    accessor: 'uploadedAt',
    formatter: (value) => withNA(value, formatDate),
  },
  {
    label: 'File Size',
    accessor: 'size',
    formatter: (_, { fileSize, size }) => withNA(fileSize ?? size ?? 0, formatFileSize),
  },
  {
    label: '',
    accessor: 'url',
    formatter: (value) => {
      if (!value) return

      return (
        <Button asChild variant="muted" size="icon" className="rounded-full">
          <Link href={value}>
            <EyeIcon />
          </Link>
        </Button>
      )
    },
  },
])

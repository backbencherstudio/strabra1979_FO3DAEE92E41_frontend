'use client'

import {
  useGetDashboardTemplateListQuery,
  useHardDeleteSingleDashboardTemplateMutation,
  useToggleTemplateStatusMutation,
} from '@/api/template/templateManagementApi'
import TemplateStatusBadge from '@/components/dashboard/ProgressStatusBadge/TemplateStatusBadge'
import { Edit } from '@/components/icons/Edit'
import { Trush } from '@/components/icons/Trush'
import FullPageSpinner from '@/components/reusable/FullPageSpinner/FullPageSpinner'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { routes } from '@/constant'
import { getErrorMessage } from '@/lib/farmatters'
import { Check, EllipsisVertical, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import CreateNewTemplateModal from '../CreateNewTemplateModal/CreateNewTemplateModal'
import { ITemplateActiveStatus } from '@/types'

export default function TemplateHome() {
  const { data: { data = [] } = {}, isLoading } = useGetDashboardTemplateListQuery()

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <div className="@container">
      <SectionCard>
        <div className="flex items-center justify-between">
          <SectionTitle className="md:text-2xl">Template</SectionTitle>
          <CreateNewTemplateModal />
        </div>

        <section className="@8xl:grid-cols-4 mt-4 grid gap-5 @2xl:grid-cols-2 @4xl:grid-cols-3">
          {data.map((item) => (
            <SectionCard key={item.id} className="flex justify-between bg-white px-3 py-3">
              <div className="flex flex-1 flex-col justify-between gap-1">
                <SectionTitle className="text-lg">{item.name}</SectionTitle>

                <div className="space-x-1">
                  <span>Status</span>
                  <TemplateStatusBadge status={item.status} />
                </div>
              </div>

              <div>
                <DropdownMenuIcons status={item.status} id={item.id} />
              </div>
            </SectionCard>
          ))}
        </section>
      </SectionCard>
    </div>
  )
}

export function DropdownMenuIcons({ id, status }: { id: string; status: ITemplateActiveStatus }) {
  const router = useRouter()
  const [hardDeleteSingleDashboardTemplate, { isLoading: isLoadingDelete }] =
    useHardDeleteSingleDashboardTemplateMutation()
  const [toggleTemplateStatus, { isLoading: isLoadingToggle }] = useToggleTemplateStatusMutation()

  async function handleToggleStatus(id: string) {
    try {
      const res = await toggleTemplateStatus({ id }).unwrap()

      toast.success(res.message || 'Template status updated')
    } catch (err) {
      toast.error('Failed to toggle status', {
        description: getErrorMessage(err),
      })
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await hardDeleteSingleDashboardTemplate({
        id,
      }).unwrap()

      toast.success(res.message || 'Template deleted')
    } catch (err) {
      toast.error('Failed to delete template', {
        description: getErrorMessage(err),
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon-sm" variant="outline">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => router.push(routes.admin.templatesDetial.build({ templateId: id }))}
        >
          <Eye />
          View
        </DropdownMenuItem>
        {/* <DropdownMenuItem> */}
        {/*   <Edit /> */}
        {/*   Edit */}
        {/* </DropdownMenuItem> */}

        <DropdownMenuItem
          className="capitalize"
          onClick={() => handleToggleStatus(id)}
          disabled={isLoadingToggle}
        >
          <Check />
          {status.toUpperCase() === 'ACTIVE' ? 'inactive' : 'active'}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleDelete(id)} disabled={isLoadingDelete}>
          <Trush />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

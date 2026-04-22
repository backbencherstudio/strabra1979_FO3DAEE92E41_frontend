'use client'

import {
  useGetDashboardTemplateListQuery,
  useHardDeleteSingleDashboardTemplateMutation,
} from '@/api/template/templateManagementApi'
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

export default function TemplateHome() {
  const { data: { data = [] } = {}, isLoading } = useGetDashboardTemplateListQuery()

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <div>
      <SectionCard>
        <div className="flex items-center justify-between">
          <SectionTitle className="md:text-2xl">Template</SectionTitle>
          <CreateNewTemplateModal />
        </div>

        <section className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.map((item) => (
            <SectionCard key={item.id} className="flex items-start justify-between bg-white py-3">
              <SectionTitle className="mt-1 text-lg">{item.name}</SectionTitle>

              <DropdownMenuIcons id={item.id} />
            </SectionCard>
          ))}
        </section>
      </SectionCard>
    </div>
  )
}

export function DropdownMenuIcons({ id }: { id: string }) {
  const router = useRouter()
  const [hardDeleteSingleDashboardTemplate, { isLoading: isLoadingDelete }] =
    useHardDeleteSingleDashboardTemplateMutation()

  async function handleDelete(id: string) {
    try {
      const res = await hardDeleteSingleDashboardTemplate({
        id,
      }).unwrap()

      toast.success(res.message || 'Success message')
    } catch (err) {
      toast.error('Error title', {
        description: getErrorMessage(err),
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
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
        <DropdownMenuItem>
          <Edit />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Check />
          Activate
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleDelete(id)} disabled={isLoadingDelete}>
          <Trush />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

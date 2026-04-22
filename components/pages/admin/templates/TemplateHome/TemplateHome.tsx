'use client'

import { Edit } from '@/components/icons/Edit'
import { Trush } from '@/components/icons/Trush'
import {
  DialogProps,
  EditInputDialog,
} from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/modals/EditInputDialog/EditInputDialog'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import { EllipsisVertical, Eye, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TemplateHome() {
  const templates = ['Sync Template', 'Orbit Template', 'Pulse Template']
  return (
    <div>
      <SectionCard>
        <div className="flex items-center justify-between">
          <SectionTitle className="md:text-2xl">Template</SectionTitle>
          <CreateNewTemplateModal />
        </div>

        <section className="mt-4 grid grid-cols-3 gap-5">
          {templates.map((item) => (
            <SectionCard key={item} className="flex items-center justify-between bg-white py-3">
              <SectionTitle className="text-lg">{item}</SectionTitle>

              <DropdownMenuIcons />
            </SectionCard>
          ))}
        </section>
      </SectionCard>
    </div>
  )
}

function CreateNewTemplateModal({ ...props }: DialogProps) {
  return (
    <EditInputDialog
      title="Add New Template"
      titleClass="text-center w-full"
      trigger={
        <Button size="xl">
          <Plus className="size-5" />
          Add New Template
        </Button>
      }
      footer={
        <>
          <DialogClose asChild>
            <Button type="button" size="xl" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button type="button" size="xl">
              Create
            </Button>
          </DialogClose>
        </>
      }
      {...props}
    >
      <section className="relative space-y-3 pb-1">
        <Field>
          <FieldLabel htmlFor="name">Template Name</FieldLabel>
          <InputGroup>
            <InputGroupInput placeholder="Enter new template name" />
          </InputGroup>
        </Field>
      </section>
    </EditInputDialog>
  )
}

export function DropdownMenuIcons() {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push(`/admin/templates/${123}`)}>
          <Eye />
          View
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trush />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

'use client'

import { ShareIcon } from '@/components/icons/ShareIcon'
import { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import EditTemplagePage from './EditTemplagePage'

import { useReorderAndUpdateSectionPropertiesMutation } from '@/api/template/templateManagementApi'
import { Edit } from '@/components/icons/Edit'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { getErrorMessage } from '@/lib/farmatters'
import { selectCurrentBox } from '@/redux/features/template/templateSlice'
import { useTemplateProperties } from '@/redux/features/template/useTemplateProperties'
import { store, useAppSelector } from '@/redux/store'
import { EDIT_BOX_SIZES, EditBoxSize } from '@/types'
import { Save } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { MOCK_PROPERTY_DETAILS } from './mock'

export default function TemplatePropertiesPanel() {
  const params = useParams<{ templateId: string }>()
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'

  const [syncChangesWithServer, { isLoading: isLoadingSync }] =
    useReorderAndUpdateSectionPropertiesMutation()

  async function onSave() {
    if (!params?.templateId) return
    const sortedSections = store.getState().template.sections.toSorted((a, b) => a.order - b.order)

    const changedSections = sortedSections.map((item) => ({
      type: item.type,
      label: item.changedFields.includes('label') ? item.label : undefined,
      width: item.changedFields.includes('width') ? item.style.width : undefined,
    }))

    try {
      await syncChangesWithServer({
        id: params.templateId,
        data: {
          order: sortedSections.map((item) => item.type),
          sections: changedSections,
        },
      })
    } catch (err) {
      toast.error('Error title', {
        description: getErrorMessage(err),
      })
    }
  }

  return (
    <div className="full-page bg-normal-25 flex flex-1">
      <section className="flex-1 overflow-y-auto border-r bg-white p-6">
        {/* <div className="mb-3 h-100 bg-green-300"></div> */}
        {/* <div className="mb-3 h-100 bg-green-300"></div> */}
        {/* <div className="mb-3 h-100 bg-green-300"></div> */}
        {/* <div className="mb-3 h-100 bg-green-300"></div> */}
        <EditTemplagePage
          isEditMode={isEditMode}
          property={MOCK_PROPERTY_DETAILS}
          headerRightContent={
            <Button variant="outline">
              <ShareIcon />
              Share
            </Button>
          }
        />
      </section>

      {isEditMode ? (
        <section className="sticky top-(--dashboard-header-height) h-full w-66 rounded-none border-0">
          <div className="flex items-center justify-between border-b p-4.5">
            <SectionTitle className="">Template</SectionTitle>
          </div>

          <section className="space-y-3 p-4.5">
            <LabelBox />

            <SizeBox />

            <Button
              disabled={isLoadingSync}
              onClick={onSave}
              className="w-full rounded-full bg-blue-500 px-6 hover:bg-blue-600"
              variant="default"
            >
              {isLoadingSync ? <Spinner /> : null}
              {isLoadingSync ? 'Saving...' : 'Save Changes'}
            </Button>
          </section>
        </section>
      ) : null}
    </div>
  )
}

export function LabelBox() {
  const { updateLabel } = useTemplateProperties()

  const currentBox = useAppSelector(selectCurrentBox)
  const [isEditMode, setIsEditMode] = useState(false)

  const [input, setInput] = useState('')

  function syncLabel(value: string) {
    value = value.trim()
    if (!value) return

    if (!currentBox) return

    updateLabel({ currentBox, newLablel: value })
  }

  function handleSave() {
    if (!currentBox) return

    if (!isEditMode) {
      setIsEditMode(true)
      setInput(currentBox?.data.label ?? '')
      return
    }

    const value = input.trim()
    if (!value) return

    updateLabel({ currentBox, newLablel: value })
    setIsEditMode(false)
  }

  if (!currentBox) return null

  return (
    <div className="bg-hover-50 grid gap-3 rounded-md p-3">
      <div className="flex items-center justify-between">
        <SectionTitle className="text-base">Edit Label</SectionTitle>

        <Button
          onClick={handleSave}
          size="icon-sm"
          className="bg-pressed-100 rounded-full"
          variant="outline"
        >
          {isEditMode ? <Save /> : <Edit className="size-4" />}
        </Button>
      </div>

      {isEditMode ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
        >
          <div>
            <InputGroup className="bg-pressed-100 h-9">
              <InputGroupInput
                autoFocus
                onBlur={() => setTimeout(() => setIsEditMode(false), 300)}
                value={input}
                onChange={(e) => {
                  syncLabel(e.target.value)
                  setInput(e.target.value)
                }}
              />
            </InputGroup>
          </div>
        </form>
      ) : null}
    </div>
  )
}

export function SizeBox() {
  const currentBox = useAppSelector(selectCurrentBox)
  const { updateWidth } = useTemplateProperties()

  async function hanndleWidthChange(newWidth: EditBoxSize) {
    if (!currentBox) {
      return
    }

    updateWidth({ currentBox, newWidth })
  }

  if (!currentBox) return null

  return (
    <div className="bg-hover-50 space-y-3 rounded-md p-3">
      <SectionTitle className="text-base">Size</SectionTitle>
      <div className="flex gap-2 *:flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Width</span>
          <Select
            // disabled={isLoading}
            value={currentBox.data.style.width}
            onValueChange={(value) => hanndleWidthChange(value as EditBoxSize)}
          >
            <SelectTrigger size="sm" className="bg-pressed-100 flex-1">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.keys(EDIT_BOX_SIZES).map((sizeKey) => (
                  <SelectItem key={sizeKey} value={sizeKey}>
                    {sizeKey}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

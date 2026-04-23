'use client'

import { ShareIcon } from '@/components/icons/ShareIcon'
import { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { mockPropertyDetails } from '@/constant/mock'
import PropertyTemplagePage from './PropertyTemplagePage'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EDIT_BOX_SIZES } from '@/types'
import { useAppSelector } from '@/redux/store'
import { CurrentSelectedBox, selectCurrentBox } from '@/redux/features/template/templateSlice'

export default function TemplatePropertiesPanel() {
  const currentBox = useAppSelector(selectCurrentBox)

  return (
    <div className="full-page bg-normal-25 flex flex-1">
      <section className="flex-1 overflow-y-auto border-r bg-white p-6">
        {/* <div className="mb-3 h-100 bg-green-300"></div> */}
        {/* <div className="mb-3 h-100 bg-green-300"></div> */}
        {/* <div className="mb-3 h-100 bg-green-300"></div> */}
        {/* <div className="mb-3 h-100 bg-green-300"></div> */}
        <PropertyTemplagePage
          property={mockPropertyDetails}
          headerRightContent={
            <Button variant="outline">
              <ShareIcon />
              Share
            </Button>
          }
        />
      </section>

      <section className="sticky top-(--dashboard-header-height) h-full w-66 rounded-none border-0">
        <SectionTitle className="border-b p-4.5">Template</SectionTitle>
        <div className="space-y-3 p-4.5">
          <div className="bg-hover-50 space-y-3 rounded-md p-3">
            <SectionTitle className="text-base">Add Quick Style</SectionTitle>
            <div className="flex gap-2 *:flex-1">
              <Button className="bg-pressed-100" variant="outline">
                Text
              </Button>
              <Button className="bg-pressed-100" variant="outline">
                Media
              </Button>
            </div>
          </div>

          <SizeBox currentBox={currentBox} />
        </div>
      </section>
    </div>
  )
}

interface SizeBoxProps {
  currentBox: CurrentSelectedBox | null
}

export function SizeBox({ currentBox }: SizeBoxProps) {
  if (!currentBox) return null

  return (
    <div className="bg-hover-50 space-y-3 rounded-md p-3">
      <SectionTitle className="text-base">Size</SectionTitle>
      <div className="flex gap-2 *:flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Width</span>
          <Select>
            <SelectTrigger size="sm" className="bg-pressed-100 flex-1">
              <SelectValue placeholder="Theme" />
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

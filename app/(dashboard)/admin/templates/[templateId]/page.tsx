import { ShareIcon } from '@/components/icons/ShareIcon'
import { Property } from '@/components/reusable/PropertyCard/PropertyCard'
import { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import PropertyTemplagePage from './PropertyTemplagePage'
import { mockPropertyDetails } from '@/constant/mock'

export default function TemplateDetailsPage() {
  return (
    <div className="full-page bg-normal-25 flex flex-1">
      <section className="flex-1 overflow-y-auto border-r bg-white p-6">
        {/* <div className="mb-3 h-100 bg-green-300"></div> */}
        {/* <div className="mb-3 h-100 bg-green-300"></div> */}
        {/* <div className="mb-3 h-100 bg-green-300"></div> */}
        {/* <div className="mb-3 h-100 bg-green-300"></div> */}
        <PropertyTemplagePage
          headerRightContent={
            <Button variant="outline">
              <ShareIcon />
              Share
            </Button>
          }
          id={'1234'}
          property={mockPropertyDetails}
        />
      </section>

      <section className="sticky top-(--dashboard-header-height) h-full w-66 rounded-none border-0">
        <SectionTitle className="border-b p-4.5">Template</SectionTitle>
        <div className="p-4.5">
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
        </div>
      </section>
    </div>
  )
}

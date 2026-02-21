import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'

export default function page() {
  return (
    <div>
      <SectionCard>
        <SharedPropertyCardListActions title="Reports Updates" titleClassName="text-forground" />
        {/* TODO: add table */}
      </SectionCard>
    </div>
  )
}

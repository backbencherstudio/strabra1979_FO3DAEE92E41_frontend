import { PlusSignSquare } from '@/components/icons/File'
import EditInputFeilds, {
  CreateMoreInputModalProps,
} from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/EditInputFeilds/EditInputFeilds'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function CreateTemplateMoreInputModal({
  editFieldType,
  ...props
}: CreateMoreInputModalProps) {
  const [isInputRequired, setIsInputRequired] = useState(false)
  const [isInputDropDown, setIsInputDropDown] = useState(false)

  const [mediaInputType, setMediaInputType] = useState<'media' | 'embedded'>('media')

  return (
    <EditInputFeilds
      title="Add More Supporting Media & Embedded Contents"
      titleClass="text-center w-full"
      dialogContainerClass={cn('', {
        'sm:max-w-235': editFieldType !== 'input-mark',
      })}
      footer={
        <>
          <DialogClose asChild>
            <Button type="button" size="xl" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" size="xl">
            Create
          </Button>
        </>
      }
      {...props}
    >
      <div className="grid grid-cols-2 divide-x *:first:pr-4 *:last:pl-4">
        <section className="relative space-y-3">
          <SectionCard className="space-y-2 bg-white p-3">
            <SectionTitle className="text-center">Photos</SectionTitle>
            <div className="bg-hover-50 aspect-3/2 rounded-md" />
          </SectionCard>
        </section>

        <section className="slim-scrollbar -mr-6 max-h-[75svh] gap-4 overflow-y-auto pr-6">
          <p className="w-full text-center font-medium">Media file</p>
          <div className="mt-3 space-y-5">
            <Field className="grid grid-cols-[1fr_3fr]">
              <FieldLabel className="text-nowrap" htmlFor="name">
                Title
              </FieldLabel>
              <InputGroup>
                <InputGroupInput placeholder="Enter input label" />
              </InputGroup>
            </Field>

            <Field className="grid grid-cols-[1fr_3fr]">
              <FieldLabel className="text-nowrap" htmlFor="name">
                Media Files
              </FieldLabel>
              <Switch
                checked={mediaInputType == 'media'}
                onClick={() => setMediaInputType('media')}
              />
            </Field>

            <Field className="grid grid-cols-[1fr_3fr]">
              <FieldLabel className="text-nowrap" htmlFor="name">
                Embedded
              </FieldLabel>
              <Switch
                checked={mediaInputType == 'embedded'}
                onClick={() => setMediaInputType('embedded')}
              />
            </Field>
          </div>

          {isInputDropDown ? (
            <div className="space-y-2">
              <div className="text-sm">Add dropdown options</div>

              <Field>
                <InputGroup className="h-11">
                  <InputGroupInput placeholder="Enter dropdown option" />
                </InputGroup>
              </Field>

              <Field>
                <InputGroup className="h-11">
                  <InputGroupInput placeholder="Enter dropdown option" />
                </InputGroup>
              </Field>

              <Button variant="muted" type="button" className="w-full">
                <PlusSignSquare className="size-6" />
                Add More
              </Button>
            </div>
          ) : null}
        </section>
      </div>
    </EditInputFeilds>
  )
}

import { FileImage } from '@/components/icons/File'
import { FileInput } from '@/components/reusable/FileInput/FileInput'
import { FileInputProvider } from '@/components/reusable/FileInput/FileInputProvider'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { InputFieldType } from './EditInputDialog/EditInputDialog'

interface CreateMoreInputModalPreviewProps {
  modalType: 'checklist' | 'mediafiles'

  label: string
  placeholder: string

  isInputRequired: boolean
  dropdownOptions: string[]

  createFieldType: InputFieldType
}

export function CreateMoreInputModalPreview({
  label,
  placeholder,
  createFieldType,
  isInputRequired,
  modalType,
  dropdownOptions,
}: CreateMoreInputModalPreviewProps) {
  const inputLabel = label.trim() === '' ? 'Input Label' : label
  const inputPlaceholder = placeholder.trim() === '' ? 'Enter placeholder' : placeholder

  const isMediaFilesModal = modalType === 'mediafiles'
  const showDropdownInput = createFieldType === 'input-dropdown' && modalType === 'checklist'
  const showEmbeddedInput = createFieldType === 'input-media-embedded' && modalType === 'mediafiles'

  return (
    <section className="relative space-y-3">
      <div className="text-center font-medium">Previw</div>

      {isMediaFilesModal ? (
        <Field>
          <FieldLabel isRequired={isInputRequired} htmlFor="previw-field">
            {inputLabel}
          </FieldLabel>

          {showEmbeddedInput ? (
            <InputGroup>
              <InputGroupTextarea
                className="disabled:opacity-100"
                id="previw-field"
                disabled
                placeholder={inputPlaceholder}
              />
            </InputGroup>
          ) : (
            <FileInputProvider>
              <FileInput id="previw-field" icon={<FileImage />} placeholder={inputPlaceholder} />
            </FileInputProvider>
          )}
        </Field>
      ) : showDropdownInput ? (
        <>
          <Field>
            <FieldLabel isRequired={isInputRequired} id="previw-field">
              {inputLabel}
            </FieldLabel>
            <Select disabled>
              <SelectTrigger id="previw-field" className="relative">
                <SelectValue placeholder={inputPlaceholder} />
              </SelectTrigger>
            </Select>
          </Field>

          <ul className="border-input min-h-10 space-y-2.5 rounded-md border bg-white px-2.5 py-2 shadow-lg">
            {dropdownOptions.map((item, idx) => (
              <li key={idx} className="text-muted-foreground line-clamp-1 text-sm">
                {item.trim() === '' ? 'Enter option' : item}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Field>
          <FieldLabel isRequired={isInputRequired} htmlFor="previw-field">
            {inputLabel}
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              className="disabled:opacity-100"
              id="previw-field"
              disabled
              placeholder={inputPlaceholder}
            />
          </InputGroup>
        </Field>
      )}
    </section>
  )
}

'use client'

import { Edit } from '@/components/icons/Edit'
import { FileImage } from '@/components/icons/File'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import {
  EmbedFieldsData,
  IInspectionMediaField,
  IPropertyInspectionFormData,
  MediaFieldItem,
} from '@/types'
import { Dispatch, SetStateAction } from 'react'
import { MediaField } from './MediaField'

interface InspectionMediaFormProps {
  formConfig?: IPropertyInspectionFormData
  mediaFields: IInspectionMediaField[] | undefined
  files: MediaFieldItem[]
  setFiles: Dispatch<SetStateAction<MediaFieldItem[]>>
  embedFields: EmbedFieldsData
  setEmbedFields: Dispatch<SetStateAction<EmbedFieldsData>>
  isEditMode?: boolean
  onOpenEditModal: (conf: IInspectionMediaField) => void
}

export default function InspectionMediaForm({
  mediaFields,
  files,
  setFiles,
  embedFields,
  setEmbedFields,
  isEditMode = false,
  onOpenEditModal,
}: InspectionMediaFormProps) {
  // const maxImageSize = mbToBytes(100)
  // const maxVideoSize = mbToBytes(1024)

  // function testLabel(conf: IInspectionMediaField) {
  //   return [conf.label, '|', 'isSystem =', conf.isSystem, '|', 'type =', conf.type].join(' ')
  // }

  return (
    <form>
      <FieldGroup>
        {mediaFields?.map((conf) => {
          if (conf.type === 'file') {
            return (
              <MediaField
                labelAction={
                  isEditMode ? (
                    <Button
                      type="button"
                      size="icon-sm"
                      onClick={() => onOpenEditModal(conf)}
                      variant="outline"
                    >
                      <Edit className="size-4" />
                    </Button>
                  ) : null
                }
                setFiles={setFiles}
                files={files}
                key={conf.key}
                label={conf.label}
                keyName={conf.key}
                accept={conf.accept?.join(',')}
                placeholder={conf.placeholder}
                icon={<FileImage />}
                // maxSize={maxImageSize}
                inputContainerClassName="h-35"
              />
            )
          }

          if (conf.type === 'embed') {
            const embededFieldValue = embedFields[conf.key] ?? ''
            return (
              <Field key={conf.key}>
                <FieldLabel className="justify-between">
                  {conf.label}

                  {isEditMode ? (
                    <Button
                      type="button"
                      size="icon-sm"
                      onClick={() => onOpenEditModal(conf)}
                      variant="outline"
                    >
                      <Edit className="size-4" />
                    </Button>
                  ) : null}
                </FieldLabel>
                <Textarea
                  placeholder={conf.placeholder}
                  value={embededFieldValue}
                  onChange={(e) => {
                    setEmbedFields({ ...embedFields, [conf.key]: e.target.value })
                  }}
                  className="squircle min-h-65 bg-white md:h-full"
                />
              </Field>
            )
          }

          if (conf.type === 'document') {
            return (
              <MediaField
                labelAction={
                  isEditMode ? (
                    <Button
                      type="button"
                      size="icon-sm"
                      onClick={() => onOpenEditModal(conf)}
                      variant="outline"
                    >
                      <Edit className="size-4" />
                    </Button>
                  ) : null
                }
                setFiles={setFiles}
                files={files}
                key={conf.key}
                label={conf.label}
                keyName={conf.key}
                accept={conf.accept?.join(',')}
                placeholder={conf.placeholder}
                // maxSize={maxImageSize}
                inputContainerClassName="h-35"
                alwaysHideInput={true}
              />
            )
          }
        })}
      </FieldGroup>
    </form>
  )
}

'use client'

import { FileImage, FileVideo } from '@/components/icons/File'
import { mbToBytes } from '@/components/reusable/FileInput/FileInput'
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
}

export default function InspectionMediaForm({
  mediaFields,
  files,
  setFiles,
  embedFields,
  setEmbedFields,
}: InspectionMediaFormProps) {
  const maxImageSize = mbToBytes(100)
  const maxVideoSize = mbToBytes(1024)

  return (
    <form>
      <FieldGroup>
        {mediaFields?.map((conf) => {
          if (conf.key === 'mediaFiles') {
            return (
              <MediaField
                setFiles={setFiles}
                files={files}
                key={conf.key}
                label={conf.label}
                keyName={conf.key}
                accept={conf.accept?.join(',')}
                placeholder={conf.placeholder}
                icon={<FileImage />}
                maxSize={maxImageSize}
                inputContainerClassName="h-35"
              />
            )
          }

          if (conf.key === 'aerialMap') {
            return (
              <MediaField
                setFiles={setFiles}
                files={files}
                multiple={false}
                key={conf.key}
                label={conf.label}
                keyName={conf.key}
                accept={conf.accept?.join(',')}
                placeholder={conf.placeholder}
                icon={<FileVideo />}
                maxSize={maxVideoSize}
                inputContainerClassName="h-65"
              />
            )
          }

          if (conf.key === 'tour3d') {
            const tour3dValue = embedFields['tour3d'] ?? ''
            return (
              <Field key={conf.key}>
                <FieldLabel>{conf.label}</FieldLabel>
                <Textarea
                  placeholder={conf.placeholder}
                  value={tour3dValue}
                  onChange={(e) => {
                    setEmbedFields({ ...embedFields, [conf.key]: e.target.value })
                  }}
                  className="squircle h-65 resize-none bg-white md:h-full"
                />
              </Field>
            )
          }

          if (conf.key === 'documents') {
            return (
              <MediaField
                setFiles={setFiles}
                files={files}
                key={conf.key}
                label={conf.label}
                keyName={conf.key}
                accept={conf.accept?.join(',')}
                placeholder={conf.placeholder}
                maxSize={maxImageSize}
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

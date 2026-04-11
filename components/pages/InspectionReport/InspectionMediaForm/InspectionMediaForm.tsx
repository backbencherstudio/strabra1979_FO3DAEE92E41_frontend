'use client'

import { FileVideo } from '@/components/icons/File'
import { FileInput, mbToBytes } from '@/components/reusable/FileInput/FileInput'
import { FileInputProvider } from '@/components/reusable/FileInput/FileInputProvider'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { IPropertyInspectionFormData, MediaFieldKeyType } from '@/types'
import { useState } from 'react'
import { MediaField } from './MediaField'

interface InspectionMediaFormProps {
  formConfig?: IPropertyInspectionFormData
}

export default function InspectionMediaForm({ formConfig }: InspectionMediaFormProps) {
  const maxImageSize = mbToBytes(100)
  const maxVideoSize = mbToBytes(1024)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const onSelectNewImage = (file: File, index: number) => {
    setImageFiles((v) => {
      const cImages = [...v]
      if (index >= 0 && index < cImages.length) {
        cImages[index] = file
      } else {
        cImages.push(file)
      }
      return cImages
    })
  }

  const [files, setFiles] = useState<{ key: MediaFieldKeyType; file: File }[]>([])

  return (
    <form>
      <FieldGroup>
        {formConfig?.form.mediaFields.map((conf) => {
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
                maxSize={maxImageSize}
                inputContainerClassName="h-35"
              />
            )
          }

          if (conf.key === 'aerialMap') {
            return (
              <Field key={conf.key}>
                <FieldLabel>{conf.label}</FieldLabel>
                <FileInputProvider>
                  <FileInput
                    accept={conf.accept?.join(',')}
                    placeholder={conf.placeholder}
                    onChange={(files) => onSelectNewImage(files[0], 0)}
                    multiple={false}
                    icon={<FileVideo />}
                    maxSize={maxVideoSize}
                    inputContainerClassName="h-65"
                  />
                </FileInputProvider>
              </Field>
            )
          }

          if (conf.key === 'tour3d') {
            return (
              <Field key={conf.key}>
                <FieldLabel>3D Tours </FieldLabel>
                <Textarea
                  placeholder={conf.placeholder}
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

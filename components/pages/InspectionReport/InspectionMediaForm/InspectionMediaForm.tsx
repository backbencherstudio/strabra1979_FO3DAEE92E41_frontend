'use client'

import { FileVideo, FileImage, PlusSignSquare } from '@/components/icons/File'
import { FileInput, mbToBytes } from '@/components/reusable/FileInput/FileInput'
import FileInputPreview from '@/components/reusable/FileInput/FileInputPreview'
import { FileInputProvider } from '@/components/reusable/FileInput/FileInputProvider'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group'
import { useState } from 'react'

export default function InspectionMediaForm() {
  const maxImageSize = mbToBytes(200)
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

  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel>Upload Media Files</FieldLabel>
          <div className="flex gap-2">
            <FileInputProvider>
              <FileInput
                replaceInputWithChldren
                showPreview={false}
                onChange={(files) => onSelectNewImage(files[0], 0)}
                multiple={false}
                icon={<FileImage />}
                placeholder="Upload Media file"
                maxSize={maxImageSize}
                inputContainerClassName="h-35"
                accept="image/*"
              >
                <FileInputPreview />
              </FileInput>
            </FileInputProvider>

            <FileInputProvider>
              <FileInput
                replaceInputWithChldren
                showPreview={false}
                onChange={(files) => onSelectNewImage(files[0], 0)}
                multiple={false}
                icon={<FileImage />}
                placeholder="Upload Media file"
                maxSize={maxImageSize}
                inputContainerClassName="h-35"
                accept="image/*"
              >
                <FileInputPreview />
              </FileInput>
            </FileInputProvider>

            {/* Add More btn */}
            <button
              type="button"
              className="border-border/50 focus-visible:border-ring/50 focus-within:outline-input flex h-35 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-white px-6 outline-none"
            >
              <PlusSignSquare />
              <span className="text-gray-black-200 text-sm whitespace-nowrap">Add More</span>
            </button>
          </div>
        </Field>

        <Field>
          <FieldLabel>Aerial Map</FieldLabel>
          <FileInputProvider>
            <FileInput
              replaceInputWithChldren
              showPreview={false}
              onChange={(files) => onSelectNewImage(files[0], 0)}
              multiple={false}
              icon={<FileVideo />}
              placeholder="Upload your file"
              maxSize={maxVideoSize}
              inputContainerClassName="h-65"
              accept="videos/*"
            >
              <FileInputPreview />
            </FileInput>
          </FileInputProvider>
        </Field>

        <Field>
          <FieldLabel>3D Tours </FieldLabel>
          <InputGroup>
            <InputGroupTextarea placeholder="Paste Source URL / iframe Code" />
          </InputGroup>
        </Field>
      </FieldGroup>
    </form>
  )
}

'use client'

import { FileImage, FileVideo, PlusSignSquare } from '@/components/icons/File'
import { FileInput, mbToBytes } from '@/components/reusable/FileInput/FileInput'
import FileInputPreview from '@/components/reusable/FileInput/FileInputPreview'
import { FileInputProvider } from '@/components/reusable/FileInput/FileInputProvider'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group'
import { Textarea } from '@/components/ui/textarea'
import { Input } from 'postcss'
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
          <div className="flex flex-col gap-2 md:flex-row">
            <FileInputProvider>
              <FileInput
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
              className="border-border/50 focus-visible:border-ring/50 focus-within:outline-input flex h-23 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-white px-6 outline-none md:h-auto"
            >
              <PlusSignSquare />
              <span className="text-foreground text-sm whitespace-nowrap">Add More</span>
            </button>
          </div>
        </Field>

        <FieldGroup className="grid md:grid-cols-2">
          <Field>
            <FieldLabel>Aerial Map</FieldLabel>
            <FileInputProvider>
              <FileInput
                showPreview={false}
                onChange={(files) => onSelectNewImage(files[0], 0)}
                multiple={false}
                icon={<FileVideo />}
                placeholder="Upload your file"
                maxSize={maxVideoSize}
                inputContainerClassName="h-65"
                accept="video/*"
              >
                <FileInputPreview />
              </FileInput>
            </FileInputProvider>
          </Field>

          <Field className="">
            <FieldLabel>3D Tours </FieldLabel>
            <Textarea
              className="squircle h-65 resize-none bg-white md:h-full"
              placeholder="Paste Source URL / iframe Code"
            />
          </Field>
        </FieldGroup>

        <Field>
          <FieldLabel>Upload Documents</FieldLabel>

          <FileInputProvider>
            <div className="grid gap-3">
              <FileInputPreview className="py-3" />

              <FileInput
                showPreview={false}
                onChange={(files) => onSelectNewImage(files[0], 0)}
                multiple={true}
                icon={<PlusSignSquare />}
                placeholder="Add More"
                // maxSize={maxImageSize}
                inputContainerClassName="h-[92px]"
                accept="/*"
              ></FileInput>
            </div>
          </FileInputProvider>
        </Field>
      </FieldGroup>
    </form>
  )
}

'use client'

import { FileImage, FileVideo, PlusSignSquare } from '@/components/icons/File'
import { FileInput, FileInputRef, mbToBytes } from '@/components/reusable/FileInput/FileInput'
import FileInputPreview from '@/components/reusable/FileInput/FileInputPreview'
import { FileInputProvider } from '@/components/reusable/FileInput/FileInputProvider'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { useRef, useState } from 'react'

export default function InspectionMediaForm() {
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

  const fileInputRef = useRef<FileInputRef>(null)
  const handleTriggerInput = () => {
    fileInputRef.current?.triggerInput()
  }

  const [files, setFiles] = useState<File[]>([])
  const handleRemoveFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)
  }

  return (
    <form>
      <FieldGroup>
        <FileInputProvider>
          <Field>
            <FieldLabel>Upload Media Files</FieldLabel>
            <FileInput
              className={files.length === 0 ? '' : 'hidden'}
              files={files}
              setFiles={setFiles}
              ref={fileInputRef}
              multiple={true}
              icon={<FileImage />}
              placeholder="Upload Media file"
              maxSize={maxImageSize}
              inputContainerClassName="h-35"
              accept="image/*"
            />
            <FileInputPreview removeFile={handleRemoveFile} files={files} className="" />

            {/* Add More btn */}
            <Button
              variant="outline"
              type="button"
              size="xl"
              className="border-border/50 border-2 border-dashed"
              onClick={handleTriggerInput}
            >
              <PlusSignSquare />
              <span className="text-foreground text-sm whitespace-nowrap">Add More</span>
            </Button>
          </Field>
        </FileInputProvider>

        <FieldGroup className="grid md:grid-cols-2">
          <Field>
            <FieldLabel>Aerial Map</FieldLabel>
            <FileInputProvider>
              <FileInput
                onChange={(files) => onSelectNewImage(files[0], 0)}
                multiple={false}
                icon={<FileVideo />}
                placeholder="Upload your file"
                maxSize={maxVideoSize}
                inputContainerClassName="h-65"
                accept="video/*"
              />
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
              <FileInput
                onChange={(files) => onSelectNewImage(files[0], 0)}
                multiple={true}
                icon={<PlusSignSquare />}
                placeholder="Add More"
                // maxSize={maxImageSize}
                inputContainerClassName="h-[92px]"
                accept="/*"
              />
            </div>
          </FileInputProvider>
        </Field>
      </FieldGroup>
    </form>
  )
}

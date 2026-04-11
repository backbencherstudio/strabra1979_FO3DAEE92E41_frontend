'use client'

import { FileImage, PlusSignSquare } from '@/components/icons/File'
import { FileInput, FileInputRef } from '@/components/reusable/FileInput/FileInput'
import FileInputPreview from '@/components/reusable/FileInput/FileInputPreview'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { MediaFieldKeyType } from '@/types'
import { Dispatch, SetStateAction, useRef } from 'react'

interface MediaFieldProps {
  label: string
  keyName: MediaFieldKeyType
  files: { key: MediaFieldKeyType; file: File }[]
  setFiles: Dispatch<SetStateAction<{ key: MediaFieldKeyType; file: File }[]>>
  accept?: string
  placeholder?: string
  maxSize: number
  inputContainerClassName?: string
  alwaysHideInput?: boolean
}

export function MediaField({
  label,
  keyName,
  files: allFiles,
  setFiles,
  accept,
  placeholder,
  maxSize,
  inputContainerClassName = 'h-35',
  alwaysHideInput = false,
}: MediaFieldProps) {
  const fileInputRef = useRef<FileInputRef>(null)

  const files = allFiles.filter((f) => f.key === keyName).map((f) => f.file)

  const handleRemoveFile = (index: number) => {
    const keyFiles = allFiles.filter((f) => f.key === keyName)
    const fileToRemove = keyFiles[index]
    setFiles((prev) => prev.filter((f) => f !== fileToRemove))
  }

  const handleFilesChange = (newFiles: File[]) => {
    const newEntries = newFiles.map((file) => ({ key: keyName, file }))
    setFiles((prev) => {
      const otherFiles = prev.filter((f) => f.key !== keyName)
      return [...otherFiles, ...newEntries]
    })
  }

  const triggerInput = () => fileInputRef.current?.triggerInput()

  const inputClassName = alwaysHideInput ? 'hidden' : files.length === 0 ? '' : 'hidden'

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <FileInput
        accept={accept}
        placeholder={placeholder}
        className={inputClassName}
        files={files}
        setFiles={handleFilesChange}
        ref={fileInputRef}
        multiple={true}
        icon={<FileImage />}
        maxSize={maxSize}
        inputContainerClassName={inputContainerClassName}
      />
      <FileInputPreview removeFile={handleRemoveFile} files={files} className="" />
      <Button
        variant="outline"
        type="button"
        size="xl"
        className="border-border/50 border-2 border-dashed"
        onClick={triggerInput}
      >
        <PlusSignSquare />
        <span className="text-foreground text-sm whitespace-nowrap">Add More</span>
      </Button>
    </Field>
  )
}

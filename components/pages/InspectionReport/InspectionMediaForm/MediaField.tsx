'use client'

import { PlusSignSquare } from '@/components/icons/File'
import { FileInput, FileInputProps, FileInputRef } from '@/components/reusable/FileInput/FileInput'
import FileInputPreview from '@/components/reusable/FileInput/FileInputPreview'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  IInspectionMediaFileItem,
  LocalMediaFile,
  MediaFieldKeyType,
  RemoteMediaFile,
} from '@/types'
import { Dispatch, SetStateAction, useRef } from 'react'

interface MediaFieldProps extends Omit<FileInputProps, 'files' | 'setFiles'> {
  label: string
  keyName: MediaFieldKeyType
  files: (LocalMediaFile | RemoteMediaFile)[]
  setFiles: Dispatch<SetStateAction<(LocalMediaFile | RemoteMediaFile)[]>>
  accept?: string
  maxSize?: number
  alwaysHideInput?: boolean
  labelAction?: React.ReactNode
}

export function MediaField({
  label,
  keyName,
  files: allFiles,
  setFiles,
  accept,
  multiple = true,
  placeholder,
  maxSize,
  inputContainerClassName = 'h-35',
  alwaysHideInput = false,
  labelAction,
  ...props
}: MediaFieldProps) {
  const fileInputRef = useRef<FileInputRef>(null)

  const localFiles = allFiles
    .filter((f) => f.key === keyName && f.kind === 'local')
    .map((f) => (f as LocalMediaFile).file)

  const keyFiles = allFiles.filter((f) => f.key === keyName)
  const remoteFiles = keyFiles
    .filter((f) => f.kind === 'remote')
    .map((f) => (f as RemoteMediaFile).file as IInspectionMediaFileItem)

  const combinedPreviewFiles = [...localFiles, ...remoteFiles]

  const handleRemoveFile = (index: number) => {
    const fileToRemove = combinedPreviewFiles[index]
    setFiles((prev) =>
      prev.filter((f) => {
        if (f.kind === 'local') {
          return (f as LocalMediaFile).file !== fileToRemove
        } else {
          return (f as RemoteMediaFile).file !== fileToRemove
        }
      }),
    )
  }

  const handleFilesChange = (newFiles: File[]) => {
    const newEntries = newFiles.map((file) => ({ kind: 'local' as const, key: keyName, file }))
    setFiles((prev) => {
      const otherFiles = prev.filter((f) => f.key !== keyName)
      const remoteFiles = prev.filter((f) => f.key === keyName && f.kind === 'remote')
      return [...otherFiles, ...remoteFiles, ...newEntries]
    })
  }

  const triggerInput = () => fileInputRef.current?.triggerInput()

  const inputClassName = alwaysHideInput ? 'hidden' : combinedPreviewFiles.length === 0 ? '' : 'hidden'

  return (
    <Field>
      <FieldLabel className="justify-between">
        {label} {labelAction}
      </FieldLabel>
      <FileInput
        {...props}
        accept={accept}
        placeholder={placeholder}
        className={inputClassName}
        files={localFiles}
        setFiles={handleFilesChange}
        ref={fileInputRef}
        multiple={multiple}
        maxSize={maxSize}
        inputContainerClassName={inputContainerClassName}
      />
      <FileInputPreview removeFile={handleRemoveFile} files={combinedPreviewFiles} className="" />
      {multiple ? (
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
      ) : null}
    </Field>
  )
}

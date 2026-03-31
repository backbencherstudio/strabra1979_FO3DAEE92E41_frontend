'use client'

import { cn } from '@/lib/utils'
import { AlertCircleIcon, FileIcon, XIcon, Upload } from 'lucide-react'
import React, { PropsWithChildren, ReactNode, useCallback, useRef, useState } from 'react'
import { useFileInput } from './FileInputProvider'

export interface FileInputProps
  extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange' | 'onError'>, PropsWithChildren {
  id?: string
  name?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  value?: File[]
  onChange?: (files: File[]) => void
  onError?: (error: string) => void
  showPreview?: boolean
  previewSize?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'compact' | 'minimal'
  dragActiveClassName?: string
  inputContainerClassName?: string
  placeholderExtra?: ReactNode
  icon?: ReactNode
  replaceInputWithChldren?: boolean
}

export const FileInput = (props: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    id,
    icon,
    className,
    name,
    disabled = false,
    accept,
    multiple = true,
    maxSize,
    maxFiles,
    value: initialFiles = [],
    onChange,
    onError,
    showPreview = true,
    previewSize = 'md',
    variant = 'default',
    dragActiveClassName,
    inputContainerClassName,
    placeholder = 'Drag and drop your files here',
    placeholderExtra,
    children,
    replaceInputWithChldren = true,
    ...otherProps
  } = props

  // const [files, setFiles] = useState<File[]>(value)
  const { files, removeFile, setFiles } = useFileInput()
  const [isDragActive, setDragActive] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const triggerInput = () => !disabled && inputRef.current?.click()

  const handleFiles = useCallback(
    (incoming: File[]) => {
      const { valid, errors } = validateFiles({
        files,
        newFiles: incoming,
        accept,
        maxSize,
        maxFiles,
      })

      setErrors(errors)
      if (errors.length) onError?.(errors.join('; '))

      if (valid.length) {
        const updated = multiple ? [...files, ...valid] : valid
        setFiles(updated)
        onChange?.(updated)
      }
    },
    [files, accept, maxFiles, maxSize, multiple, onChange, onError],
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (!disabled) handleFiles(Array.from(e.dataTransfer.files))
  }

  const previewSizeClass = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  }[previewSize]

  const containerStyles = {
    default: 'border-2 bg-white border-dashed border-border/50 py-4 px-2',
    compact: 'border border-border rounded-lg p-4',
    minimal: 'border-0 bg-secondary/50 p-4',
  }[variant]

  return (
    <div className={cn('w-full', className)}>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={triggerInput}
        className={cn(
          'relative h-full cursor-pointer rounded-lg text-[#6B7280] transition-all',
          'has-[input:focus-visible]:border-ring/50',
          containerStyles,
          disabled && 'cursor-not-allowed opacity-50',
          isDragActive && (dragActiveClassName || 'border-primary'),
          inputContainerClassName,
          // !disabled && !isDragActive && "hover:border-primary/50 hover:bg-secondary/30",
        )}
      >
        {replaceInputWithChldren && files.length ? (
          children
        ) : (
          <>
            <input
              ref={inputRef}
              id={id}
              name={name}
              type="file"
              multiple={multiple}
              accept={accept}
              disabled={disabled}
              onChange={(e) => {
                handleFiles(Array.from(e.target.files || []))
                e.target.value = ''
              }}
              className="sr-only"
              {...otherProps}
            />
            <section className="pointer-events-none flex h-full flex-col items-center justify-center gap-2 text-center">
              {icon ? (
                icon
              ) : (
                <Upload className={cn('size-8 transition', isDragActive && 'text-primary')} />
              )}
              {placeholder && (
                <p
                  className={cn(
                    'text-foreground text-sm font-medium',
                    isDragActive && 'text-primary',
                  )}
                >
                  {placeholder}
                </p>
              )}
              {placeholderExtra && (
                <div className="text-text-secondary flex flex-col items-center justify-center gap-1 text-center text-xs">
                  {placeholderExtra}
                </div>
              )}
              <div className="flex items-center space-x-2">
                {maxSize && (
                  <p className="text-text-secondary text-xs">
                    File size up to: {formatFileSize(maxSize)}
                  </p>
                )}
                {maxFiles && <p className="text-text-secondary text-xs">Max files: {maxFiles}</p>}
              </div>
            </section>
          </>
        )}
      </div>
      {errors.length > 0 && (
        <div className="mt-4 space-y-2">
          {errors.map((err, i) => (
            <div
              key={i}
              className="bg-destructive/10 border-destructive/20 flex items-start gap-2 rounded-lg border p-3"
            >
              <AlertCircleIcon className="text-destructive mt-0.5 h-4 w-4" />
              <p className="text-destructive text-sm">{err}</p>
            </div>
          ))}
        </div>
      )}
      {showPreview && files.length > 0 && (
        <div className="mt-6">
          <h3 className="font-body mb-3 text-sm">
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </h3>

          <div
            className={cn(
              'grid grid-cols-1',
              previewSize === 'lg' &&
                'grid grid-cols-2 gap-4 space-y-0 sm:grid-cols-3 lg:grid-cols-4',
            )}
          >
            {files.map((file, index) => {
              const isImage = file.type.startsWith('image/')

              return (
                <div
                  key={index}
                  className={cn(
                    'bg-accent-light-gray border-border flex items-center justify-between space-x-4 rounded-lg border p-3',
                    previewSize === 'lg' && 'flex-col items-start gap-2',
                  )}
                >
                  {isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className={cn('rounded object-cover', previewSizeClass)}
                    />
                  ) : (
                    <div
                      className={cn(
                        'bg-primary/10 flex items-center justify-center rounded',
                        previewSizeClass,
                      )}
                    >
                      <FileIcon className="text-primary h-6 w-6" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-muted-foreground text-xs">{formatFileSize(file.size)}</p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                    disabled={disabled}
                    className="hover:bg-destructive/10 ml-2 rounded p-1 transition disabled:opacity-50"
                  >
                    <XIcon className="text-destructive h-4 w-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

FileInput.displayName = 'FileInput'

const validateFiles = ({
  files,
  newFiles,
  accept,
  maxFiles,
  maxSize,
}: {
  files: File[]
  newFiles: File[]
  accept?: string
  maxFiles?: number
  maxSize?: number
}) => {
  const valid: File[] = []
  const errors: string[] = []

  for (const file of newFiles) {
    if (maxSize && file.size > maxSize) {
      errors.push(`${file.name} exceeds ${formatFileSize(maxSize)} maximum size`)
      continue
    }

    if (!validateFileType(file, accept)) {
      errors.push(`${file.name} is not an accepted file type (${accept})`)
      continue
    }

    valid.push(file)
  }

  if (maxFiles && files.length + valid.length > maxFiles) {
    errors.push(`Maximum ${maxFiles} files allowed`)
    return { valid: [], errors }
  }

  return { valid, errors }
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export const mbToBytes = (mb: number) => {
  return mb * 1048576 // 1024 * 1024 = 1048576
}

const validateFileType = (file: File, accept?: string): boolean => {
  if (!accept) return true

  const accepted = accept.split(',').map((t) => t.trim())

  return accepted.some((type) => {
    if (type.endsWith('/*')) {
      return file.type.startsWith(type.replace('/*', ''))
    }
    return file.type === type || file.name.endsWith(type)
  })
}

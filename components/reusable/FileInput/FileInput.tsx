'use client'

import { cn } from '@/lib/utils'
import { AlertCircleIcon, Upload } from 'lucide-react'
import React, {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

export interface FileInputRef {
  triggerInput: () => void
}

export interface FileInputProps
  extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange' | 'onError'>, PropsWithChildren {
  id?: string
  name?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  files?: File[]
  setFiles?: (files: File[]) => void
  onChange?: (files: File[]) => void
  onError?: (error: string) => void
  variant?: 'default' | 'compact' | 'minimal'
  dragActiveClassName?: string
  inputContainerClassName?: string
  placeholderExtra?: ReactNode
  icon?: ReactNode
}

// Forward ref to allow parent to access triggerInput function
export const FileInput = forwardRef<FileInputRef, FileInputProps>((props, ref) => {
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
    onChange,
    onError,
    variant = 'default',
    dragActiveClassName,
    inputContainerClassName,
    placeholder = 'Drag and drop your files here',
    placeholderExtra,
    files: _files,
    setFiles: _setFiles,
    ...otherProps
  } = props

  const [isDragActive, setDragActive] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const triggerInput = () => !disabled && inputRef.current?.click()

  // Expose triggerInput function to parent via ref
  useImperativeHandle(ref, () => ({
    triggerInput,
  }))

  const handleFiles = useCallback(
    (incoming: File[]) => {
      const { valid, errors } = validateFiles({
        files: _files ?? [],
        newFiles: incoming,
        accept,
        maxSize,
        maxFiles,
      })

      setErrors(errors)
      if (errors.length) onError?.(errors.join('; '))

      if (valid.length) {
        const updated = multiple ? [...(_files ?? []), ...valid] : valid
        _setFiles?.(updated)
        onChange?.(updated)
      }
    },
    [_files, accept, maxSize, maxFiles, onError, multiple, _setFiles, onChange],
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (!disabled) handleFiles(Array.from(e.dataTransfer.files))
  }

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
        )}
      >
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
              className={cn('text-foreground text-sm font-medium', isDragActive && 'text-primary')}
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
    </div>
  )
})

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

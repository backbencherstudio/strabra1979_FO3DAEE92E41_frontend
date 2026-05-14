'use client'

import { useRef, useState } from 'react'

import {
  ICompleteMultipartUploadResponse,
  useAbortMultipartUploadMutation,
  useCompleteMultipartUploadMutation,
  useInitiateMultipartUploadMutation,
  useLazyGetPresignedUrlQuery,
  useLazyGetUploadStatusQuery,
  useSaveUploadedPartMutation,
  useUploadMediaChunkMutation,
} from '@/api/inspectionManagement/uploadApi'
import { PlusSignSquare } from '@/components/icons/File'
import { Trush } from '@/components/icons/Trush'
import { FileInput, FileInputRef, formatFileSize } from '@/components/reusable/FileInput/FileInput'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { getErrorMessage } from '@/lib/farmatters'
import { cn, isArrayEmpty } from '@/lib/utils'
import { MediaFieldKeyType } from '@/types'

type TLogType = 'info' | 'success' | 'error' | 'warn'

interface ILog {
  id: number
  message: string
  type: TLogType
}

export interface MediaUploadResponse extends ICompleteMultipartUploadResponse {
  sessionId: string
}

export interface MultipartUploadProps extends Omit<React.ComponentProps<'input'>, 'onError'> {
  mediaFieldKey: MediaFieldKeyType
  showLog?: boolean
  label: string
  placeholder?: string
  labelAction?: React.ReactNode
  onSuccess?: (data: MediaUploadResponse) => void
  previewFiles: PreviewFile[]
  onDelete: (item: PreviewFile, index: number) => void
}

export default function MultipartUpload({
  mediaFieldKey,
  disabled,
  showLog = false,
  label,
  labelAction,
  placeholder,
  previewFiles,
  onDelete,
  onSuccess,
  className,
  ...props
}: MultipartUploadProps) {
  const [logs, setLogs] = useState<ILog[]>([])
  const [logView, setLogView] = useState<'hidden' | 'show' | 'disabled'>(() =>
    showLog ? 'hidden' : 'disabled',
  )
  const addLog = (message: string, type: TLogType = 'info') => {
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        message,
        type,
      },
    ])
  }

  const chunkSizeMb = 10
  const [progress, setProgress] = useState(0)

  const [isUploading, setIsUploading] = useState(false)

  const [currentSessionFiles, setCurrentSessionFiles] = useState<PreviewFile[]>(() =>
    isArrayEmpty(previewFiles)
      ? []
      : previewFiles.filter((item) => item.mediaFieldKey === mediaFieldKey),
  )
  function addNewSessionFile(
    newSessionFile: ICompleteMultipartUploadResponse | undefined,
    sessionId: string,
  ) {
    if (!newSessionFile) return

    setCurrentSessionFiles((prev) => {
      if (!prev)
        return [
          {
            mediaFieldKey: mediaFieldKey,
            fileSize: newSessionFile.fileSize,
            sessionId: sessionId,
            url: newSessionFile.url,
            fileName: newSessionFile.fileName,
            size: null,
          },
        ]

      return [
        ...prev,
        {
          mediaFieldKey: mediaFieldKey,
          fileSize: newSessionFile.fileSize,
          sessionId: sessionId,
          url: newSessionFile.url,
          fileName: newSessionFile.fileName,
          size: null,
        },
      ]
    })
  }
  const handOnDelete = (index: number, f: PreviewFile) => {
    setCurrentSessionFiles((prev) => prev.filter((_, i) => i !== index))
    onDelete(f, index)
  }
  const hasServerUrl = !isArrayEmpty(currentSessionFiles)

  // useEffect(() => {
  //   setCurrentSessionFiles(previewFiles.filter((item) => item.mediaFieldKey === mediaFieldKey))
  // }, [previewFiles, mediaFieldKey])

  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)

  const abortRef = useRef(false)

  const [initiateMultipartUpload] = useInitiateMultipartUploadMutation()
  const [getPresignedUrl] = useLazyGetPresignedUrlQuery()
  const [uploadMediaChunk] = useUploadMediaChunkMutation()
  const [saveUploadedPart] = useSaveUploadedPartMutation()
  const [completeMultipartUpload] = useCompleteMultipartUploadMutation()
  const [abortMultipartUpload] = useAbortMultipartUploadMutation()
  const [getUploadStatus] = useLazyGetUploadStatusQuery()

  const handleUpload = async (file: File | undefined) => {
    if (!file) {
      addLog('No file selected', 'error')
      return
    }

    try {
      abortRef.current = false

      setIsUploading(true)
      setProgress(0)

      const chunkSizeBytes = chunkSizeMb * 1024 * 1024
      const totalParts = Math.ceil(file.size / chunkSizeBytes)

      addLog(`Starting upload with ${totalParts} parts`)

      // STEP 1
      const initiateRes = await initiateMultipartUpload({
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream',
        fileSize: file.size,
      }).unwrap()

      const sessionId = initiateRes.sessionId

      setCurrentSessionId(sessionId)

      addLog(`Session created: ${sessionId}`, 'success')

      // STEP 2
      for (let currentPartNumber = 1; currentPartNumber <= totalParts; currentPartNumber++) {
        if (abortRef.current) {
          addLog('Upload aborted', 'warn')
          return
        }

        const start = (currentPartNumber - 1) * chunkSizeBytes

        const end = Math.min(start + chunkSizeBytes, file.size)

        const chunk = file.slice(start, end)

        addLog(`Getting presigned URL for part ${currentPartNumber}`)

        const presignedRes = await getPresignedUrl({
          sessionId,
          partNumber: currentPartNumber,
        }).unwrap()

        addLog(`Uploading part ${currentPartNumber}/${totalParts}`)

        const uploadRes = await uploadMediaChunk({
          url: presignedRes.url,
          chunk,
        }).unwrap()

        addLog(`Saving ETag for part ${currentPartNumber}`)

        await saveUploadedPart({
          sessionId,
          partNumber: currentPartNumber,
          eTag: uploadRes.eTag,
        }).unwrap()

        const currentProgress = Math.round((currentPartNumber / totalParts) * 100)

        setProgress(currentProgress)

        addLog(`Part ${currentPartNumber} uploaded`, 'success')
      }

      // STEP 3
      addLog('Completing multipart upload')

      const completeRes = await completeMultipartUpload({
        sessionId,
      }).unwrap()
      addNewSessionFile(completeRes, sessionId)
      onSuccess?.({ ...completeRes, sessionId })

      addLog(`Upload complete: ${completeRes.url}`, 'success')

      setProgress(100)
    } catch (error) {
      console.error(error)
      addLog(getErrorMessage(error) ?? 'Upload failed', 'error')

      if (currentSessionId) {
        try {
          await abortMultipartUpload({
            sessionId: currentSessionId,
          }).unwrap()

          addLog('Failed upload cleaned up', 'warn')
        } catch {}
      }
    } finally {
      setIsUploading(false)

      setCurrentSessionId(null)
    }
  }

  const handleAbort = async () => {
    if (!currentSessionId) return

    try {
      abortRef.current = true

      await abortMultipartUpload({
        sessionId: currentSessionId,
      }).unwrap()

      addLog('Upload aborted', 'warn')
    } catch (error) {
      addLog(getErrorMessage(error) ?? 'Abort failed', 'error')
    } finally {
      setIsUploading(false)

      setCurrentSessionId(null)
    }
  }

  const handleCheckStatus = async () => {
    if (!currentSessionId) {
      addLog('No active upload session', 'warn')
      return
    }

    try {
      const res = await getUploadStatus({
        sessionId: currentSessionId,
      }).unwrap()

      addLog(`Status: ${res.status} (${res.progress.toFixed(1)}%)`, 'success')
    } catch (error) {
      addLog(getErrorMessage(error) ?? 'Failed to get status', 'error')
    }
  }

  const fileInputRef = useRef<FileInputRef>(null)
  const triggerInput = () => fileInputRef.current?.triggerInput()

  return (
    <section className="space-y-2">
      {/* FILE */}
      <Field>
        <FieldLabel className="justify-between">
          {label} {labelAction}
        </FieldLabel>

        <div>
          <FileInputPreview removeFile={handOnDelete} files={currentSessionFiles} />

          <FileInput
            {...props}
            disabled={disabled}
            ref={fileInputRef}
            // isLoading={true}
            // isLoading={isUploading}
            loaderComp={
              <div className="text-input/30 h-3 w-2/3 overflow-hidden rounded-full border border-current bg-[#F6F8FA]">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{
                    // width: '40%',
                    width: `${progress}%`,
                  }}
                />
              </div>
            }
            placeholder={placeholder}
            // placeholderExtra={isUploading ? `${progress}%` : '-'}
            // {...props}
            // accept={accept}
            // placeholder={placeholder}
            className={cn(className, { hidden: hasServerUrl })}
            // files={file === undefined ? undefined : [file]}
            onChange={(files) => {
              const f = files?.[0] ?? undefined
              handleUpload(f)
            }}
            // ref={fileInputRef}
            multiple={false}
            // maxSize={maxSize}
            // inputContainerClassName={inputContainerClassName}
          />
        </div>
      </Field>

      <Button
        disabled={isUploading}
        variant="outline"
        type="button"
        size="xl"
        className="input-dashed-border w-full disabled:opacity-100"
        onClick={triggerInput}
      >
        {isUploading ? (
          <div className="flex w-full items-center justify-center gap-3">
            <div className="border-input/60 h-3 w-2/3 overflow-hidden rounded-full border bg-[#F6F8FA]">
              <div
                className="bg-primary h-full rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="w-12 text-left">{`${progress}%`}</span>
          </div>
        ) : (
          <>
            <PlusSignSquare />
            <span className="text-foreground text-sm whitespace-nowrap">Add More</span>
          </>
        )}
      </Button>

      {/* BUTTONS */}
      {logView === 'disabled' ? null : (
        <div className="relative flex flex-wrap gap-3">
          <Button
            type="button"
            variant="destructive"
            onClick={handleAbort}
            disabled={!isUploading}
            className=""
          >
            Abort
          </Button>

          <Button type="button" onClick={handleCheckStatus} className="">
            Check Status
          </Button>

          <Button type="button" onClick={() => setLogs([])} className="">
            Clear Logs
          </Button>

          <Button
            type="button"
            onClick={() => setLogView((v) => (v === 'hidden' ? 'show' : 'hidden'))}
            className=""
          >
            {logView === 'hidden' ? 'Show Logs' : 'Hide Logs'}
          </Button>

          {logView === 'show' ? <LogView logs={logs} /> : null}
        </div>
      )}
    </section>
  )
}

function LogView({ logs }: { logs: ILog[] }) {
  return (
    <section className="absolute top-[calc(100%+12px)] left-0 z-500 w-full rounded-2xl border bg-black p-4">
      <h2 className="mb-4 text-lg font-semibold text-white">Upload Logs</h2>

      <div className="max-h-100 space-y-2 overflow-y-auto font-mono text-sm">
        {logs.map((log) => (
          <div
            key={log.id}
            className={
              log.type === 'error'
                ? 'text-red-400'
                : log.type === 'success'
                  ? 'text-green-400'
                  : log.type === 'warn'
                    ? 'text-yellow-400'
                    : 'text-gray-300'
            }
          >
            {log.message}
          </div>
        ))}

        {logs.length === 0 && <p className="text-gray-500">No logs</p>}
      </div>
    </section>
  )
}

export interface PreviewFile {
  id?: string
  mediaFieldKey: MediaFieldKeyType
  sessionId?: string
  url: string
  fileName: string
  fileSize: number | null
  size: number | null
}

interface FileInputPreviewProps extends React.ComponentProps<'div'> {
  files?: PreviewFile[]
  removeFile: (index: number, file: PreviewFile) => void
}

function FileInputPreview({ className, files, removeFile, ...props }: FileInputPreviewProps) {
  // const fileMeta = useMemo(() => {
  //   return files.map((file) => {
  //     const isRemote = 'url' in file
  //     const isImage = isRemote ? file.fileType === 'PHOTO' : file.type.startsWith('image/')
  //     const isVideo = isRemote ? file.fileType === 'VIDEO' : file.type.startsWith('video/')
  //     const isPdf = isRemote ? file.fileType === 'PDF' : file.type.startsWith('application/pdf')
  //     const name = isRemote ? file.fileName : file.name
  //     const size = isRemote ? file.size : file.size
  //     const url = isRemote ? file.url : URL.createObjectURL(file)
  //
  //     return { isImage, isVideo, isPdf, name, size, url, isRemote }
  //   })
  // }, [files])
  //
  // if (fileMeta.length == 0) {
  //   return null
  // }
  //
  if (!files) return null

  const isOdd = files.length % 2 !== 0

  return (
    <div className={cn('grid grid-cols-2 gap-4', className)} {...props}>
      {files.map((f, index) => (
        <div
          key={index}
          className={cn(
            'border-border/50 relative flex h-35 gap-2 rounded-lg border-2 border-dashed bg-white px-2 py-2',
            { 'last:col-span-full': isOdd },
          )}
        >
          <video src={f.url} controls className="aspect-video h-full object-cover" />
          <Button
            size="icon"
            type="button"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation()
              removeFile(index, f)
            }}
            className="absolute top-2 right-2"
          >
            <Trush className="text-destructive size-5" />
          </Button>

          {/* {f.isImage ? ( */}
          {/*   <div className="bg-normal-25 flex aspect-video items-center justify-center rounded-md p-1"> */}
          {/*     <Image */}
          {/*       className="size-full object-cover" */}
          {/*       width={120} */}
          {/*       height={120} */}
          {/*       alt=" " */}
          {/*       src={f.url} */}
          {/*     /> */}
          {/*   </div> */}
          {/* ) : ( */}
          {/*   <div className="grid place-items-center"> */}
          {/*     <div className="bg-normal-25 flex size-12 items-center justify-center rounded-md"> */}
          {/*       {f.isPdf ? <FilePdf /> : f.isVideo ? <FileVideo /> : <File />} */}
          {/*     </div> */}
          {/*   </div> */}
          {/* )} */}

          <div className="flex min-w-0 flex-1 flex-col justify-center pt-2">
            <p className="text-foreground truncate text-sm font-medium">{f.fileName}</p>
            {f.size !== null ? (
              <p className="text-muted-foreground text-xs">{formatFileSize(f.size)}</p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

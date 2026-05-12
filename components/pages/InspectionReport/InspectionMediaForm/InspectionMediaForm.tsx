'use client'

import { Edit } from '@/components/icons/Edit'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import {
  EmbedFieldsData,
  IInspectionMediaField,
  IInspectionMediaFile2,
  IPropertyInspectionFormData,
  MediaFieldKeyType,
} from '@/types'
import { Dispatch, SetStateAction } from 'react'
import MultipartUpload, { MediaUploadResponse, MultipartUploadProps } from './MultipartUpload'

interface InspectionMediaFormProps {
  formConfig?: IPropertyInspectionFormData
  mediaFields: IInspectionMediaField[] | undefined
  embedFields: EmbedFieldsData
  setEmbedFields: Dispatch<SetStateAction<EmbedFieldsData>>
  isEditMode?: boolean
  onOpenEditModal: (conf: IInspectionMediaField) => void
  onMediaUpload?: (data: MediaUploadResponse, fieldKey: MediaFieldKeyType) => void
  serverMediaFiles: IInspectionMediaFile2[]
  onDelete: MultipartUploadProps['onDelete']
}

export default function InspectionMediaForm({
  mediaFields,
  serverMediaFiles,
  embedFields,
  setEmbedFields,
  onDelete,
  isEditMode = false,
  onOpenEditModal,
  onMediaUpload,
}: InspectionMediaFormProps) {
  // const maxImageSize = mbToBytes(100)
  // const maxVideoSize = mbToBytes(1024)

  // function testLabel(conf: IInspectionMediaField) {
  //   return [conf.label, '|', 'isSystem =', conf.isSystem, '|', 'type =', conf.type].join(' ')
  // }

  return (
    <form>
      <FieldGroup>
        {mediaFields?.map((conf) => {
          if (conf.type === 'file') {
            return (
              <MultipartUpload
                onDelete={onDelete}
                mediaFieldKey={conf.key}
                // previewFiles={serverMediaFiles}
                previewFiles={serverMediaFiles}
                onSuccess={(data) => onMediaUpload?.(data, conf.key)}
                key={conf.key}
                label={conf.label}
                placeholder={conf.placeholder}
              ></MultipartUpload>
              //              <MediaField
              //                onRemoveFile={onRemoveFile}
              //                labelAction={
              //                  isEditMode ? (
              //                    <Button
              //                      type="button"
              //                      size="icon-sm"
              //                      onClick={() => onOpenEditModal(conf)}
              //                      variant="outline"
              //                    >
              //                      <Edit className="size-4" />
              //                    </Button>
              //                  ) : null
              //                }
              //                setFiles={setFiles}
              //                files={files}
              //                key={conf.key}
              //                label={conf.label}
              //                keyName={conf.key}
              //                accept={conf.accept?.join(',')}
              //                placeholder={conf.placeholder}
              //                icon={<FileImage />}
              //                // maxSize={maxImageSize}
              //                inputContainerClassName="h-35"
              //              />
            )
          }

          if (conf.type === 'embed') {
            const embededFieldValue = embedFields[conf.key] ?? ''
            return (
              <Field key={conf.key}>
                <FieldLabel className="justify-between">
                  {conf.label}

                  {isEditMode ? (
                    <Button
                      type="button"
                      size="icon-sm"
                      onClick={() => onOpenEditModal(conf)}
                      variant="outline"
                    >
                      <Edit className="size-4" />
                    </Button>
                  ) : null}
                </FieldLabel>

                <Textarea
                  placeholder={conf.placeholder}
                  value={embededFieldValue}
                  onChange={(e) => {
                    setEmbedFields({ ...embedFields, [conf.key]: e.target.value })
                  }}
                  className="squircle min-h-65 bg-white md:h-full"
                />
                {/* <SectionCard */}
                {/*   className="flex justify-center overflow-hidden bg-white py-0" */}
                {/*   key={conf.key} */}
                {/* > */}
                {/*   <div */}
                {/*     className={cn( */}
                {/*       'max-w-full', */}
                {/*       // '[&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:max-w-full', */}
                {/*     )} */}
                {/*     dangerouslySetInnerHTML={{ __html: embededFieldValue }} */}
                {/*   /> */}
                {/* </SectionCard> */}
              </Field>
            )
          }

          if (conf.type === 'document') {
            return (
              <MultipartUpload
                onDelete={onDelete}
                mediaFieldKey={conf.key}
                // previewFiles={serverMediaFiles}
                previewFiles={serverMediaFiles}
                onSuccess={(data) => onMediaUpload?.(data, conf.key)}
                key={conf.key}
                label={conf.label}
                placeholder={conf.placeholder}
              ></MultipartUpload>
              //  <MediaField
              //    onRemoveFile={onRemoveFile}
              //    labelAction={
              //      isEditMode ? (
              //        <Button
              //          type="button"
              //          size="icon-sm"
              //          onClick={() => onOpenEditModal(conf)}
              //          variant="outline"
              //        >
              //          <Edit className="size-4" />
              //        </Button>
              //      ) : null
              //    }
              //    setFiles={setFiles}
              //    files={files}
              //    key={conf.key}
              //    label={conf.label}
              //    keyName={conf.key}
              //    accept={conf.accept?.join(',')}
              //    placeholder={conf.placeholder}
              //    // maxSize={maxImageSize}
              //    inputContainerClassName="h-35"
              //    alwaysHideInput={true}
              //  />
            )
          }
        })}
      </FieldGroup>
    </form>
  )
}

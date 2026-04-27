'use client'

import { PlusSignSquare } from '@/components/icons/File'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Edit as Edit2 } from '@/components/icons/Edit'
import MarkInput from '@/components/reusable/MarkInput/MarkInput'
import { cn } from '@/lib/utils'
import {
  IInspectionInputField,
  ScoringCategory,
  IInspectionCriteria,
  EditTextAreaFieldType,
  IEditTextAreaFieldParams,
} from '@/types'
import React, { useState } from 'react'
import { CreateMoreInputModal, CreateScoringInputModal, InputFieldType } from './modals'
import { EditTextAreaInputModal } from './modals/EditTextAreaInputModal'

interface InputAndChecklistSetupFormProps {
  isEditable: boolean
  id: string | undefined
  currentCriteria: IInspectionCriteria | undefined
}

export default function SetupInputAndChecklistForm({
  id,
  isEditable,
  currentCriteria,
}: InputAndChecklistSetupFormProps) {
  // Edit header field data
  const [editFieldData, setEditFieldData] = React.useState<IInspectionInputField | undefined>()
  // create field data
  const [createInputModalMode, setCreateInputModalMode] = React.useState<'edit' | 'create'>()

  const handleOpenEditModalForHeaderFields = (
    type: InputFieldType,
    field: IInspectionInputField,
  ) => {
    setEditFieldData(field)
    setCreateInputModalMode('edit')
  }
  const handleOpenCreateInputModal = (type: InputFieldType) => {
    if (type === 'input-mark') {
      setOpenCreateScoringInputModal('create')
    } else {
      setCreateInputModalMode('create')
    }
  }

  // Edit scoring field data
  const [editScoringFieldData, setEdiScoringtFieldData] = React.useState<
    ScoringCategory | undefined
  >()
  const [openCreateScoringInputModal, setOpenCreateScoringInputModal] = React.useState<
    'edit' | 'create'
  >()
  const handleOpenEditModalForScoringFields = (type: InputFieldType, field: ScoringCategory) => {
    setEdiScoringtFieldData(field)
    setOpenCreateScoringInputModal('edit')
  }

  // Edit NTE or Additional notes field data
  const [editTextAreaInputData, setEditTextAreaInputData] =
    React.useState<IEditTextAreaFieldParams>()
  const [openTextAreaInputModal, setOpenTextAreaInputModal] =
    React.useState<EditTextAreaFieldType>()
  const handleOpenTextAreaInputModal = (
    type: EditTextAreaFieldType,
    field: IEditTextAreaFieldParams,
  ) => {
    setEditTextAreaInputData(field)
    setOpenTextAreaInputModal(type)
  }

  return (
    <div>
      {/* Add More Input fields dialog */}
      <CreateMoreInputModal
        mode={createInputModalMode}
        initialData={createInputModalMode === 'create' ? undefined : editFieldData}
        criteriaId={id}
        modalType="checklist"
        open={createInputModalMode !== undefined}
        onOpenChange={(v) => {
          if (!v) {
            setCreateInputModalMode(undefined)
          }
        }}
      />

      {/* Create checklist fields dialog */}
      <CreateScoringInputModal
        initialData={openCreateScoringInputModal === 'create' ? undefined : editScoringFieldData}
        criteriaId={id}
        mode={openCreateScoringInputModal}
        open={openCreateScoringInputModal !== undefined}
        onOpenChange={(v) => {
          if (!v) {
            setOpenCreateScoringInputModal(undefined)
          }
        }}
      />

      {/* Update NTE or Additional notes field dialog */}
      <EditTextAreaInputModal
        initialData={editTextAreaInputData}
        criteriaId={id}
        open={openTextAreaInputModal !== undefined}
        fieldType={openTextAreaInputModal}
        onOpenChange={(v) => {
          if (!v) {
            setOpenTextAreaInputModal(undefined)
          }
        }}
      />

      <form className="space-y-3">
        <FieldGroup className="grid grid-cols-1 gap-3 @3xl:grid-cols-2 @3xl:gap-4">
          {typeof currentCriteria !== undefined &&
            currentCriteria?.headerFields.map((item) => {
              const isDropdown = item.type === 'dropdown'

              return (
                <Field key={item.key}>
                  <div className="flex items-center justify-between">
                    <FieldLabel isRequired={item.required} htmlFor={item.key}>
                      {item.label}
                    </FieldLabel>

                    {isEditable && (
                      <Button
                        type="button"
                        size="icon-sm"
                        onClick={() => handleOpenEditModalForHeaderFields('input-text', item)}
                        variant="outline"
                      >
                        <Edit2 className="size-4" />
                      </Button>
                    )}
                  </div>
                  {isDropdown ? (
                    <Select
                      required={item.required}
                      // disabled={!isEditable}
                    >
                      <SelectTrigger id={item.key}>
                        <SelectValue placeholder={item.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {item.options.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <InputGroup
                    // disabled={!isEditable}
                    >
                      <InputGroupInput
                        className=""
                        required={item.required}
                        id={item.key}
                        placeholder={item.placeholder}
                        // disabled={!isEditable}
                      />
                    </InputGroup>
                  )}
                </Field>
              )
            })}

          <Button
            onClick={() => handleOpenCreateInputModal('input-text')}
            variant="muted"
            type="button"
            className="col-span-full h-23 flex-col"
          >
            <PlusSignSquare className="size-6" />
            Add More Input fileds
          </Button>
        </FieldGroup>

        <FieldGroup className="grid grid-cols-1 gap-3 @3xl:grid-cols-2 @3xl:gap-4">
          {typeof currentCriteria !== undefined &&
            currentCriteria?.scoringCategories.map((item) => {
              return (
                <Field key={item.key}>
                  <div className="flex items-center justify-between">
                    {/* isRequired={item.required} */}
                    <FieldLabel htmlFor={item.key}>
                      {item.label} ({item.maxPoints} pts)
                    </FieldLabel>

                    {isEditable && (
                      <Button
                        type="button"
                        size="icon-sm"
                        onClick={() => handleOpenEditModalForScoringFields('input-mark', item)}
                        variant="outline"
                      >
                        <Edit2 className="size-4" />
                      </Button>
                    )}
                  </div>

                  <MarkInput
                    onChange={() => {}}
                    value={0}
                    maxValue={item.maxPoints}
                    // disabled={!isEditable}
                  />

                  {/* <InputGroup> */}
                  {/*   <InputGroupTextarea */}
                  {/*     placeholder="Add Observations Notes" */}
                  {/*     value={item.notes} */}
                  {/*     onChange={(e) => onNotesChange?.(item.key, e.target.value)} */}
                  {/*     disabled={!isEditable} */}
                  {/*   /> */}
                  {/* </InputGroup> */}
                </Field>
              )
            })}

          <Button
            onClick={() => handleOpenCreateInputModal('input-mark')}
            variant="muted"
            type="button"
            className="col-span-full h-23 flex-col"
          >
            <PlusSignSquare className="size-6" />
            Add More Condition Rating Scale
          </Button>

          {currentCriteria?.nteConfig ? (
            <Field className="col-span-full">
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="name">{currentCriteria?.nteConfig?.label}</FieldLabel>

                {isEditable && (
                  <Button
                    size="icon"
                    onClick={() => handleOpenTextAreaInputModal('NTE', currentCriteria?.nteConfig)}
                    variant="outline"
                  >
                    <Edit2 />
                  </Button>
                )}
              </div>
              <InputGroup>
                <InputGroupInput placeholder={currentCriteria?.nteConfig?.placeholder} />
              </InputGroup>
            </Field>
          ) : null}

          {currentCriteria?.additionalNotesConfig ? (
            <Field className="col-span-full">
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="name">
                  {currentCriteria?.additionalNotesConfig?.label}
                </FieldLabel>

                {isEditable && (
                  <Button
                    size="icon"
                    onClick={() =>
                      handleOpenTextAreaInputModal(
                        'ADDITIONAL_NOTES',
                        currentCriteria?.additionalNotesConfig,
                      )
                    }
                    variant="outline"
                  >
                    <Edit2 />
                  </Button>
                )}
              </div>
              <InputGroup>
                <InputGroupTextarea
                  placeholder={currentCriteria?.additionalNotesConfig?.placeholder}
                />
              </InputGroup>
            </Field>
          ) : null}
        </FieldGroup>
      </form>
    </div>
  )
}

export function EditButtonWrapper({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('absolute inset-0 z-10 flex items-center justify-end pr-3', className)}
      {...props}
    />
  )
}

import { useUpdateHealthThresholdConfigMutation } from '@/api/inspectionManagement/criteriaManagementApi'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import { Slider2 } from '@/components/ui/slider'
import { Spinner } from '@/components/ui/spinner'
import {
  HEALTH_THRESHHOLD_COLOR,
  HEALTH_THRESHHOLD_KEYS,
  HealthThreshholdKey,
} from '@/constant/theme'
import { getErrorMessage } from '@/lib/farmatters'
import { cn } from '@/lib/utils'
import { IInspectionHealthThresholdConfig } from '@/types'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'

export const inspectionHealthScoreRangeSchema = z
  .object({
    minScore: z.number().min(0),
    maxScore: z.number().min(0),

    remainingLifeMinYears: z.number().min(0),
    remainingLifeMaxYears: z.number().min(0),
  })
  .refine((data) => data.minScore <= data.maxScore, {
    message: "Can't greater than max score",
    path: ['minScore'],
  })
  .refine((data) => data.remainingLifeMinYears <= data.remainingLifeMaxYears, {
    message: "Can't greater than max years",
    path: ['remainingLifeMinYears'],
  })
export type InspectionHealthScoreRangeSchema = z.infer<typeof inspectionHealthScoreRangeSchema>

export const inspectionHealthThresholdConfigSchema = z.object({
  poor: inspectionHealthScoreRangeSchema,
  fair: inspectionHealthScoreRangeSchema,
  good: inspectionHealthScoreRangeSchema,
})
export type InspectionHealthThresholdConfigFormValues = z.infer<
  typeof inspectionHealthThresholdConfigSchema
>

interface HealthStatusThresholdsSetupProps {
  criteriaId: string | undefined
  healthThresholdConfig: IInspectionHealthThresholdConfig | undefined
}

const DEFAULT_VALUES: InspectionHealthThresholdConfigFormValues = {
  poor: {
    minScore: 0,
    maxScore: 0,
    remainingLifeMinYears: 0,
    remainingLifeMaxYears: 0,
  },
  fair: {
    minScore: 0,
    maxScore: 0,
    remainingLifeMinYears: 0,
    remainingLifeMaxYears: 0,
  },
  good: {
    minScore: 0,
    maxScore: 0,
    remainingLifeMinYears: 0,
    remainingLifeMaxYears: 0,
  },
}

function getMergedHealthThresholdConfig(
  config: IInspectionHealthThresholdConfig | undefined,
): InspectionHealthThresholdConfigFormValues {
  if (!config) return DEFAULT_VALUES

  return {
    poor: { ...DEFAULT_VALUES.poor, ...config.poor },
    fair: { ...DEFAULT_VALUES.fair, ...config.fair },
    good: { ...DEFAULT_VALUES.good, ...config.good },
  }
}

export default function HealthStatusThresholdsSetup({
  criteriaId,
  healthThresholdConfig,
}: HealthStatusThresholdsSetupProps) {
  const [updateHealthThresholdConfig, { isLoading: isUpdating }] =
    useUpdateHealthThresholdConfigMutation()
  const [seletedHealthScale, setSeletedHealthScale] = useState<HealthThreshholdKey>('good')

  const form = useForm({
    defaultValues: getMergedHealthThresholdConfig(healthThresholdConfig),
    validators: {
      onSubmit: inspectionHealthThresholdConfigSchema,
    },
    onSubmit: async ({ value }) => {
      if (!criteriaId) {
        toast.error('criteriaId not availble')
        return
      }

      try {
        const res = await updateHealthThresholdConfig({
          criteriaId,
          payload: value,
        }).unwrap()
        form.reset()
        toast.success(res?.message ?? 'Health Threshold config updated successfully')
      } catch (error) {
        toast.error(`Failed to update Health Threshold config`, {
          description: getErrorMessage(error),
        })
      }
    },
  })

  if (!healthThresholdConfig) {
    return null
  }

  return (
    <SectionCard className="space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Health Status Thresholds</h3>
      </div>

      <div className="grid w-full grid-cols-2 divide-x *:px-3">
        <section className="space-y-2">
          <h6 className="text-foreground text-sm">Health Distribution</h6>

          {HEALTH_THRESHHOLD_KEYS.map((key) => {
            const color = HEALTH_THRESHHOLD_COLOR[key]

            return (
              <Button
                style={
                  {
                    '--scale-theme': color,
                  } as React.CSSProperties
                }
                key={key}
                variant="muted"
                onClick={() => setSeletedHealthScale(key)}
                className={cn(
                  'ring-hover-50 h-auto w-full flex-col items-start bg-[#F8FAFB] px-2 py-2 ring',
                  {
                    'bg-hover-50 ring-2 ring-[#B3BDC2]': key === seletedHealthScale,
                  },
                )}
              >
                <form.Field name={key}>
                  {(field) => {
                    const scale = [field.state.value.minScore, field.state.value.maxScore]

                    return (
                      <>
                        <div className="flex items-center gap-2">
                          <span
                            className="size-3 rounded-full"
                            style={{ backgroundColor: 'var(--scale-theme)' }}
                          />
                          <span className="text-foreground text-sm capitalize">
                            {key} <span className="font-mono font-medium">({scale.join('-')})</span>
                          </span>
                        </div>

                        <div className="mt-2 font-normal">
                          Remaining Life: {field.state.value.remainingLifeMinYears}-
                          {field.state.value.remainingLifeMaxYears} Years
                        </div>

                        <div className="mt-3 flex w-full items-center gap-1.5">
                          <span className="bg-hover-50 rounded-full px-2 py-1 text-[10px]">
                            Min 0
                          </span>
                          <div className="flex-1">
                            <Slider2
                              value={scale}
                              onValueChange={(value) => {
                                if (seletedHealthScale !== key) {
                                  setSeletedHealthScale(key)
                                }
                                field.handleChange({
                                  minScore: value[0],
                                  maxScore: value[1],
                                  remainingLifeMinYears: field.state.value.remainingLifeMinYears,
                                  remainingLifeMaxYears: field.state.value.remainingLifeMaxYears,
                                })
                              }}
                              rangeClassName="opacity-30"
                              rangeColor={'var(--scale-theme)'}
                              max={100}
                              step={1}
                            />
                          </div>
                          <span className="rounded-full bg-white px-2 py-1 text-[10px]">
                            Max 100
                          </span>
                        </div>
                      </>
                    )
                  }}
                </form.Field>
              </Button>
            )
          })}
        </section>

        <section className="flex flex-col">
          <h6 className="text-foreground text-sm">Remaining Life Configuration</h6>
          <hr
            className="rounded-full border-t-4"
            style={{ borderColor: HEALTH_THRESHHOLD_COLOR[seletedHealthScale] }}
          />

          <FieldGroup className="mt-3 flex-1">
            <form.Field name={`${seletedHealthScale}.remainingLifeMinYears`}>
              {(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel>Min Years</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                    />
                  </InputGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name={`${seletedHealthScale}.remainingLifeMaxYears`}>
              {(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel>Max Years</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                    />
                  </InputGroup>

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <Button className="mt-auto" onClick={() => form.handleSubmit()}>
              {isUpdating ? <Spinner /> : null}
              {isUpdating ? 'Updating...' : 'Update health status'}
            </Button>
          </FieldGroup>
        </section>
      </div>
    </SectionCard>
  )
}

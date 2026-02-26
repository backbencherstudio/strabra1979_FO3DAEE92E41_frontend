import { scoreScale } from '@/components/reusable/CircularProgress/CircularProgress'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import { Slider2 } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function HealthStatusThresholdsSetup() {
  const [seletedHealthScale, setSeletedHealthScale] = useState('good')
  const [goodScale, setGoodScale] = useState([scoreScale[0].min, scoreScale[0].max])
  const [fairScale, setFairScale] = useState([scoreScale[1].min, scoreScale[1].max])
  const [poorScale, setPoorScale] = useState([scoreScale[2].min, scoreScale[2].max])

  return (
    <SectionCard className="space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Health Status Thresholds</h3>
      </div>

      <div className="grid w-full grid-cols-2 divide-x *:px-3">
        <section className="space-y-2">
          <h6 className="text-foreground text-sm">Health Distribution</h6>

          {scoreScale.map((item) => {
            const scale = item.id == 'poor' ? poorScale : item.id == 'fair' ? fairScale : goodScale
            return (
              <Button
                key={item.label}
                variant="muted"
                onClick={() => setSeletedHealthScale(item.id)}
                className={cn(
                  'ring-hover-50 h-auto w-full flex-col items-start bg-[#F8FAFB] px-2 py-2 ring',
                  {
                    'bg-hover-50 ring-2 ring-[#B3BDC2]': item.id === seletedHealthScale,
                  },
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-foreground text-sm">
                    {item.label} ({scale.join('-')})
                  </span>
                </div>

                <div className="mt-2 font-normal">Remaining Life: 5-7 Years</div>

                <div className="mt-3 flex w-full items-center gap-1.5">
                  <span className="bg-hover-50 rounded-full px-2 py-1 text-[10px]">Min 0</span>
                  <div className="flex-1">
                    <Slider2
                      value={scale}
                      onValueChange={
                        item.id == 'poor'
                          ? setPoorScale
                          : item.id == 'fair'
                            ? setFairScale
                            : setGoodScale
                      }
                      rangeClassName="opacity-30"
                      rangeColor={item.color}
                      defaultValue={[item.max]}
                      max={100}
                      step={1}
                    />
                  </div>
                  <span className="rounded-full bg-white px-2 py-1 text-[10px]">Max 100</span>
                </div>
              </Button>
            )
          })}
        </section>

        <section className="space-y-2">
          <h6 className="text-foreground text-sm">Remaining Life Configuration</h6>

          <Field>
            <FieldLabel>Min Years</FieldLabel>
            <InputGroup>
              <InputGroupInput type="number" defaultValue={5} />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel>Max Years</FieldLabel>
            <InputGroup>
              <InputGroupInput type="number" defaultValue={7} />
            </InputGroup>
          </Field>
        </section>
      </div>
    </SectionCard>
  )
}

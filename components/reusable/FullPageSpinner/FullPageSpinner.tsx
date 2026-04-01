import { Spinner } from '@/components/ui/spinner'

export default function FullPageSpinner() {
  return (
    <section className="grid flex-1 place-items-center">
      <Spinner className="size-6" />
    </section>
  )
}

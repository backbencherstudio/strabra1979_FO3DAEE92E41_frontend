import { SuccessIcon } from '@/components/icons/SuccessIcon'
import { Button } from '@/components/ui/button'

export default function page() {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center px-4">
      <div className="flex flex-col items-center rounded-[24px] border border-[#EDE9DF] bg-[#F8F6F3] p-6 md:p-12">
        <SuccessIcon />
        <h1 className="text-gray-black-500 mt-4 text-center text-lg font-semibold md:text-2xl">
          Registration Successful
        </h1>
        <p className="mt-2 text-center">
          Your account has been created. You can now <br className="hidden md:block" /> proceed to
          your dashboard.
        </p>
        <Button className="mt-6 w-full" size="xl">
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}

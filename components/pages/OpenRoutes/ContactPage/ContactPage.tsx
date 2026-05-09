'use client'

import { Button } from '@/components/ui/button'
import { config } from '@/constant'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { MailIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const adminEmail = config.adminContactEmail

  const { copy, isSuccess } = useCopyToClipboard()

  const handleCopy = async () => {
    const success = await copy(adminEmail)
    if (!success) {
      toast.error('We couldn’t copy the email. ', {
        description: 'Please try again or copy it manually.',
      })
      return
    }
    toast.success('Email copied to clipboard')
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center px-4">
      <div className="flex flex-col items-center rounded-[24px] border border-[#EDE9DF] bg-[#F8F6F3] p-6 md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0D3146] text-white shadow-sm">
          <MailIcon />
        </div>
        <h1 className="text-gray-black-500 mt-4 text-center text-lg font-semibold md:text-2xl">
          Contact Administrator
        </h1>
        <p className="text-muted-foreground mt-2 text-center text-balance">
          Need assistance or account approval? Please contact the administrator directly using the
          email below.
        </p>

        {/* Email Card */}
        <div className="mt-8 w-full rounded-2xl border border-[#EDE9DF] bg-white p-5 text-center">
          <p className="text-sm font-medium text-[#6B6B76]">Administrator Email</p>

          <p className="mt-2 text-lg font-semibold break-all text-[#1F1F2C]">{adminEmail}</p>
        </div>

        <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
          <Button className="" size="xl" asChild>
            <a href={`mailto:${adminEmail}`}>Send Email</a>
          </Button>

          <Button onClick={handleCopy} variant="outline" className="border-[#EDE9DF]" size="xl">
            Copy Email
          </Button>
        </div>
      </div>
    </div>
  )
}

'use client'

import CenterBlob from '@/components/auth/CenterBlob'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <CenterBlob>
      <div className="flex w-full max-w-2xl flex-col items-center px-4">
        <section className="flex flex-col items-center rounded-[24px] border border-[#EDE9DF] bg-[#F8F6F3] p-6 md:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0D3146] text-2xl font-bold text-white shadow-sm">
            404
          </div>

          {/* Content */}
          <div className="mt-6 text-center">
            <h1 className="text-heading text-4xl font-semibold tracking-tight">Page Not Found</h1>

            <p className="text-muted-foreground mx-auto mt-4 max-w-md text-base leading-7 text-balance">
              The page you are looking for does not exist or may have been moved.
            </p>
          </div>

          <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
            <Button size="xl">
              <Link href="/">Go Home</Link>
            </Button>

            <Button
              className="border-[#EDE9DF]"
              onClick={() => window.history.back()}
              variant="outline"
              size="xl"
            >
              Go Back
            </Button>
          </div>

          {/* Footer */}
          <p className="text-muted-foreground mt-6 max-w-100 text-center text-sm text-balance">
            If you believe this is a mistake, please contact support or try again later.
          </p>
        </section>
      </div>
    </CenterBlob>
  )
}

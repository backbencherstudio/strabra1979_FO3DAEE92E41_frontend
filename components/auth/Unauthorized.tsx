'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'

export default function Unauthorized() {
  const router = useRouter()

  return (
    <main className="from-background via-background to-secondary flex min-h-screen items-center justify-center bg-gradient-to-br px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-destructive/10 rounded-full p-4">
            <Lock className="text-destructive h-12 w-12" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-foreground mb-3 text-4xl font-bold text-balance">Access Denied</h1>

        {/* Subheading */}
        <p className="text-muted-foreground mb-8 text-lg text-balance">
          You don't have permission to access this page. If you believe this is a mistake, please
          contact support.
        </p>

        {/* Error Code */}
        <div className="bg-card mb-8 rounded-lg p-4">
          <p className="text-muted-foreground font-mono text-sm">
            Error Code: <span className="text-foreground font-semibold">403</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>
          <Button size="lg" onClick={() => router.push('/')} className="w-full sm:w-auto">
            Return to Home
          </Button>
        </div>
      </div>
    </main>
  )
}

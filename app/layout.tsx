import { TwScreenSize } from '@/components/reusable/TwScreenSize'
import { TooltipProvider } from '@/components/ui/tooltip'
import { getAuthCookies } from '@/lib/actions/auth'
import StoreProvider from '@/redux/StoreProvider'
import AuthRehydrate from '@/redux/features/auth/AuthReduxRehydrate'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { PaginationPageProvider } from '@/components/reusable/Pagination/PaginationPageProvider'
import { SharedPropertyCardListContextProvider } from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'

const poppinsSans = Poppins({
  variable: '--font-poppins-sans',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Liberty Shield',
  description: 'Liberty Shield',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authCookies = await getAuthCookies()

  return (
    <html lang="en">
      <body className={`${poppinsSans.variable} antialiased`}>
        <SharedPropertyCardListContextProvider>
          <PaginationPageProvider>
            <StoreProvider>
              <AuthRehydrate credentials={authCookies} />
              <Toaster position="top-right" richColors />
              <TooltipProvider>{children}</TooltipProvider>
              <TwScreenSize />
            </StoreProvider>
          </PaginationPageProvider>
        </SharedPropertyCardListContextProvider>
      </body>
    </html>
  )
}

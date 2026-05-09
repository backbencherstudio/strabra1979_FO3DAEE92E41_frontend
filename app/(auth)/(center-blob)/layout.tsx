import CenterBlob from '@/components/auth/CenterBlob'

export default function CenterBlobLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <CenterBlob>{children}</CenterBlob>
}

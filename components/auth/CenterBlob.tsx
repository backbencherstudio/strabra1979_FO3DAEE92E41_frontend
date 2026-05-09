export default function CenterBlob({ children }: React.PropsWithChildren) {
  return (
    <div className="grid min-h-screen place-items-center">
      <div
        style={{
          background: 'linear-gradient(180deg, #e8e3d7 0%, #fdfcfb 100%)',
        }}
        className="fixed bottom-0 left-1/2 -z-10 size-[150svw] -translate-x-1/2 -translate-y-[50vh] rounded-full"
      />
      {children}
    </div>
  )
}

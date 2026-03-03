export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary/30 border-t-primary h-10 w-10 animate-spin rounded-full border-4" />
        <p className="text-muted-foreground text-sm">Laden...</p>
      </div>
    </div>
  )
}

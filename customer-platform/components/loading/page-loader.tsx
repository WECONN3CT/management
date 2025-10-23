export function PageLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="space-y-3 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

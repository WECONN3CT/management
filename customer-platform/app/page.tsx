import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Customer Management Platform</h1>
        <p className="text-muted-foreground">Setup complete! ✅</p>
        <div className="flex justify-center pt-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

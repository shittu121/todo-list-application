import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/ui/theme-provider"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div onClick={toggleTheme} className="border-none">
      {theme === "dark" ? (
        <Sun className="h-[2.5rem] w-[2.5rem] rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-[2.5rem] w-[2.5rem] rotate-0 scale-100 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}

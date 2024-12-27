import { useTheme } from "@/components/ui/theme-provider"

export const Logo = () => {
    
  const { theme } = useTheme()

  return (
    <div className="flex items-center">
         <img 
            src={theme === "dark" ? "/todologo-white.png" : "/todologo.png"} 
            alt="logo" className='w-24 h-24 dark:text-white' 
         />
         <h1 className='text-muted-foreground text-3xl'>
            TaskMaster
         </h1>
    </div>
  )
}

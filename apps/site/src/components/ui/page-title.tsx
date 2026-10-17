import { LucideIcon } from 'lucide-react'

export function PageTitle({
  title,
  description,
  icon: Icon,
}: Readonly<{
  title: string
  description?: string
  icon?: LucideIcon
}>) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="mt-1 h-7 w-7 text-blue-500" />}
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
      {description && (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  )
}

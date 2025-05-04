export function PageTitle({
  title,
  description,
}: Readonly<{
  title: string
  description?: string
}>) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-bold">{title}</h1>
      {description && (
        <p className="text-lg text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  )
}

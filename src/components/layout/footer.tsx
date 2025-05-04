import { Dictionary } from '../../../get-dictionary'

type FooterProps = Readonly<{
  dictionary: Dictionary
}>

export function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="flex h-16 w-full items-center justify-center border-t">
      <p className="text-muted-foreground text-center text-sm select-none">
        {dictionary.components.footer.rights.replace(
          '{year}',
          new Date().getFullYear().toString(),
        )}
      </p>
    </footer>
  )
}

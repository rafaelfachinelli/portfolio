import { Translation } from '../../../get-translation'

type FooterProps = Readonly<{
  translation: Translation
}>

export function Footer({ translation }: FooterProps) {
  return (
    <footer className="flex h-16 w-full items-center justify-center border-t">
      <p className="text-muted-foreground text-center text-sm select-none">
        {translation.components.footer.rights.replace(
          '{year}',
          new Date().getFullYear().toString(),
        )}
      </p>
    </footer>
  )
}

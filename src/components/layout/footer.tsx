import { Dictionary } from '../../../get-dictionary';

type FooterProps = Readonly<{
  dictionary: Dictionary;
}>;

export function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="flex items-center justify-center w-full h-16 border-t">
      <p className="text-sm text-muted-foreground select-none">
        {dictionary.components.footer.rights.replace(
          '{year}',
          new Date().getFullYear().toString()
        )}
      </p>
    </footer>
  );
}

import '../../globals.css';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with us.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

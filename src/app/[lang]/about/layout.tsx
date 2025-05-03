import '../../globals.css';

export const metadata = {
  title: 'About',
  description: 'Learn more about us.',
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

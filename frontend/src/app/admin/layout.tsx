'use client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin layout - no navbar/footer, just the content
  // ThemeProvider is already in root layout
  return <>{children}</>;
}

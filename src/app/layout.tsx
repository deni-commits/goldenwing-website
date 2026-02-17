// Root layout - minimal wrapper for route groups
// Each route group (marketing, payload, portal) handles its own HTML structure
// DO NOT import globals.css here - it interferes with Payload's admin CSS
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Ticket App',
  description: 'Student ticket marketplace with auctions'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <nav className="container flex items-center gap-4">
            <Link href="/" className="font-semibold">Ticket App</Link>
            <div className="flex gap-3 text-sm text-gray-700">
              <Link href="/tickets">Tickets</Link>
              <Link href="/wallet">Wallet</Link>
              <Link href="/sell">Sell</Link>
            </div>
          </nav>
        </header>
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Ticket App",
  description: "Student ticket marketplace with auctions"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{maxWidth:960, margin:'0 auto', padding:16, fontFamily:'ui-sans-serif, system-ui'}}>
        <header style={{display:'flex', gap:12, alignItems:'center', marginBottom:24}}>
          <a href="/">Home</a>
          <a href="/tickets">Tickets</a>
          <a href="/wallet">Wallet</a>
          <a href="/sell">Sell</a>
        </header>
        {children}
      </body>
    </html>
  );
}

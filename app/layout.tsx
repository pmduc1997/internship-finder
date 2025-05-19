import "./globals.css";
import QueryProvider from "../app/components/QueryProvider";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <QueryProvider>
          <Header />
          <main className="flex-grow">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}

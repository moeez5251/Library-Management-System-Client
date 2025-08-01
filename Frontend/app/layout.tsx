import './globals.css'
import { Lato } from 'next/font/google'
import Providers from './provider';

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],

});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body >
        <Providers>

        {children}
        </Providers>
      </body>
    </html>
  )
}

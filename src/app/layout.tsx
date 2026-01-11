import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Cambiamos Geist por Inter
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Seguro Dental DKV | Presupuesto Online",
  description: "Calcula tu seguro dental DKV con las mejores coberturas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  title: "DKV Seguros Dentales",
  description: "Calculador y buscador de seguros dentales DKV",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUXE Sports — 3D Jersey Configurator",
  description:
    "Design your premium custom sports jersey with our luxury 3D configurator. Real-time 3D preview, custom colors, logos, names and numbers.",
  keywords: ["custom jersey", "sports jersey", "jersey configurator", "3D configurator", "luxury sportswear"],
  authors: [{ name: "LUXE Sports" }],
  openGraph: {
    title: "LUXE Sports — 3D Jersey Configurator",
    description: "Design your premium custom sports jersey with our luxury 3D configurator.",
    type: "website",
    siteName: "LUXE Sports",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXE Sports — 3D Jersey Configurator",
    description: "Design your premium custom sports jersey with our luxury 3D configurator.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#05080f" />
      </head>
      <body suppressHydrationWarning style={{ background: "#05080f", margin: 0, overflow: "hidden" }}>
        {children}
      </body>
    </html>
  );
}

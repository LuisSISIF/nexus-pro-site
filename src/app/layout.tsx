import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Sistema de Gestão Empresarial para PMEs Brasil: Estoque e Vendas | NexusPro",
  description:
    "Software de gestão empresarial completo para PMEs no Brasil. Economize até 30h por mês na gestão de estoque e aumente suas vendas em 47%. Teste grátis por 14 dias sem cartão.",
  keywords: "Sistema de Gestão Empresarial PMEs Brasil, software gestão estoque, sistema de vendas PDV, controle financeiro empresarial, automação comercial varejo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PWXJ8VD2W5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PWXJ8VD2W5');
          `}
        </Script>
        {/* JSON-LD Schema Markup para SEO Local e Produto */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "NexusPro",
              "operatingSystem": "Windows 10, Windows 11, Web",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "80.00",
                "priceCurrency": "BRL"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "128"
              }
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

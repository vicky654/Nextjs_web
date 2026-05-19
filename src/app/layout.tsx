import type { Metadata } from "next";


import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";
import  BootstrapClient  from "./BootstrapClient";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gdprconsultants.in'),
  title: {
    default: "EU's Best GDPR Compliance Management Software",
    template: "%s | GDPR Consultants",
  },
  description: "Achieve GDPR compliance with EU's leading GDPR compliance tools and automated GDPR software for complete data protection management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>
        <BootstrapClient />
        {children}
      </body>
    </html>
  );
}

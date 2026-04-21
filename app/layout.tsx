import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Easy Pizza",
  title: {
    default: "Easy Pizza",
    template: "%s",
  },
  description:
    "عجينة بيتزا فريش جاهزة للفرن من Easy Pizza في مصر الجديدة، بطعم رائع وتحضير سريع في 10 دقايق.",
  creator: "Easy Pizza",
  publisher: "Easy Pizza",
  category: "food",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/Logo.jpg",
    apple: "/Logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
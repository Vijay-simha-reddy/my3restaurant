import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Providers from "@/components/Providers";
import { SITE_URL } from "@/lib/site";
import { restaurantSchema } from "@/lib/schema";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MY3 Family Restaurant in Gajwel | Biryani, Kebabs & Curries",
  description:
    "Craving real Hyderabadi biryani in Gajwel? MY3 seals every pot fresh, grills kebabs live, and serves it hot in 30 minutes. Order online today.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "MY3 Family Restaurant",
    locale: "en_IN",
    url: SITE_URL,
    title: "MY3 Family Restaurant in Gajwel | Biryani, Kebabs & Curries",
    description:
      "Hyderabadi dum biryani, live-grill kebabs and slow curries in Gajwel. Beside St. Joseph's School, Pregnapur Road.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MY3 Family Restaurant in Gajwel",
    description: "Hyderabadi dum biryani, live-grill kebabs and slow curries in Gajwel.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf5ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

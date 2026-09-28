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
    "MY3 is a family restaurant in Gajwel serving Hyderabadi dum biryani, tandoori kebabs and slow-cooked curries, made fresh with hand-ground masalas. Beside St. Joseph's School, Pregnapur Road, Gajwel.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "MY3 Family Restaurant",
    locale: "en_IN",
    url: SITE_URL,
    title: "MY3 Family Restaurant in Gajwel | Biryani, Kebabs & Curries",
    description:
      "Hyderabadi dum biryani, live-grill kebabs and slow curries in Gajwel. Beside St. Joseph's School, Pregnapur Road.",
    images: [{ url: "/images/biryani-plate.jpg", alt: "Hyderabadi dum biryani served at MY3, Gajwel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MY3 Family Restaurant in Gajwel",
    description: "Hyderabadi dum biryani, live-grill kebabs and slow curries in Gajwel.",
    images: ["/images/biryani-plate.jpg"],
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

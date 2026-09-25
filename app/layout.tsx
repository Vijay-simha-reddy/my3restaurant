import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Providers from "@/components/Providers";
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
  title: "MY3 — Family Restaurant, Gajwel",
  description: "MY3 family restaurant in Gajwel: sealed-pot biryani, live-grill kebabs and slow curries, cooked from scratch. Beside St. Joseph's School, Pregnapur Road.",
};

export const viewport: Viewport = {
  themeColor: "#fbf5ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

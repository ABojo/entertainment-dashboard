import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../sass/index.scss";

const outfit = Outfit({
  weight: ["300", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Entertainment App",
  description: "An entertainment app.",
  icons: ["/images/logo.svg"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}

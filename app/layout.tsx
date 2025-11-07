import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: "400", // Or your desired weight
});

export const metadata: Metadata = {
  title: "HealthFront | Empowering Doctors",
  description:
    "HealthFront: A modern platform for healthcare collaboration, support, and connection among doctors.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

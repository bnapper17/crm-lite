import type { Metadata } from "next";
import { Montserrat,  } from 'next/font/google';
import "@/app/globals.css";
import CrmHeader from "@/components/CrmHeader";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "B.C. Trees",
  description: "Website for B.C. Trees tree removal service",
};

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'], // Or an array of weights
  subsets: ['latin'], // Or other subsets
  display: 'swap', // Recommended for faster rendering
  fallback: ['Arial', 'sans-serif'], // Fallback if Montserrat fails to load
  variable: '--font-montserrat' // Optional, for custom CSS variables
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <CrmHeader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

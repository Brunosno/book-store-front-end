import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastCard from "@/components/toastify/ToastCard";
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Store - Login",
  description: "A simple book store application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <CartProvider>
            {children}
            <ToastCard/>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

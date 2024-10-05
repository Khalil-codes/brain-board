import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/providers/clerk-convex-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";
import { Suspense } from "react";
import Loading from "@/components/auth/loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BrainBoard - Collaborate, Create, and Visualize Ideas in Real-Time",
  description:
    "BrainBoard is your go-to platform for real-time collaboration and idea visualization. Sketch, organize, and brainstorm with your team on a flexible, interactive digital canvas. Unlock creativity, share ideas, and work together seamlessly, no matter where you are.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={<Loading />}>
          <AuthProvider>
            {children}
            <ModalProvider />
          </AuthProvider>
        </Suspense>
        <Toaster richColors theme="light" />
      </body>
    </html>
  );
}

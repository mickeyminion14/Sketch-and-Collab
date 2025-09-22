import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client.provider";
import { Toaster } from "sonner";
import ModalProvider from "../providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team Boards",
  description: "Your Organization's collaborative space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ConvexClientProvider> */}

        {children}
        {/* </ConvexClientProvider> */}
      </body>
    </html>
  );
}
